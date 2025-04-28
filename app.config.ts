export default defineAppConfig({
  sitemap: {
    hostname: '',
    changefreq: 'monthly'
  },
  appSuitePrefix: 'SDS',
  appSuite: 'Docs',
  pageTitle: 'Sample Documentation Site'
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    sitemap: {
      hostname: string,
      changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    }
    githubUrl?: string
    appSuitePrefix: string,
    appSuite: string,
    pageTitle: string
  }
}
