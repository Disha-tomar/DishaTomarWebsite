const { toolDefinitions, executeTool } = require("../tools");

test("exposes the four expected tools with no required params", () => {
  const names = toolDefinitions.map((t) => t.function.name).sort();
  expect(names).toEqual(["getContact", "getExperience", "getProjects", "getSkills"]);
  for (const t of toolDefinitions) {
    expect(t.type).toBe("function");
    expect(typeof t.function.description).toBe("string");
  }
});

test("executeTool returns JSON-parseable data for each tool", () => {
  const projects = JSON.parse(executeTool("getProjects"));
  expect(Array.isArray(projects)).toBe(true);
  expect(projects[0]).toHaveProperty("title");

  const contact = JSON.parse(executeTool("getContact"));
  expect(contact).toHaveProperty("email");
});

test("executeTool throws on an unknown tool", () => {
  expect(() => executeTool("getSecrets")).toThrow(/unknown tool/i);
});
