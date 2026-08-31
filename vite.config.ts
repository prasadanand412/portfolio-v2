import { defineConfig } from 'vite'

// Dev/preview servers stay on localhost with Vite's Host-header check enabled.
// Do not set `host: true` or `allowedHosts: true` here: together they expose the
// dev server to everyone on the local network and to DNS-rebinding attacks from
// any page the browser happens to visit. If you need a tunnel for a demo, add
// the single hostname to `allowedHosts` as an array instead of enabling all.
export default defineConfig({
  server: { host: 'localhost' },
  preview: { host: 'localhost' },
})
