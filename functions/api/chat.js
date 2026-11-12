// Cloudflare Pages Function: POST /api/chat -> proxies chat messages to Gemini.
// Set GEMINI_API_KEY (and optionally GEMINI_MODEL) as environment variables / secrets
// in Cloudflare Pages -> Settings -> Variables and Secrets.
// (api/chat.js is the cloudflare-style copy, still used by the local Vite dev server.)
const SYSTEM_PROMPT = `You are the friendly assistant on Xyrone Edmund Zamudio's portfolio website.
Xyrone is an IT student/developer focused on software, data and systems. Their motto: "Building systems with code, uncovering answers with data."
They enjoy math (pre-calculus, calculus), built an Arduino line-following truck with a friend, and work with tools such as React, Vite, Python, Java, MongoDB, Laravel and Supabase.
The site has pages for Experience, Certifications, Projects and Blog, plus a downloadable CV on the home page.
Keep answers short (1-4 sentences), warm and honest. If you don't know something about Xyrone, say so and point to the relevant page or the CV instead of inventing details.
Politely steer off-topic questions back to Xyrone's work and portfolio.`;

const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });

export async function onRequestPost({ request, env }) {
  const key = env.GEMINI_API_KEY;
  const model = env.GEMINI_MODEL || "gemini-3.8-flash";
  if (!key) return json({ error: "GEMINI_API_KEY is not configured on the server." }, 500);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const incoming = Array.isArray(payload?.messages) ? payload.messages : [];
  const contents = incoming
    .slice(-MAX_MESSAGES)
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.text === "string" && m.text.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text.slice(0, MAX_CHARS) }],
    }));

  if (!contents.length || contents[contents.length - 1].role !== "user") {
    return json({ error: "Expected a message from the user." }, 400);
  }

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
  });

  try {
    let upstream = null;
    let data;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt) await new Promise((r) => setTimeout(r, 800 * attempt));
      try {
        upstream = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
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

    if (!upstream) return json({ error: "The AI service timed out." }, 504);
    if (!upstream.ok) {
      console.error("Gemini error:", data?.error?.message);
      const busy = [429, 503].includes(upstream.status);
      return json(
        { error: busy ? "The AI is busy right now. Please try again shortly." : "The AI service returned an error." },
        busy ? 503 : 502
      );
    }
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("").trim();
    return json({ reply: reply || "Sorry, I couldn't come up with a reply." });
  } catch (err) {
    console.error("Chat handler failed:", err);
    return json({ error: "Something went wrong." }, 500);
  }
}

export async function onRequest() {
  return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
}
