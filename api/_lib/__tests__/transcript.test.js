const { formatTranscript } = require("../transcript");

test("formats user/assistant turns and skips system/tool", () => {
  const text = formatTranscript([
    { role: "system", content: "ignore me" },
    { role: "user", content: "Hi" },
    { role: "assistant", content: "Hello!" },
    { role: "tool", content: "{}" },
  ]);
  expect(text).toContain("Visitor: Hi");
  expect(text).toContain("Assistant: Hello!");
  expect(text).not.toContain("ignore me");
});
