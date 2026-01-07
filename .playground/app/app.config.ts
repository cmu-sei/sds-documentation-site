export default defineAppConfig({
  sitemap: {
    hostname: 'https://sds-templates.sei.cmu.edu/',
  },
  githubUrl: 'https://github.com',
  appSuitePrefix: 'SEI',
  appSuite: 'SDS',
  pageTitle: 'Documentation Site',
  navigation: [
    { title: 'About', path: '/' },
    {
      title: 'Features',
      path: '/features',
      children: [
        { title: 'Code Blocks', path: '/features/codeblocks' },
        { title: 'Callouts', path: '/features/callouts' }
      ]
    },
    {
      title: 'Guides',
      children: [
        { title: 'FlowStack', path: '/flowstack' },
        { title: 'Lume', path: '/lume' },
        { title: 'ScribeAI', path: '/scribeai' },
        { title: 'VaultSync', path: '/vaultsync' },
      ]
    },
    { title: 'Contact Us', path: '/contact-us' },
  ],
  footerLinks: [
    { title: 'Contact Us', path: 'https://sei.cmu.edu/contact-us/' },
    { title: 'Office Locations', path: 'https://sei.cmu.edu/locations/' }
  ],
})
