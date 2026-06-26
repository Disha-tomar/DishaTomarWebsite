const { markEnded, getTranscript } = require("./_lib/store");
const { emailTranscript } = require("./_lib/notify");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const sessionId = req.body && req.body.sessionId;
  if (!sessionId || typeof sessionId !== "string") {
    res.status(400).end();
    return;
  }

  try {
    const firstEnd = await markEnded(sessionId);
    if (firstEnd) {
      const transcript = await getTranscript(sessionId);
      await emailTranscript(sessionId, transcript);
    }
  } catch (err) {
    console.error("[chat-end]", err.message); // best-effort; still 204
  }

  res.status(204).end();
};
