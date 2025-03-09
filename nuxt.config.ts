export default defineNuxtConfig({
  modules: ['@vueuse/nuxt'],
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
  compatibilityDate: '2024-11-19',
  //disable ssr untill theme selector is implemented
  ssr: false
})