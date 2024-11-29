<template>
  <v-app>
    <v-app-bar app elevation="15" height="48">
      <v-app-bar-nav-icon v-if="isClient && data" @click="drawer = !drawer" disabled></v-app-bar-nav-icon>

      <v-spacer v-if="!data"></v-spacer>

      <v-app-bar-title :class="{ 'text-center': !data }" style="margin: 0;">
        <NuxtLink to="/">YouWorkout</NuxtLink>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <UserProfile v-if="isClient && data" />
    </v-app-bar>

    <v-main class="h-[95%]">
      <NuxtPage />
    </v-main>

    <!-- Tailwind classes applied to the footer -->
    <v-footer>
      <div class="flex justify-end items-center w-full space-x-4 pr-3 border-t pt-2">
        <div class="text-sm opacity-75">
          &copy;2024 — <strong>Scalli007</strong>
        </div>
        <a href="https://github.com/scalli007YT/YouWorkoutNuxt" target="_blank" rel="noopener noreferrer">
          <v-icon size="small">mdi-github</v-icon>
        </a>

      </div>
    </v-footer>

  </v-app>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
const drawer = ref(false);
const isClient = ref(false);
const { data } = useAuth();
import UserProfile from './components/UserProfile.vue';
import { useTheme } from 'vuetify';

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
