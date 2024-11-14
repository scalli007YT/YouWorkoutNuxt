<template>
  <v-app>
    <v-app-bar app elevation="15" height="48">
      <v-app-bar-nav-icon v-if="isClient && data" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer v-if="!data"></v-spacer>

      <v-app-bar-title :class="{ 'center-title': !data }" style="margin: 0;">
        YouWorkout
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-if="isClient && data">
        <v-btn icon @click="toggleTheme">
          <v-icon>mdi-theme-light-dark</v-icon>
          <v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
        </v-btn>

        <v-btn icon @click="openSettings">
          <v-icon>mdi-cogs</v-icon>
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
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

function openSettings() {
  console.log('Opening settings...');
}
</script>

<style scoped>
.center-title {
  text-align: center;
  width: 100%;
}
</style>
