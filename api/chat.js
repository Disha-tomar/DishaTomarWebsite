const { streamChat } = require("./_lib/llm");
const { toolDefinitions, executeTool } = require("./_lib/tools");
const { buildSystemPrompt } = require("./_lib/systemPrompt");
const { saveMessage } = require("./_lib/store");

const MAX_ROUNDS = 5;
const MAX_MESSAGE_LEN = 2000;
const MAX_MESSAGES = 40;

// Core loop. `write(text)` receives each content token. Returns final text.
async function runChat({ sessionId, messages, write, meta = {} }) {
  const convo = [{ role: "system", content: buildSystemPrompt() }, ...messages];

  // Persist the latest user message (best-effort).
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (lastUser) {
    await saveMessage({ sessionId, role: "user", content: lastUser.content, meta });
  }

  let finalText = "";

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const stream = await streamChat({ messages: convo, tools: toolDefinitions });

    let content = "";
    const chunks = []; // buffer — only flushed if this round is the final answer
    const toolCalls = []; // accumulated by index
    let finishReason = null;

    for await (const chunk of stream) {
      const choice = chunk.choices && chunk.choices[0];
      if (!choice) continue;
      const delta = choice.delta || {};

      if (delta.content) {
        content += delta.content;
        // Buffer instead of writing immediately — a tool-calling round may emit
        // a partial sentence before its tool_calls, which would otherwise land
        // in the bubble alongside the real answer from the next round.
        chunks.push(delta.content);
      }

      if (delta.tool_calls) {
        for (const tc of delta.tool_calls) {
          const i = tc.index;
          if (!toolCalls[i]) {
            toolCalls[i] = { id: tc.id, type: "function", function: { name: "", arguments: "" } };
          }
          if (tc.id) toolCalls[i].id = tc.id;
          if (tc.function && tc.function.name) toolCalls[i].function.name += tc.function.name;
          if (tc.function && tc.function.arguments) toolCalls[i].function.arguments += tc.function.arguments;
        }
      }

      if (choice.finish_reason) finishReason = choice.finish_reason;
    }

    if (finishReason === "tool_calls" && toolCalls.length) {
      // Tool-calling round — discard buffered content, execute tools, loop.
      convo.push({ role: "assistant", content: content || null, tool_calls: toolCalls });
      for (const call of toolCalls) {
        let result;
        try {
          result = executeTool(call.function.name);
        } catch (err) {
          result = JSON.stringify({ error: err.message });
        }
        convo.push({ role: "tool", tool_call_id: call.id, content: result });
      }
      continue;
    }

    // Final answer round — flush the buffered chunks to the client.
    for (const c of chunks) write(c);
    finalText = content;
    break;
  }

  if (!finalText) {
    finalText = "Sorry, I couldn't quite answer that. Could you rephrase or ask about Disha's projects, experience, or skills?";
    write(finalText);
  }
  await saveMessage({ sessionId, role: "assistant", content: finalText, meta });
  return finalText;
}

function validate(body) {
  if (!body || typeof body !== "object") return "Invalid request body.";
  const { sessionId, messages } = body;
  if (!sessionId || typeof sessionId !== "string") return "Missing sessionId.";
  if (!Array.isArray(messages) || messages.length === 0) return "Missing messages.";
  if (messages.length > MAX_MESSAGES) return "Too many messages.";
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return "Invalid message role.";
    if (typeof m.content !== "string" || m.content.length > MAX_MESSAGE_LEN) return "Invalid message content.";
  }
  return null;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const error = validate(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { sessionId, messages } = req.body;
  const meta = {
    userAgent: req.headers["user-agent"],
    referrer: req.headers["referer"] || req.headers["referrer"],
  };

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");

  try {
    await runChat({ sessionId, messages, write: (t) => res.write(t), meta });
  } catch (err) {
    console.error("[chat]", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong." });
      return;
    }
    res.write("\n\n[Sorry, I hit an error. Please try again.]");
  }
  res.end();
};

module.exports.runChat = runChat;
module.exports.validate = validate;
