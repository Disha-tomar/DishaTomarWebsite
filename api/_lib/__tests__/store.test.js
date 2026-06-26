const mockOrder = jest.fn().mockResolvedValue({ data: [{ role: "user", content: "hi" }], error: null });
const mockSelect = jest.fn(() => ({ eq: jest.fn(() => ({ order: mockOrder })) }));
const mockUpsert = jest.fn().mockResolvedValue({ error: null });
const mockInsert = jest.fn().mockResolvedValue({ error: null });

const mockFrom = jest.fn(() => ({ upsert: mockUpsert, insert: mockInsert, select: mockSelect }));
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({ from: mockFrom })),
}));

const { saveMessage, getTranscript } = require("../store");

test("saveMessage upserts the conversation and inserts the message", async () => {
  await saveMessage({ sessionId: "s1", role: "user", content: "hi" });
  expect(mockFrom).toHaveBeenCalledWith("conversations");
  expect(mockFrom).toHaveBeenCalledWith("messages");
  expect(mockUpsert).toHaveBeenCalled();
  expect(mockInsert).toHaveBeenCalledWith(
    expect.objectContaining({ session_id: "s1", role: "user", content: "hi" })
  );
});

test("saveMessage never throws when supabase errors", async () => {
  mockInsert.mockResolvedValueOnce({ error: { message: "boom" } });
  await expect(saveMessage({ sessionId: "s1", role: "user", content: "hi" })).resolves.toBeUndefined();
});

test("getTranscript returns ordered messages", async () => {
  const rows = await getTranscript("s1");
  expect(rows).toEqual([{ role: "user", content: "hi" }]);
});
