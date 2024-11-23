<template>
  <v-container fluid fill-height class="d-flex flex-column align-center justify-center">
    <v-card elevation="8" class="mx-auto pa-6 max-w-2xl rounded-xl border">
      <div class="text-center">
        <v-icon large>mdi-application</v-icon> <!-- Replace with actual logo -->
      </div>

      <v-divider class="my-3"></v-divider>

      <v-card-title class="text-center headline">
        Welcome to Application
      </v-card-title>

      <v-divider class="my-3">Social Sign-In</v-divider>

      <v-card-actions class="justify-center">
        <!-- Hardcoded for a specific provider, e.g., 'google' -->
        <v-btn icon="mdi-google" @click="signIn('google')" />
        <v-btn icon="mdi-github" @click="signIn('github')" />
        <v-btn icon="mdi-twitch" @click="signIn('twitch')" />

      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
// Import the authentication hook
const { signIn } = useAuth();

// Middleware to prevent authenticated users from accessing this page
definePageMeta({
  middleware: 'auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
});
</script>

<style scoped>
html,
body,
#app,
.v-application {
  height: 100%;
  margin: 0;
}

.v-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
