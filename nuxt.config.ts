// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],

  content: {
    documentDriven: true,
    experimental: {
      search: {
        indexed: true
      }
    },
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
  },

  routeRules: {
    '/': { prerender: true }
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
  }
})