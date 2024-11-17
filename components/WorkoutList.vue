<template>
  <v-list class="pa-0">
    <!-- Loop through workouts and display each one inside a v-card -->
    <v-list-item v-for="(workout, index) in workouts" :key="index" class="pa-0 my-2">
      <ListItem :index="index" :workout="workout" />
    </v-list-item>
  </v-list>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const store = useWorkoutStore();
const workouts = ref();

async function fetchWorkouts() {
  const workoutData = await store.getUserWorkouts();
  if (workoutData.length > 0) {
    workouts.value = workoutData; // Set the fetched workouts
  } else {
    console.warn("No workouts found");
  }
}
// Actions for the appended icons
function onPlayClick() {
  console.log("Play button clicked!");
}
function onSecondActionClick() {
  console.log("Second button clicked!");
}
// Automatically fetch workouts when the module is loaded
onMounted(fetchWorkouts);
</script>

<style></style>
