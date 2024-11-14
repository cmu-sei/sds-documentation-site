export default defineAppConfig({
  appSuitePrefix: 'SDS',
  appSuite: 'Docs',
  pageTitle: 'Sample Documentation Site'
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    appSuitePrefix: string,
    appSuite: string,
    pageTitle: string
  }
}
