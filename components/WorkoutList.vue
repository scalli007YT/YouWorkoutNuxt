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
  <v-list class="pa-0 max-h-[33em] custom-scrollbar">
    <v-skeleton-loader v-if="loading" type="list-item-avatar" class="pa-0 my-4" :loading="loading" />
    <v-list-item v-for="(workout) in store.workouts" :key="workout" class="pa-0 my-6" v-if="!loading">
      <ListItem :workout="workout" />
    </v-list-item>
  </v-list>
</template>


<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 8px;
  /* Rounded corners */
  /* Ensure the scrollbar thumb is invisible */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  /* Ensure the track is invisible */
}

/* For Firefox */
.custom-scrollbar {
  scrollbar-width: 8px;
}
</style>