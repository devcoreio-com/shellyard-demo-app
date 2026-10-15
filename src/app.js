import { createServer } from 'node:http'

/** In-memory notes. */
const notes = [{ id: 1, text: 'Ship the demo' }]

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

/** Creates the HTTP server. Routes: GET /notes, POST /notes. */
export function createApp() {
  return createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/notes') return send(res, 200, notes)
    if (req.method === 'POST' && req.url === '/notes') {
      let raw = ''
      req.on('data', (c) => (raw += c))
      req.on('end', () => {
        const { text } = JSON.parse(raw || '{}')
        if (!text) return send(res, 422, { error: 'text is required' })
        const note = { id: notes.length + 1, text }
        notes.push(note)
        send(res, 201, note)
      })
      return
    }
    send(res, 404, { error: 'not found' })
  })
}
