// file: ~/server/api/auth/[...].ts
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitchProvider from 'next-auth/providers/twitch'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  pages: {
    signIn: '/login',
    signOut: '/',
  },

  secret: useRuntimeConfig().public.authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: useRuntimeConfig().public.githubClientId,
      clientSecret: useRuntimeConfig().public.githubClientSecret
    }),
     // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: useRuntimeConfig().public.googleClientId,
      clientSecret: useRuntimeConfig().public.googleClientSecret
    }),
     // @ts-expect-error Use .default here for it to work during SSR.
     TwitchProvider.default({
      clientId: useRuntimeConfig().public.twitchClientId,
      clientSecret: useRuntimeConfig().public.twitchClientSecret
    })
  ],
})