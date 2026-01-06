export default defineAppConfig({
  sitemap: {
    hostname: 'https://sds-templates.sei.cmu.edu/',
  },
  githubUrl: 'https://github.com',
  appSuitePrefix: 'SEI',
  appSuite: 'SDS',
  pageTitle: 'Documentation Site',
  navigation: [
    { title: 'Home', path: '/' },
    {
      title: 'Getting Started',
      path: '/getting-started',
      children: [
        { title: 'asdfasdf', path: '/guides/installation' },
        { title: 'fewfwef', path: '/guides/configuration' }
      ]
    },
    {
      title: 'Guides', path: '/guides', children: [
        { title: 'Installation', path: '/guides/installation' },
        { title: 'Configuration', path: '/guides/configuration' }
      ]
    },
    { title: 'API Reference', path: '/api' },
  ],
  footerLinks: [
    { title: 'Contact Us', path: 'https://sei.cmu.edu/contact-us/' },
    { title: 'Office Locations', path: 'https://sei.cmu.edu/locations/' }
  ],
})
