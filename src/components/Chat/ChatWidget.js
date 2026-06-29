import { useEffect, useRef, useState } from "react";
import classes from "../../styles/ChatWidget.module.scss";
import { useChat } from "./useChat";

const GREETING = {
  role: "assistant",
  content: "Hi! I'm Disha's assistant. Ask me about her projects, experience, skills, or how to reach her.",
};

// Matches http(s) URLs and bare email addresses (capturing group so split keeps them).
const LINK_RE = /(https?:\/\/[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
const TRAILING_PUNCT = /[.,;:!?)\]}'"]+$/;

// Turn plain text into React nodes with clickable links. Only http(s) URLs and
// emails (mailto:) become anchors — no other schemes — and anchors are built as
// React elements, so there is no HTML injection surface.
function linkify(text) {
  if (!text) return text;
  return text.split(LINK_RE).map((part, i) => {
    if (!part) return null;
    if (/^https?:\/\//.test(part)) {
      const trail = (part.match(TRAILING_PUNCT) || [""])[0];
      const url = trail ? part.slice(0, -trail.length) : part;
      return (
        <span key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          {trail}
        </span>
      );
    }
    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`}>{part}</a>
      );
    }
    return part;
  });
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, send, isStreaming, endSession } = useChat();
  const scrollRef = useRef(null);

  const shown = messages.length ? messages : [GREETING];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") endSession();
    };
    window.addEventListener("beforeunload", endSession);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("beforeunload", endSession);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [endSession]);

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const closePanel = () => {
    setOpen(false);
    endSession();
  };

  if (!open) {
    return (
      <button className={classes.launcher} aria-label="Open chat" onClick={() => setOpen(true)}>
        💬
      </button>
    );
  }

  return (
    <div className={classes.panel} role="dialog" aria-label="Chat with Disha's assistant">
      <div className={classes.header}>
        <span>Ask about Disha</span>
        <button className={classes.close} aria-label="Close chat" onClick={closePanel}>
          ×
        </button>
      </div>

      <div className={classes.messages} ref={scrollRef}>
        {shown.map((m, i) => {
          const isAssistant = m.role !== "user";
          const streamingThis = isStreaming && isAssistant && i === shown.length - 1;
          return (
            <div key={i} className={`${classes.msg} ${m.role === "user" ? classes.user : classes.assistant}`}>
              {streamingThis && !m.content ? (
                <span className={classes.thinking} aria-label="Assistant is thinking">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                <>
                  {linkify(m.content)}
                  {streamingThis && <span className={classes.cursor} aria-hidden="true" />}
                </>
              )}
            </div>
          );
        })}
      </div>

      <form className={classes.inputRow} onSubmit={onSubmit}>
        <textarea
          className={classes.input}
          rows={1}
          placeholder="Type your question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button className={classes.send} type="submit" disabled={isStreaming || !input.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
