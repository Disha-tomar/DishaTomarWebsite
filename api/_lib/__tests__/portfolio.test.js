const { projects, experience, skills, contact, personal } = require("../portfolio");

test("projects include the AI Resume Builder with technologies", () => {
  const resume = projects.find((p) => p.title.includes("Resume Builder"));
  expect(resume).toBeDefined();
  expect(resume.link).toMatch(/^https?:\/\//);
  expect(resume.technologies).toEqual(expect.arrayContaining(["React", "Supabase"]));
});

test("experience names the current role and company", () => {
  expect(experience.current.company).toMatch(/Alucor/);
  expect(experience.current.location).toMatch(/Dubai/);
  expect(experience.summary.length).toBeGreaterThan(20);
});

test("experience includes a dated work history and education", () => {
  expect(Array.isArray(experience.history)).toBe(true);
  expect(experience.history.length).toBeGreaterThanOrEqual(2);
  expect(experience.history[0]).toEqual(
    expect.objectContaining({ role: expect.any(String), company: expect.any(String), period: expect.any(String) })
  );
  const iit = experience.education.find((e) => /Kharagpur/.test(e.school));
  expect(iit).toBeDefined();
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

test("personal exposes background and hobby/interest fields", () => {
  expect(personal.background.length).toBeGreaterThan(20);
  expect(Array.isArray(personal.hobbies)).toBe(true);
  expect(Array.isArray(personal.interests)).toBe(true);
  expect(Array.isArray(personal.funFacts)).toBe(true);
});
