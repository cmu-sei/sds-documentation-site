import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: [process.env.SDS_TEST_LAYER || '../../..'],
  app: { baseURL: '/docs/' },
  site: { url: 'https://example.com' },
  devtools: { enabled: false },
})
