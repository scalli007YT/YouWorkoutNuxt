// file: ~/server/api/auth/[...].ts
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().public.authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: useRuntimeConfig().public.githubClientId,
      clientSecret: useRuntimeConfig().public.githubClientSecret
    })
  ]
})