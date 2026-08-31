// Prints the CSP source expression for the inline <script> in index.html.
// The Content-Security-Policy in vercel.json pins this hash, so run
// `npm run csp-hash` and paste the output into script-src after editing it.
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])

if (inline.length !== 1) {
  console.error(`expected exactly 1 inline <script>, found ${inline.length}`)
  process.exit(1)
}

const digest = createHash('sha256').update(inline[0], 'utf8').digest('base64')
console.log(`'sha256-${digest}'`)
