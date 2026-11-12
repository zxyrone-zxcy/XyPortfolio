// Cloudflare Worker entry: handles /api/chat, everything else is served from ./dist.
import { onRequestPost, onRequest } from "../functions/api/chat.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/chat") {
      return request.method === "POST" ? onRequestPost({ request, env }) : onRequest();
    }
    return env.ASSETS.fetch(request);
  },
};
