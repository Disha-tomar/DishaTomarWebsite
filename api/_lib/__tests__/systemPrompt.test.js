const { buildSystemPrompt } = require("../systemPrompt");

test("system prompt names Disha and instructs tool use + scope", () => {
  const prompt = buildSystemPrompt();
  expect(prompt).toMatch(/Disha/);
  expect(prompt).toMatch(/getProjects|tools?/i);
  expect(prompt.toLowerCase()).toMatch(/only|decline|stay/); // scope guard
});
