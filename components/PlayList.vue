<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';

// Define the type for a workout
interface Workout {
  id: string;
  name: string;
  intensity: string;
  musclegroup: string[];  // Array of muscle groups
}

const store = useWorkoutStore();

// Workouts array and loading state
const workouts = ref<Workout[]>([]);
const loading = ref(true);

// Automatically fetch workouts when the module is loaded
onMounted(async () => {
  await store.updateUserWorkouts();
  workouts.value = store.workouts;
  loading.value = false;
});

// Define filter states with default values
const filter = useState('filter', () => localStorage.getItem('filter') || '');
const Intensityfilter = useState('Intensityfilter', () => JSON.parse(localStorage.getItem('Intensityfilter') || '[]'));
const Groupfilter = useState('Groupfilter', () => JSON.parse(localStorage.getItem('Groupfilter') || '[]'));

// Watch for changes in filters and update localStorage
watch([filter, Intensityfilter, Groupfilter], () => {
  localStorage.setItem('filter', filter.value);
  localStorage.setItem('Intensityfilter', JSON.stringify(Intensityfilter.value));
  localStorage.setItem('Groupfilter', JSON.stringify(Groupfilter.value));
}, { deep: true });

// Compact filter function for workouts
const filterWorkouts = (workout: Workout) =>
  (!filter.value || workout.name.startsWith(filter.value)) &&
  (!Intensityfilter.value.length || Intensityfilter.value.includes(workout.intensity)) &&
  (!Groupfilter.value.length || workout.musclegroup.some(group => Groupfilter.value.includes(group)));

// Computed property to filter workouts
const filteredWorkouts = computed(() => workouts.value.filter(filterWorkouts));
</script>

<template>
  <ListSearch />

  <v-list class="pa-0 max-h-[26em] overflow-y-auto custom-scrollbar">
    <v-skeleton-loader v-if="loading" type="list-item-avatar" class="pa-0 my-2" :loading="loading" />

    <!-- Loop through filtered workouts -->
    <v-list-item v-for="(workout) in filteredWorkouts" :key="workout.id" class="pa-0 my-2">
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
