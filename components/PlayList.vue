<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const store = useWorkoutStore();
const loading = ref(true); // Add a loading state to track whether data is still being fetched

// Automatically fetch workouts when the module is loaded
onMounted(async () => {
  await store.updateUserWorkouts();  // Wait for the workout data to load
  loading.value = false; // Set loading to false once data is fetched
});
</script>

<template>
  <v-list class="pa-0">
    <!-- Display skeleton that mimics the list item structure -->
    <v-skeleton-loader v-if="loading" type="list-item-avatar" class="pa-0 my-2" :loading="loading" />

    <!-- Loop through workouts and display each one inside a v-card -->
    <v-list-item v-for="(workout, index) in store.workouts" :key="workout" class="pa-0 my-2" v-if="!loading">
      <ListItem :index="index" :workout="workout" />
    </v-list-item>
  </v-list>
</template>
