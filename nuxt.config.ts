export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/fonts'],
  nitro: {
    experimental: {
      websocket: true
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  ssr: false,

  compatibilityDate: '2024-11-19'
})