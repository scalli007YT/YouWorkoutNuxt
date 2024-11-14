<template>
  <button v-for="provider in providers" :key="provider.id" @click="signIn(provider.id)">
    Sign in with {{ provider.name }}
  </button>
</template>

<script lang="ts" setup>
const { signIn, getProviders } = useAuth()
const providers = await getProviders()

definePageMeta({
  middleware: 'auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})

</script>


<style></style>