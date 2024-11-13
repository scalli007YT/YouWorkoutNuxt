export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "vuetify-nuxt-module"
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
    // Uncomment if you want global middleware
    // globalAppMiddleware: true,
  }
})
