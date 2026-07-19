import { spawn } from 'node:child_process'
import net from 'node:net'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const API_PORT = 8790

/*
 * Start the brain API alongside the dev server so the site never silently
 * runs against the offline stubs. If something already listens on the port
 * (a teammate's terminal), that instance is kept. The child dies with vite
 * and is respawned if it crashes while the dev server is still up.
 */
function brainApi(): Plugin {
  return {
    name: 'brain-api-autostart',
    apply: 'serve',
    configureServer() {
      const probe = net.connect({ port: API_PORT, host: '127.0.0.1' })
      probe.once('connect', () => {
        probe.destroy()
        console.log(`  brain api already running on :${API_PORT} — reusing it`)
      })
      probe.once('error', () => {
        let stopped = false
        const start = () => {
          console.log(`  starting brain api on :${API_PORT}…`)
          const child = spawn('npm', ['run', 'api'], {
            cwd: path.resolve(import.meta.dirname, '../brain'),
            stdio: ['ignore', 'pipe', 'pipe'],
          })
          const relay = (chunk: Buffer) => {
            const text = chunk.toString().trim()
            if (text) console.log(`  [brain] ${text.split('\n').join('\n  [brain] ')}`)
          }
          child.stdout.on('data', relay)
          child.stderr.on('data', relay)
          child.on('exit', (code) => {
            if (stopped) return
            console.log(`  [brain] api exited (${code}); restarting in 2s`)
            setTimeout(start, 2000)
          })
          const stop = () => {
            stopped = true
            child.kill()
          }
          process.once('exit', stop)
          process.once('SIGINT', stop)
          process.once('SIGTERM', stop)
        }
        start()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), brainApi()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  // Live brain API (real OpenAI chat + learning), auto-started by the plugin
  // above. If it still can't come up, the client falls back to local stubs.
  server: {
    proxy: {
      '/api': `http://127.0.0.1:${API_PORT}`,
    },
  },
})
