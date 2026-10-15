import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

async function withServer(fn) {
  const server = createApp().listen(0)
  const { port } = server.address()
  try {
    await fn(`http://127.0.0.1:${port}`)
  } finally {
    server.close()
  }
}

test('lists notes', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/notes`)
    assert.equal(res.status, 200)
    assert.ok(Array.isArray(await res.json()))
  }))

test('creates a note', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/notes`, { method: 'POST', body: JSON.stringify({ text: 'hello' }) })
    assert.equal(res.status, 201)
    assert.equal((await res.json()).text, 'hello')
  }))

test('rejects an empty note', () =>
  withServer(async (base) => {
    const res = await fetch(`${base}/notes`, { method: 'POST', body: '{}' })
    assert.equal(res.status, 422)
  }))
