// Tiny BM25 retriever over CHUNKS. No dependencies, runs in Workers and Node.
import { CHUNKS } from "./chunks.js";

const STOP = new Set(
  "a an the and or but of to in on at for with about is are was were be been am do does did can could would should will you your yours he him his she her it its they them their this that these those what which who whom how when where why tell me us i my we our any some there here as by from not no yes please just also so than then very really more most much many have has had get got know xy xyrone".split(" ")
);

const stem = (w) =>
  w.length > 4 ? w.replace(/(ing|edly|ed|ies|es|s)$/, (m) => (m === "ies" ? "y" : "")) : w;

const tokenize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/[\s.-]+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem);

// Title and tags count more than body text, so they're repeated when indexing.
const docs = CHUNKS.map((c) => {
  const tokens = [
    ...tokenize(c.title), ...tokenize(c.title),
    ...tokenize(c.tags || ""), ...tokenize(c.tags || ""),
    ...tokenize(c.text),
  ];
  const tf = new Map();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
  return { chunk: c, tf, len: tokens.length };
});

const N = docs.length;
const avgLen = docs.reduce((n, d) => n + d.len, 0) / N;
const df = new Map();
for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1);

const K1 = 1.4;
const B = 0.6;

// Generic questions ("overview", "hello", name only) get a general profile instead of nothing.
const OVERVIEW_IDS = ["about", "skills", "edu-college", "exp-aws-creative"];
const overview = () => OVERVIEW_IDS.map((id) => CHUNKS.find((c) => c.id === id)).filter(Boolean);

/** Returns up to `k` chunks relevant to `query`, best first. */
export function retrieve(query, k = 5) {
  const q = [...new Set(tokenize(query))];
  if (!q.length || /\b(overview|summary|introduce|yourself)\b/i.test(query)) return overview();
  const scored = docs.map((d) => {
    let score = 0;
    for (const t of q) {
      const f = d.tf.get(t);
      if (!f) continue;
      const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
      score += (idf * f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / avgLen));
    }
    return { chunk: d.chunk, score };
  });
  const hits = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.chunk);
  return hits.length ? hits : [];
}

/** Formats retrieved chunks as a context block for the prompt. */
export function formatContext(chunks) {
  if (!chunks.length) return "";
  return chunks.map((c, i) => `[${i + 1}] (${c.page} page) ${c.title}\n${c.text}`).join("\n\n");
}
