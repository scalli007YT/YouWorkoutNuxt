<template>
  <v-app>
    <v-app-bar app elevation="15" height="48">
      <v-app-bar-nav-icon v-if="isClient && data" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer v-if="!data"></v-spacer>

      <v-app-bar-title :class="{ 'text-center': !data }" style="margin: 0;">
        <NuxtLink to="/">YouWorkout</NuxtLink>
      </v-app-bar-title>


      <v-spacer></v-spacer>

      <template v-if="isClient && data">
        <v-btn icon @click="toggleTheme">
          <v-icon>mdi-theme-light-dark</v-icon>
          <v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
        </v-btn>

        <v-btn icon @click="openSettings">
          <v-icon>mdi-cog</v-icon>
          <v-tooltip activator="parent" location="bottom">Open Settings</v-tooltip>
        </v-btn>

        <UserProfile />
      </template>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>


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

function openSettings() {
  console.log('Opening settings...');
}

// Computed property to determine the dot color based on the theme
const dotColor = computed(() => {
  return theme.global.current.value.dark ? '#161616' : '#B3B3B3'; // dark theme: dark color, light theme: light color
});

</script>

<style scoped>
.v-application {
  background: radial-gradient(circle, rgba(var(--v-theme-dots)) 10%, transparent 10%);
  background-position: 0 0;
  background-size: 20px 20px;
}
</style>
