const LABELS = { user: "Visitor", assistant: "Assistant" };

function formatTranscript(messages) {
  return messages
    .filter((m) => LABELS[m.role] && typeof m.content === "string" && m.content.trim())
    .map((m) => `${LABELS[m.role]}: ${m.content.trim()}`)
    .join("\n\n");
}

module.exports = { formatTranscript };
