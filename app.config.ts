export default defineAppConfig({
  hostname: '',
  appSuitePrefix: 'SDS',
  appSuite: 'Docs',
  pageTitle: 'Sample Documentation Site'
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    hostname: string,
    appSuitePrefix: string,
    appSuite: string,
    pageTitle: string
  }
}
