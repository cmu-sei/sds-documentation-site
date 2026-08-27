import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const fixtureDir = fileURLToPath(new URL('./fixtures/broken-internal-link', import.meta.url))
const brokenHashFixtureDir = fileURLToPath(new URL('./fixtures/broken-hash', import.meta.url))
const encodedHashFixtureDir = fileURLToPath(new URL('./fixtures/valid-encoded-hash', import.meta.url))
const nuxtCli = fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url))

function generate(fixtureDir) {
  return spawnSync(process.execPath, [nuxtCli, 'generate', fixtureDir], {
    cwd: rootDir,
    encoding: 'utf8',
    env: {
      ...process.env,
      SDS_LINK_CHECK: 'true',
    },
  })
}

test('downstream generation fails for a broken internal link when link checking is enabled', () => {
  const result = generate(fixtureDir)
  const output = `${result.stdout}\n${result.stderr}`

  assert.notEqual(result.status, 0, output)
  assert.match(output, /\/missing-page/, output)
})

test('downstream generation accepts an encoded fragment that resolves to an element id', () => {
  const result = generate(encodedHashFixtureDir)
  const output = `${result.stdout}\n${result.stderr}`

  assert.equal(result.status, 0, output)
})

test('downstream generation fails when a fragment does not resolve to an element id', () => {
  const result = generate(brokenHashFixtureDir)
  const output = `${result.stdout}\n${result.stderr}`

  assert.notEqual(result.status, 0, output)
  assert.match(output, /missing-section/, output)
  assert.match(output, /missing-hash/, output)
})