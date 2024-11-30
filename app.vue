<template>
  <SpeedInsights />
  <v-app>
    <v-app-bar app elevation="15" height="48">
      <v-icon v-if="authData" class="mx-4">mdi-run</v-icon>

      <v-spacer v-if="!authData"></v-spacer>

      <v-app-bar-title :class="{ 'text-center': !authData }" class="ma-0">
        <NuxtLink to="/">YouWorkout</NuxtLink>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <UserProfile v-if="isClient && authData" />
    </v-app-bar>

    <v-main class="h-[95%]">
      <NuxtPage />
    </v-main>

    <!-- Tailwind classes applied to the footer -->
    <v-footer class="d-flex justify-between align-center">
      <div class="flex justify-end items-center w-full space-x-4 pr-3 border-t pt-2">
        <div class="text-sm opacity-50">
          &copy;2024 — <span>Scalli007</span>
        </div>
        <a :href="useRuntimeConfig().public.githubRepoUrl" target="_blank" rel="noopener noreferrer">
          <v-icon size="small" class="text-opacity-50">mdi-github</v-icon>
        </a>
        <a :href="`${useRuntimeConfig().public.githubRepoUrl}commit/${commitId}`" target="_blank"
          rel="noopener noreferrer">
          <span class="text-sm opacity-50">{{ commitId?.slice(0, 7) }}</span>
        </a>
      </div>
    </v-footer>

  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
import UserProfile from './components/UserProfile.vue';

// Auth data
const { data: authData } = useAuth();


const { data: commitResponse, error: fetchError } = await useFetch('/api/latest-commit');
const commitId = ref(commitResponse?.value.commitId)

// Client-side rendering check
const isClient = ref(false);

const theme = useTheme();

onMounted(() => {
  isClient.value = true;
});

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'workoutLight' : 'workoutDark';
}
</script>

<style scoped>
.v-application {
  background: radial-gradient(circle, rgba(var(--v-theme-dots)) 10%, transparent 7%);
  background-position: 0 0;
  background-size: 20px 20px;
}
</style>
