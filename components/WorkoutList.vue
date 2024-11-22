<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const store = useWorkoutStore();
// Automatically fetch workouts when the module is loaded
onMounted(store.updateUserWorkouts);
const workouts = ref(store.workouts);


// Actions for the appended icons
function onPlayClick() {
  console.log("Play button clicked!");
}
</script>

<template>
  <v-list class="pa-0">
    <!-- Loop through workouts and display each one inside a v-card -->
    <v-list-item v-for="(workout, index) in workouts" :key="workout" class="pa-0 my-2">
      <ListItem :index="index" :workout="workout" />
    </v-list-item>
  </v-list>
</template>

<style></style>
