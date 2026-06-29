import { useEffect, useRef, useState } from "react";
import classes from "../../styles/ChatWidget.module.scss";
import { useChat } from "./useChat";

const GREETING = {
  role: "assistant",
  content: "Hi! I'm Disha's assistant. Ask me about her projects, experience, skills, or how to reach her.",
};

// Strips <function=...>...</function> blocks the model occasionally leaks
// into the content stream alongside its structured tool_calls.
function sanitize(text) {
  if (!text) return text;
  return text.replace(/<function=[^>]*>[\s\S]*?<\/function>/g, "");
}

// Tokenizes text for clickable links: Markdown links [label](url), bare http(s)
// URLs, and emails. Anchors are built as React elements (no HTML injection) and
// limited to http(s)/mailto schemes. Non-http markdown links (e.g. [label](#))
// render the label as plain text — no broken anchor.
const TOKEN_RE =
  /\[([^\]]+)\]\(([^)]*)\)|(https?:\/\/[^\s]+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
const TRAILING_PUNCT = /[.,;:!?)\]}'"]+$/;

// Short, human-friendly label for a bare URL (fallback when the model didn't
// supply a Markdown label), so long raw URLs don't clutter the bubble.
const KNOWN_HOSTS = {
  "linkedin.com": "LinkedIn",
  "github.com": "GitHub",
  "twitter.com": "X",
  "x.com": "X",
  "facebook.com": "Facebook",
};
function labelForUrl(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return KNOWN_HOSTS[host] || host;
  } catch (_) {
    return url;
  }
}

function linkify(text) {
  if (!text) return text;
  const nodes = [];
  let last = 0;
  let key = 0;
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [match, mdLabel, mdUrl, rawUrl, email] = m;
    if (mdLabel !== undefined) {
      // Markdown link: only make it clickable for absolute http(s) URLs
      if (/^https?:\/\//i.test(mdUrl)) {
        nodes.push(
          <a key={key++} href={mdUrl} target="_blank" rel="noopener noreferrer">{mdLabel}</a>
        );
      } else {
        // Relative / anchor / placeholder URL — just show the label as text
        nodes.push(mdLabel);
      }
    } else if (rawUrl) {
      const trail = (rawUrl.match(TRAILING_PUNCT) || [""])[0];
      const url = trail ? rawUrl.slice(0, -trail.length) : rawUrl;
      nodes.push(
        <a key={key++} href={url} target="_blank" rel="noopener noreferrer">{labelForUrl(url)}</a>
      );
      if (trail) nodes.push(trail);
    } else if (email) {
      nodes.push(<a key={key++} href={`mailto:${email}`}>{email}</a>);
    }
    last = m.index + match.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, send, isStreaming, endSession } = useChat();
  const scrollRef = useRef(null);

  // Typewriter state: how many characters of the last assistant message to display
  const [typedLen, setTypedLen] = useState(0);
  const prevIsStreamingRef = useRef(false);

  const shown = messages.length ? messages : [GREETING];

  const lastMsg = shown[shown.length - 1];
  const lastIsAssistant = lastMsg?.role === "assistant";
  const lastContent = lastIsAssistant ? lastMsg.content : "";

  // Reset the typewriter counter each time a new streaming response begins
  useEffect(() => {
    if (isStreaming && !prevIsStreamingRef.current) {
      setTypedLen(0);
    }
    prevIsStreamingRef.current = isStreaming;
  }, [isStreaming]);

  // Advance the typewriter 3 characters every 15 ms (~200 chars/sec)
  useEffect(() => {
    if (!lastIsAssistant || typedLen >= lastContent.length) return;
    const id = setTimeout(() => {
      setTypedLen((n) => Math.min(n + 3, lastContent.length));
    }, 15);
    return () => clearTimeout(id);
  }, [typedLen, lastContent, lastIsAssistant]);

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
          const isLastMsg = i === shown.length - 1;
          const streamingThis = isStreaming && isAssistant && isLastMsg;

          // Apply typewriter to the last assistant message only
          const displayContent =
            isLastMsg && isAssistant ? lastContent.slice(0, typedLen) : m.content;
          const isTypingThis = isLastMsg && isAssistant && typedLen < lastContent.length;
          const showCursor = streamingThis || isTypingThis;

          return (
            <div key={i} className={`${classes.msg} ${m.role === "user" ? classes.user : classes.assistant}`}>
              {streamingThis && !m.content && typedLen === 0 ? (
                <span className={classes.thinking} aria-label="Assistant is thinking">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                <>
                  {linkify(sanitize(displayContent))}
                  {showCursor && <span className={classes.cursor} aria-hidden="true" />}
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
