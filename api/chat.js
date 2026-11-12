// Serverless endpoint (Vercel) that proxies chat messages to Gemini.
// The API key stays on the server: set GEMINI_API_KEY in Vercel env vars / .env.local.
import { retrieve, formatContext } from "../knowledge/retrieve.js";

const MODEL =process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const SYSTEM_PROMPT = `You are the friendly assistant on Xyrone Edmund Zamudio's portfolio website.
Xyrone is an IT student/developer focused on software, data and systems. Their motto: "Building systems with code, uncovering answers with data."
They enjoy math (pre-calculus, calculus), built an Arduino line-following truck with a friend, and work with tools such as React, Vite, Python, Java, MongoDB, Laravel and Supabase.
The site has pages for Experience, Certifications, Projects and Blog, plus a downloadable CV on the home page.
Keep answers short (1-4 sentences), warm and honest. If you don't know something about Xyrone, say so and point to the relevant page or the CV instead of inventing details.
Politely steer off-topic questions back to Xyrone's work and portfolio.`;

const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const contents = incoming
    .slice(-MAX_MESSAGES)
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.text === "string" && m.text.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text.slice(0, MAX_CHARS) }],
    }));

  if (!contents.length || contents[contents.length - 1].role !== "user") {
    return res.status(400).json({ error: "Expected a message from the user." });
  }

  // RAG: retrieve site facts relevant to the last two user messages (so follow-ups work).
  const recentUser = incoming.filter((m) => m?.role === "user" && typeof m.text === "string").slice(-2);
  const context = formatContext(retrieve(recentUser.map((m) => m.text.slice(0, MAX_CHARS)).join(" "), 5));
  const system = context
    ? `${SYSTEM_PROMPT}\n\nSITE FACTS (retrieved for this question). Answer from these when relevant, be specific (names, dates, links), and don't invent details beyond them. If they don't cover the question, say you're not sure and point to the relevant page or the CV:\n\n${context}`
    : SYSTEM_PROMPT;

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
  });

  try {
    // Gemini sometimes answers 429/500/503 ("high demand") or stalls; retry a few
    // times with a hard per-attempt timeout so the UI never hangs.
    let upstream, data;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt) await new Promise((r) => setTimeout(r, 800 * attempt));
      try {
        upstream = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": key },
            body,
            signal: AbortSignal.timeout(15000),
          }
        );
        data = await upstream.json();
      } catch (err) {
        console.error(`Gemini attempt ${attempt + 1} failed:`, err.name);
        upstream = null;
        continue;
      }
      if (upstream.ok || ![429, 500, 503].includes(upstream.status)) break;
      console.error(`Gemini attempt ${attempt + 1}:`, data?.error?.message);
    }

    if (!upstream) return res.status(504).json({ error: "The AI service timed out." });
    if (!upstream.ok) {
      console.error("Gemini error:", data?.error?.message);
      const busy = [429, 503].includes(upstream.status);
      return res.status(busy ? 503 : 502).json({
        error: busy ? "The AI is busy right now. Please try again shortly." : "The AI service returned an error.",
      });
    }
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("").trim();
    return res.status(200).json({ reply: reply || "Sorry, I couldn't come up with a reply." });
  } catch (err) {
    console.error("Chat handler failed:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
