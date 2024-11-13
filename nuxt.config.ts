// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt"
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
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'github',
      addDefaultCallbackUrl: true
    }
  }
})
