<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

// Access stores
const workoutStore = useWorkoutStore();  // Manages workout data
const playStore = usePlayStore();        // Manages filter data

// Destructure state from Pinia stores
const { workouts } = storeToRefs(workoutStore);  // Access workouts state
const { filter } = storeToRefs(playStore);       // Access filters from playStore

// Loading state
const loading = ref<boolean>(true);  // Local loading state

// Define the type for a Workout
interface Workout {
  id: string;
  name: string;
  intensity: string;
  musclegroup: string[];
}

// Automatically fetch workouts when the module is loaded
onMounted(async () => {
  loading.value = true;
  await workoutStore.updateUserWorkouts();  // Fetch workouts from the store
  loading.value = false;
});

// Computed properties bound to the Pinia store
const searchFilter = computed<string>(() => filter.value.search);
const intensityFilter = computed<string[]>(() => filter.value.intensity);
const groupFilter = computed<string[]>(() => filter.value.group);

// Filter function for workouts
const filterWorkouts = (workout: Workout) =>
  (!searchFilter.value || workout.name.toLowerCase().startsWith(searchFilter.value.toLowerCase())) &&
  (!intensityFilter.value.length || intensityFilter.value.includes(workout.intensity)) &&
  (!groupFilter.value.length || workout.musclegroup.some(group => groupFilter.value.includes(group)));

// Computed property for filtered workouts
const filteredWorkouts = computed<Workout[]>(() => workouts.value.filter(filterWorkouts));
</script>

<template>
  <ListSearch />

  <v-list class="pa-0 max-h-[26.5em] overflow-y-auto scrollbar-thumb-rounded-full">
    <v-skeleton-loader v-if="loading" type="list-item-avatar" class="pa-0 my-2" :loading="loading" />

    <!-- Loop through filtered workouts -->
    <v-list-item v-else v-for="(workout) in filteredWorkouts" :key="workout.id" class="pa-0 my-2">
      <PlayListItem :workout="workout" />
    </v-list-item>
  </v-list>
</template>


<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track:hover {
  background: transparent;
}
</style>