export default defineAppConfig({
  sitemap: { hostname: 'https://example.com' },
  navigation: [
    { title: 'Home', path: '/' },
    { title: 'Documentation', children: [{ title: 'Guide', path: '/guide' }] },
  ],
  footerLinks: [{ title: 'Example footer', path: 'https://example.com/footer' }],
})
