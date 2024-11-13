<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { signIn, signOut, data } = useAuth()
function handleLogin() {
  signIn('github')
}
</script>
