export default defineEventHandler((event) => {
  if (getHeader(event, 'x-test-content-error') === 'true' && getRequestURL(event).pathname.endsWith('/query')) {
    throw createError({ statusCode: 503, statusMessage: 'Content unavailable' })
  }
})
