import '@sds/components-vue3/volar'
import SdsComponents from '@sds/components-vue3'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(SdsComponents)
})