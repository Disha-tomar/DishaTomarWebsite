const mockMarkEnded = jest.fn();
const mockGetTranscript = jest.fn().mockResolvedValue([{ role: "user", content: "Hi" }]);
jest.mock("../_lib/store", () => ({
  markEnded: (...a) => mockMarkEnded(...a),
  getTranscript: (...a) => mockGetTranscript(...a),
}));

const mockEmailTranscript = jest.fn().mockResolvedValue();
jest.mock("../_lib/notify", () => ({ emailTranscript: (...a) => mockEmailTranscript(...a) }));

const handler = require("../chat-end");

function mockRes() {
  return { statusCode: 0, status(c) { this.statusCode = c; return this; }, end() { this.ended = true; return this; } };
}

test("emails the transcript on first end and returns 204", async () => {
  mockMarkEnded.mockResolvedValueOnce(true);
  const res = mockRes();
  await handler({ method: "POST", body: { sessionId: "s1" } }, res);
  expect(mockEmailTranscript).toHaveBeenCalledWith("s1", [{ role: "user", content: "Hi" }]);
  expect(res.statusCode).toBe(204);
});

test("does not email when already ended", async () => {
  mockMarkEnded.mockResolvedValueOnce(false);
  const res = mockRes();
  await handler({ method: "POST", body: { sessionId: "s1" } }, res);
  expect(mockEmailTranscript).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(204);
});
