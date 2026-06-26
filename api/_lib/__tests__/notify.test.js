const mockSend = jest.fn().mockResolvedValue({ data: { id: "email_1" }, error: null });
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({ emails: { send: mockSend } })),
}));

const { emailTranscript } = require("../notify");

beforeEach(() => {
  process.env.NOTIFY_EMAIL_TO = "to@example.com";
  process.env.NOTIFY_EMAIL_FROM = "from@example.com";
});

test("emails a formatted transcript", async () => {
  await emailTranscript("s1", [
    { role: "user", content: "Hi" },
    { role: "assistant", content: "Hello!" },
  ]);
  expect(mockSend).toHaveBeenCalledWith(
    expect.objectContaining({
      to: "to@example.com",
      from: "from@example.com",
      subject: expect.stringContaining("chat"),
      text: expect.stringContaining("Visitor: Hi"),
    })
  );
});

test("skips sending when there are no renderable messages", async () => {
  await emailTranscript("s1", [{ role: "system", content: "x" }]);
  expect(mockSend).not.toHaveBeenCalled();
});

test("never throws when resend errors", async () => {
  mockSend.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
  await expect(
    emailTranscript("s1", [{ role: "user", content: "Hi" }])
  ).resolves.toBeUndefined();
});
