const mockCreate = jest.fn().mockResolvedValue("FAKE_STREAM");
jest.mock("openai", () =>
  jest.fn().mockImplementation(() => ({
    chat: { completions: { create: mockCreate } },
  }))
);

const { streamChat, MODEL } = require("../llm");

test("streamChat calls the client with streaming + tools and returns the stream", async () => {
  const messages = [{ role: "user", content: "hi" }];
  const tools = [{ type: "function", function: { name: "getProjects" } }];
  const result = await streamChat({ messages, tools });

  expect(result).toBe("FAKE_STREAM");
  expect(mockCreate).toHaveBeenCalledWith(
    expect.objectContaining({ model: MODEL, messages, tools, stream: true, tool_choice: "auto", max_tokens: 1024 })
  );
});
