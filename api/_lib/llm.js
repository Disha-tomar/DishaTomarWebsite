const OpenAI = require("openai");

// The ONLY file that knows the provider. Swap provider by editing here.
const MODEL = "llama-3.3-70b-versatile";

let client;
function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }
  return client;
}

async function streamChat({ messages, tools }) {
  return getClient().chat.completions.create({
    model: MODEL,
    messages,
    tools,
    tool_choice: "auto",
    stream: true,
    max_tokens: 1024,
  });
}

module.exports = { getClient, MODEL, streamChat };
