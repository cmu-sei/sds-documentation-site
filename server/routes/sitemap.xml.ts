import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: appConfig.sitemap.hostname
  })

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: appConfig.sitemap.changefreq
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})