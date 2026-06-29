const { Resend } = require("resend");
const { formatTranscript } = require("./transcript");

let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

async function emailTranscript(sessionId, messages) {
  try {
    const text = formatTranscript(messages);
    if (!text) return; // nothing worth emailing

    const date = new Date().toISOString().slice(0, 10);
    const { error } = await getResend().emails.send({
      from: process.env.NOTIFY_EMAIL_FROM,
      to: process.env.NOTIFY_EMAIL_TO,
      subject: `New portfolio chat — ${date}`,
      text: `Session: ${sessionId}\n\n${text}`,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[notify.emailTranscript]", err.message);
  }
}

module.exports = { emailTranscript };
