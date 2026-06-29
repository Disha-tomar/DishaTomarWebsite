const mockOrder = jest.fn().mockResolvedValue({ data: [{ role: "user", content: "hi" }], error: null });
const mockSelect = jest.fn(() => ({ eq: jest.fn(() => ({ order: mockOrder })) }));
const mockUpsert = jest.fn().mockResolvedValue({ error: null });
const mockInsert = jest.fn().mockResolvedValue({ error: null });

// markEnded uses the chain: update(...).eq(...).is(...).select(...)
const mockUpdateSelect = jest.fn().mockResolvedValue({ data: [], error: null });
const mockUpdate = jest.fn(() => ({
  eq: jest.fn(() => ({ is: jest.fn(() => ({ select: mockUpdateSelect })) })),
}));

const mockFrom = jest.fn(() => ({
  upsert: mockUpsert,
  insert: mockInsert,
  select: mockSelect,
  update: mockUpdate,
}));
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({ from: mockFrom })),
}));

const { saveMessage, getTranscript, markEnded } = require("../store");

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

test("markEnded returns true on first call and false when already ended", async () => {
  // First call: update affects one row (this call set ended_at).
  mockUpdateSelect.mockResolvedValueOnce({ data: [{ session_id: "s1" }], error: null });
  await expect(markEnded("s1")).resolves.toBe(true);

  // Second call: ended_at already set, update affects zero rows.
  mockUpdateSelect.mockResolvedValueOnce({ data: [], error: null });
  await expect(markEnded("s1")).resolves.toBe(false);
});
