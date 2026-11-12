import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Runs api/chat.js inside the Vite dev server so /api/chat works locally
// the same way it does as a Vercel serverless function.
function devApi(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        Object.assign(process.env, env)
        let raw = ''
        for await (const chunk of req) raw += chunk
        try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = {} }
        res.status = (code) => { res.statusCode = code; return res }
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }
        const { default: handler } = await server.ssrLoadModule('/api/chat.js')
        await handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), devApi(loadEnv(mode, process.cwd(), ''))],
}))
