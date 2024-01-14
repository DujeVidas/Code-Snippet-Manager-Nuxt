// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
  
  ],
  quasar: {
    plugins: [
      'Notify',
      'Loading' 
    ],
  },
  ssr: false
})
