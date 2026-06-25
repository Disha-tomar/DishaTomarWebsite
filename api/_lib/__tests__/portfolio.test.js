const { projects, experience, skills, contact } = require("../portfolio");

test("projects include the AI Resume Builder with technologies", () => {
  const resume = projects.find((p) => p.title.includes("Resume Builder"));
  expect(resume).toBeDefined();
  expect(resume.link).toMatch(/^https?:\/\//);
  expect(resume.technologies).toEqual(expect.arrayContaining(["React", "Supabase"]));
});

test("experience names the current role and company", () => {
  expect(experience.current.company).toBe("Alucor");
  expect(experience.current.location).toMatch(/Dubai/);
  expect(experience.summary.length).toBeGreaterThan(20);
});

test("skills are grouped and include backend/AI items", () => {
  const backend = skills.find((g) => /Backend/i.test(g.group));
  expect(backend.items).toEqual(expect.arrayContaining(["Node.js", "FastAPI"]));
});

test("contact exposes email and links", () => {
  expect(contact.email).toContain("@");
  expect(contact.github).toMatch(/^https?:\/\//);
  expect(contact.linkedin).toMatch(/^https?:\/\//);
});
