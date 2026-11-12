import React, { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import happy from "../assets/chatbot/happy.png";
import neutral from "../assets/chatbot/neutral.png";
import saying from "../assets/chatbot/saying.gif";
import thinking from "../assets/chatbot/thinking.gif";
import "../styles/chatbot.css";

const FACES = { neutral, happy, thinking, saying };
const GREETING = "Hi! I'm Xyrone's assistant. Ask me about their projects, experience or skills.";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [face, setFace] = useState("neutral");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const listRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    timers.current.forEach(clearTimeout);
    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setFace("thinking");

    let reply;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // skip the canned greeting; the API expects the conversation to start with the user
        body: JSON.stringify({ messages: next.slice(1) }),
        signal: AbortSignal.timeout(60000),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      reply = data.reply;
    } catch (err) {
      const msg = err?.message && err.message !== "Request failed" && !/JSON|fetch|abort|timed/i.test(err.message)
        ? err.message
        : "Sorry, I can't reach my brain right now. Please try again in a moment.";
      setMessages((m) => [...m, { role: "assistant", text: msg }]);
      setBusy(false);
      setFace("neutral");
      return;
    }

    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setBusy(false);
    // talk for a duration proportional to the reply, then smile, then settle
    const talk = Math.min(Math.max(reply.length * 35, 1200), 5000);
    setFace("saying");
    later(() => setFace("happy"), talk);
    later(() => setFace("neutral"), talk + 2500);
  }

  return (
    <div className="chatbot">
      {open && (
        <section className="chatbot-panel" aria-label="Chat with Xyrone's assistant">
          <header className="chatbot-header">
            <img src={FACES[face]} alt="" className={`chatbot-header-face face-${face}`} />
            <div>
              <strong>Xyrone's Assistant</strong>
              <span>{busy ? "Thinking…" : "Online"}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-messages" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={`chatbot-msg ${m.role}`}>{m.text}</p>
            ))}
            {busy && <p className="chatbot-msg assistant chatbot-typing">…</p>}
          </div>

          <form className="chatbot-form" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              maxLength={500}
              aria-label="Your message"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <img src={FACES[open ? face : "neutral"]} alt="" className={`face-${open ? face : "neutral"}`} />
      </button>
    </div>
  );
}
