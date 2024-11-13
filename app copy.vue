<template>
  <v-app id="YouWorkout">
    <v-navigation-drawer v-if="data" v-model="drawer" class="content-drawer" app>
      <v-list>
        <v-list-item class="drawer-item">
          <router-link to="/" style="text-decoration: none; color: inherit">
            <v-list-item-content>
              <v-list-item-title class="drawer-text">Home</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="15" height="48">
      <v-app-bar-nav-icon v-if="data" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer v-if="!data"></v-spacer>


      <router-link to="/" style="text-decoration: none; color: inherit">
        <v-app-bar-title :class="{ 'center-title': !data }">
          YouWorkout
        </v-app-bar-title>
      </router-link>

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

<script setup lang="ts">
import { ref, watch } from 'vue';
const drawer = ref(false);

const { status, data } = useAuth()
console.log(status.value)
</script>
