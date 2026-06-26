// Mock the LLM so we can script a tool-call round then a content round.
const mockStreamChat = jest.fn();
jest.mock("../_lib/llm", () => ({ streamChat: (...a) => mockStreamChat(...a) }));

const mockSaveMessage = jest.fn().mockResolvedValue();
jest.mock("../_lib/store", () => ({ saveMessage: (...a) => mockSaveMessage(...a) }));

const mockExecuteTool = jest.fn().mockReturnValue("[]");
jest.mock("../_lib/tools", () => ({
  toolDefinitions: [],
  executeTool: (...a) => mockExecuteTool(...a),
}));

const { runChat } = require("../chat");

// Helper: build an async iterable of streamed chunks.
function stream(chunks) {
  return (async function* () {
    for (const c of chunks) yield c;
  })();
}

test("runChat executes a tool call, then streams the final answer", async () => {
  // Round 1: model asks for getProjects.
  mockStreamChat.mockResolvedValueOnce(
    stream([
      { choices: [{ delta: { tool_calls: [{ index: 0, id: "t1", function: { name: "getProjects", arguments: "" } }] } }] },
      { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
    ])
  );
  // Round 2: model streams the answer.
  mockStreamChat.mockResolvedValueOnce(
    stream([
      { choices: [{ delta: { content: "She built " } }] },
      { choices: [{ delta: { content: "a resume app." } }] },
      { choices: [{ delta: {}, finish_reason: "stop" }] },
    ])
  );

  const tokens = [];
  const final = await runChat({
    sessionId: "s1",
    messages: [{ role: "user", content: "What did she build?" }],
    write: (t) => tokens.push(t),
  });

  expect(tokens.join("")).toBe("She built a resume app.");
  expect(final).toBe("She built a resume app.");
  expect(mockStreamChat).toHaveBeenCalledTimes(2);
  // the tool-call round actually invoked the tool
  expect(mockExecuteTool).toHaveBeenCalledWith("getProjects");
  // user message + assistant final message persisted
  expect(mockSaveMessage).toHaveBeenCalledWith(expect.objectContaining({ role: "user" }));
  expect(mockSaveMessage).toHaveBeenCalledWith(expect.objectContaining({ role: "assistant", content: "She built a resume app." }));
});

test("runChat writes and returns a fallback when no content is produced", async () => {
  // Every round only ever asks for a tool call and never streams content.
  mockStreamChat.mockResolvedValue(
    stream([
      { choices: [{ delta: { tool_calls: [{ index: 0, id: "t1", function: { name: "getProjects", arguments: "" } }] } }] },
      { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
    ])
  );

  const tokens = [];
  const final = await runChat({
    sessionId: "s2",
    messages: [{ role: "user", content: "hi" }],
    write: (t) => tokens.push(t),
  });

  expect(final).toMatch(/couldn't quite answer/i);
  expect(tokens.join("")).toBe(final);
  expect(mockSaveMessage).toHaveBeenCalledWith(expect.objectContaining({ role: "assistant", content: final }));
});

const { validate } = require("../chat");

test("validate rejects bad payloads", () => {
  expect(validate(null)).toMatch(/body/i);
  expect(validate({ messages: [] })).toMatch(/sessionId/i);
  expect(validate({ sessionId: "s", messages: [] })).toMatch(/messages/i);
  expect(validate({ sessionId: "s", messages: [{ role: "bot", content: "x" }] })).toMatch(/role/i);
  expect(validate({ sessionId: "s", messages: [{ role: "user", content: "ok" }] })).toBeNull();
});
