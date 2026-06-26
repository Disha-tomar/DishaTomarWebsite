// Mock the LLM so we can script a tool-call round then a content round.
const mockStreamChat = jest.fn();
jest.mock("../_lib/llm", () => ({ streamChat: (...a) => mockStreamChat(...a) }));

const mockSaveMessage = jest.fn().mockResolvedValue();
jest.mock("../_lib/store", () => ({ saveMessage: (...a) => mockSaveMessage(...a) }));

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
  // user message + assistant final message persisted
  expect(mockSaveMessage).toHaveBeenCalledWith(expect.objectContaining({ role: "user" }));
  expect(mockSaveMessage).toHaveBeenCalledWith(expect.objectContaining({ role: "assistant", content: "She built a resume app." }));
});

const { validate } = require("../chat");

test("validate rejects bad payloads", () => {
  expect(validate(null)).toMatch(/body/i);
  expect(validate({ messages: [] })).toMatch(/sessionId/i);
  expect(validate({ sessionId: "s", messages: [] })).toMatch(/messages/i);
  expect(validate({ sessionId: "s", messages: [{ role: "bot", content: "x" }] })).toMatch(/role/i);
  expect(validate({ sessionId: "s", messages: [{ role: "user", content: "ok" }] })).toBeNull();
});
