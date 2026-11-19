export default defineNuxtConfig({
  extends: ['..'],
  site: { url: 'https://sds-templates.sei.cmu.edu' },
  modules: ['@nuxt/eslint'],
  typescript: {
    tsConfig: {
      exclude: ['../../tests/**'],
    },
  },
  compatibilityDate: '2025-11-14'
})