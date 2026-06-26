const { createClient } = require("@supabase/supabase-js");

let supabase;
function getDb() {
  if (!supabase) {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return supabase;
}

async function saveMessage({ sessionId, role, content, meta = {} }) {
  try {
    const db = getDb();
    await db.from("conversations").upsert(
      {
        session_id: sessionId,
        user_agent: meta.userAgent || null,
        referrer: meta.referrer || null,
      },
      { onConflict: "session_id", ignoreDuplicates: false }
    );
    const { error } = await db
      .from("messages")
      .insert({ session_id: sessionId, role, content });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[store.saveMessage]", err.message);
  }
}

async function getTranscript(sessionId) {
  try {
    const { data, error } = await getDb()
      .from("messages")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  } catch (err) {
    console.error("[store.getTranscript]", err.message);
    return [];
  }
}

async function markEnded(sessionId) {
  try {
    const { data, error } = await getDb()
      .from("conversations")
      .update({ ended_at: new Date().toISOString() })
      .eq("session_id", sessionId)
      .is("ended_at", null)
      .select("session_id");
    if (error) throw new Error(error.message);
    return Array.isArray(data) && data.length > 0;
  } catch (err) {
    console.error("[store.markEnded]", err.message);
    return false;
  }
}

module.exports = { saveMessage, getTranscript, markEnded };
