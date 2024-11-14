import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  compatibilityDate: "2024-11-12",

  runtimeConfig: {
    public: {
      authSecret: process.env.NUXT_AUTH_SECRET,
      githubClientId: process.env.NUXT_GITHUB_CLIENT_ID,
      githubClientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    }
  },

  auth: {
    baseURL: `http://localhost:${process.env.PORT || 3000}`
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
})
