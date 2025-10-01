import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-gtag', '@vueuse/nuxt', '@nuxt/content', '@nuxt/icon'],

  // Enable experimental features for better performance
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },

  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: true,
      icons: [
        'material-symbols:search',
        'material-symbols:menu',
        'material-symbols:keyboard-arrow-left',
        'material-symbols:keyboard-arrow-right',
        'material-symbols:keyboard-arrow-down',
        'material-symbols:format-list-bulleted',
        'material-symbols:code',
        'material-symbols:warning-outline',
        'material-symbols:check-circle-outline',
        'material-symbols:visibility',
        'material-symbols:visibility-off',
        'material-symbols:file-copy',
        'material-symbols:check',
        'material-symbols:close-fullscreen',
        'material-symbols:open-in-full',
        'material-symbols:fullscreen-exit',
        'material-symbols:fullscreen',
        'material-symbols:nightlight-outline',
        'material-symbols:sunny-outline',
        'material-symbols:arrow-back',
        'material-symbols:arrow-forward',
      ],
    }
  },

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
    '@cmu-sei/sei-design-system/open-sans/index.css',
    // Provide the Tailwind CSS directives to our app
    '../assets/css/main.css',
    // Provide the CSS for every component
    '@cmu-sei/sei-design-system/dist/style.css',
  ],

  build: {
    transpile: ['@cmu-sei/sei-design-system'],
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
      // Limit concurrent renders to reduce memory usage
      concurrency: 5,
      // Add interval between renders to allow garbage collection
      interval: 100,
      // Fail gracefully instead of crashing
      failOnError: false,
      // Retry failed routes
      retry: 3,
      retryDelay: 500
    },
    // Enable memory optimizations
    experimental: {
      wasm: false
    },
    // Reduce payload size
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production')
    }
  },

  compatibilityDate: '2025-01-22'
})