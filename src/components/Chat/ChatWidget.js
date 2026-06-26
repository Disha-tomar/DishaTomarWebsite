import { useEffect, useRef, useState } from "react";
import classes from "../../styles/ChatWidget.module.scss";
import { useChat } from "./useChat";

const GREETING = {
  role: "assistant",
  content: "Hi! I'm Disha's assistant. Ask me about her projects, experience, skills, or how to reach her.",
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, send, isStreaming, endSession } = useChat();
  const scrollRef = useRef(null);

  const shown = messages.length ? messages : [GREETING];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length]);

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
        {shown.map((m, i) => (
          <div key={i} className={`${classes.msg} ${m.role === "user" ? classes.user : classes.assistant}`}>
            {m.content || (isStreaming ? "…" : "")}
          </div>
        ))}
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
