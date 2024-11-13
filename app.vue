<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to Nuxt UI Starter</h1>
          <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
          </ColorScheme>
        </div>
      </template>
      <!-- Use @click instead of onclick -->
      <UButton icon="i-heroicons-book-open" @click="handleLogin" target="_blank">Click</UButton>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { signIn, signOut } = useAuth()

function handleLogin() {
  signIn('github')
}
</script>
