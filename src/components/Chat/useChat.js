import { useCallback, useRef, useState } from "react";

function newSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function useChat() {
  const sessionIdRef = useRef(newSessionId());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, messages: history }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      if (res.body && typeof res.body.getReader === "function") {
        // Streaming path (modern browsers): show tokens as they arrive.
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistant = "";
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistant += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: assistant }]);
        }
      } else {
        // Fallback for browsers without fetch response streaming (e.g. iOS
        // Safari < 17.4): read the whole reply at once. No live typing, but it works.
        const full = await res.text();
        setMessages([...history, { role: "assistant", content: full }]);
      }
    } catch (err) {
      console.error("[chat] send failed:", err);
      setMessages([
        ...history,
        { role: "assistant", content: "Sorry, I had trouble answering. Please try again." },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  const endSession = useCallback(() => {
    if (messages.length === 0) return;
    try {
      const payload = JSON.stringify({ sessionId: sessionIdRef.current });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/chat-end", new Blob([payload], { type: "application/json" }));
      }
    } catch (_) {
      /* best-effort */
    }
  }, [messages.length]);

  return { messages, input, setInput, send, isStreaming, endSession, sessionId: sessionIdRef.current };
}
