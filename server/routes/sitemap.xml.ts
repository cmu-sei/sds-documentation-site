import { SitemapStream, streamToPromise } from 'sitemap'
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig(event)
  const siteUrl = URL.parse(appConfig.sitemap.hostname)
  if (!siteUrl || !['http:', 'https:'].includes(siteUrl.protocol)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid sitemap configuration',
      message: 'Set sitemap.hostname to an absolute HTTP(S) URL in app/app.config.ts.',
    })
  }

  if (siteUrl.pathname === '/') {
    siteUrl.pathname = runtimeConfig.app.baseURL
  }

  siteUrl.pathname = `${siteUrl.pathname.replace(/\/+$/, '')}/`
  siteUrl.search = ''
  siteUrl.hash = ''

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
