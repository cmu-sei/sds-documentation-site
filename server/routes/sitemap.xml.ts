import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig(event)
  const siteUrl = new URL(appConfig.sitemap.hostname)

  if (siteUrl.pathname === '/') {
    siteUrl.pathname = runtimeConfig.app.baseURL
  }

  siteUrl.pathname = `${siteUrl.pathname.replace(/\/+$/, '')}/`
  siteUrl.search = ''
  siteUrl.hash = ''

  // Fetch all documents
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const docs = await queryCollection(event, 'content').all()
  const sitemap = new SitemapStream()

  for (const doc of docs) {
    if (doc.path.endsWith('/.navigation')) {
      continue
    }

    sitemap.write({
      url: new URL(doc.path.replace(/^\/+/, ''), siteUrl).href,
      changefreq: appConfig.sitemap.changefreq
    })
  }

  sitemap.end()
  setResponseHeader(event, 'content-type', 'application/xml; charset=UTF-8')

  return streamToPromise(sitemap)
})
