<template>
  <v-app>
    <v-app-bar app elevation="15" height="48">
      <v-app-bar-nav-icon v-if="data" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer v-if="!data"></v-spacer>

      <v-app-bar-title :class="{ 'center-title': !data }" style="margin: 0;">
        YouWorkout
      </v-app-bar-title>


      <v-spacer></v-spacer>

      <!-- Grouped User Profile elements -->
      <template v-if="data">
        <v-btn icon @click="">
          <v-icon>mdi-theme-light-dark</v-icon>
          <v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
        </v-btn>

        <v-btn icon @click="">
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

<!-- <NuxtPage /> -->

<script setup lang="ts">
import { Style } from '#build/components';
import { ref, watch } from 'vue';
const drawer = ref(false);

const { status, data } = useAuth()
</script>

<style scoped>
.center-title {
  text-align: center;
  width: 100%;
}
</style>