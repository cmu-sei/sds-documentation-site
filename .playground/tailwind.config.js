import sdsConfig from '@sds/tailwindcss-3'

export default {
  presets: [
    sdsConfig
  ],
  content: [
    "app.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    'content/**/*.md',
    // Note the addition of our @sds/components-vue3 node module directories
    './node_modules/@sds/components-vue3/src/components/**/*.{js,vue,ts}',
  ],
}