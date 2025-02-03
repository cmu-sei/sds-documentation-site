// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
          langs: [
            'bash',
            'c',
            'cpp',
            'java',
            'javascript',
            'perl',
            'python',
            'rust'
          ]
        }
      }
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' }
      ]
    }
  },

  css: [
    // Provide the Open Sans font used by our Tailwind preset
    '@sds/tailwindcss-3/open-sans/index.css',
    // Provide the CSS for every component
    '@sds/components-vue3/dist/style.css',
  ],

  build: {
    transpile: ['@sds/components-vue3'],
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  compatibilityDate: '2025-01-22'
})