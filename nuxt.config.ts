import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia-plugin-persistedstate/nuxt",

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
      googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
      twitchClientId: process.env.NUXT_TWITCH_CLIENT_ID,
      twitchClientSecret: process.env.NUXT_TWITCH_CLIENT_SECRET,
      githubRepoUrl: process.env.NUXT_GITHUB_REPO_URL,
    }
  },

  auth: {
    baseURL: process.env.NUXT_VERCEL_URL 
      ? `https://${process.env.NUXT_VERCEL_URL}`  // For production on Vercel
      : `http://localhost:${process.env.PORT || 3000}`,  // For local development
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
