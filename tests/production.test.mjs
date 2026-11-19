import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const fixtureDir = fileURLToPath(new URL('./fixtures/production', import.meta.url))
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))

function run(command, args, cwd, env = {}) {
  const result = spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    timeout: 180_000,
  })
  assert.ifError(result.error)
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
  return result.stdout
}

test('packed layer supports production SSR and static generation', { timeout: 300_000 }, async () => {
  const tempDir = await mkdtemp(join(tmpdir(), 'sds-production-'))
  let server
  let logs = ''

  try {
    const [packed] = JSON.parse(run('npm', ['pack', '--json', '--pack-destination', tempDir], rootDir))
    const files = packed.files.map(file => file.path)
    assert.ok(files.includes('app/assets/css/main.css'))
    assert.ok(files.includes('server/routes/sitemap.xml.ts'))
    assert.ok(!files.some(file => /^(?:\.playground|tests|scripts|\.github)\//.test(file)))

    await cp(fixtureDir, tempDir, {
      recursive: true,
      filter: source => !/(?:^|\/)(?:node_modules|\.nuxt|\.output|\.data|dist)(?:\/|$)/.test(source),
    })
    await writeFile(join(tempDir, 'package.json'), JSON.stringify({
      private: true,
      type: 'module',
      dependencies: {
        [pkg.name]: `file:./${packed.filename}`,
        nuxt: pkg.devDependencies.nuxt,
        vue: pkg.devDependencies.vue,
      },
      allowScripts: pkg.allowScripts,
    }))
    run('npm', ['install', '--offline', '--no-audit', '--no-fund'], tempDir)
    run(process.execPath, ['node_modules/nuxt/bin/nuxt.mjs', 'build'], tempDir, {
      SDS_TEST_LAYER: pkg.name,
      SDS_LINK_CHECK: 'true',
    })

    server = spawn(process.execPath, ['.output/server/index.mjs'], {
      cwd: tempDir,
      env: { ...process.env, NODE_ENV: 'production', NITRO_HOST: '127.0.0.1', NITRO_PORT: '0' },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    const origin = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Server did not start:\n${logs}`)), 30_000)
      const collect = chunk => {
        logs += chunk
        const url = logs.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0]
        if (url) {
          clearTimeout(timeout)
          resolve(url)
        }
      }
      server.stdout.on('data', collect)
      server.stderr.on('data', collect)
      server.once('error', (error) => {
        clearTimeout(timeout)
        reject(error)
      })
      server.once('exit', (code) => {
        clearTimeout(timeout)
        reject(new Error(`Server exited (${code}):\n${logs}`))
      })
    })

    const page = await fetch(`${origin}/docs/guide`)
    assert.equal(page.status, 200, logs)
    const html = await page.text()
    assert.match(html, /This content must be rendered by the installed layer/)
    assert.match(html, /Example footer/)
    assert.match(html, /Documentation/)
    assert.doesNotMatch(html, /Page not found/)

    const stylesheet = html.match(/href="([^"]+\.css)"/)?.[1]
    assert.ok(stylesheet, 'The rendered page must load a stylesheet')
    const css = await fetch(new URL(stylesheet, origin))
    assert.equal(css.status, 200)
    assert.match(await css.text(), /data-sortable/, 'Layer CSS must be included from the installed package')

    const missing = await fetch(`${origin}/docs/missing-page`)
    assert.equal(missing.status, 404)
    assert.match(await missing.text(), /Page not found/)

    const navigation = await fetch(`${origin}/docs/api/navigation/all`)
    assert.equal(navigation.status, 200)
    assert.ok((await navigation.json()).some(item => item.path === '/guide'))

    const sitemap = await fetch(`${origin}/docs/sitemap.xml`)
    assert.equal(sitemap.status, 200)
    assert.match(sitemap.headers.get('content-type'), /application\/xml/)
    assert.match(await sitemap.text(), /<loc>https:\/\/example\.com\/docs\/guide<\/loc>/)

    const unavailable = await fetch(`${origin}/docs/guide`, {
      headers: { 'x-test-content-error': 'true' },
    })
    assert.equal(unavailable.status, 503, (await unavailable.text()).slice(0, 1000))

    const stopped = once(server, 'exit')
    server.kill('SIGTERM')
    await stopped
    server = undefined

    run(process.execPath, ['node_modules/nuxt/bin/nuxt.mjs', 'generate'], tempDir, {
      SDS_TEST_LAYER: pkg.name,
      SDS_LINK_CHECK: 'true',
    })
    const generated = await readFile(join(tempDir, '.output/public/guide/index.html'), 'utf8')
    assert.match(generated, /This content must be rendered by the installed layer/)
    const generatedSitemap = await readFile(join(tempDir, '.output/public/sitemap.xml'), 'utf8')
    assert.match(generatedSitemap, /<loc>https:\/\/example\.com\/docs\/guide<\/loc>/)
  } finally {
    if (server && server.exitCode === null && server.signalCode === null) {
      const stopped = once(server, 'exit')
      server.kill('SIGTERM')
      await stopped
    }
    await rm(tempDir, { recursive: true, force: true })
  }
})
