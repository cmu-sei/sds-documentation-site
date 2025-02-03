import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // Fetch all documents
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const docs = await queryCollection(event, 'content').all()
  const sitemap = new SitemapStream({
    hostname: appConfig.sitemap.hostname
  })

  for (const doc of docs) {
    sitemap.write({
      url: doc.path,
      changefreq: appConfig.sitemap.changefreq
    })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})