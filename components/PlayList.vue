<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
const store = useWorkoutStore();
const loading = ref(true);

// Automatically fetch workouts when the module is loaded
onMounted(async () => {
  await store.updateUserWorkouts();
  loading.value = false;
});

// Define a filter state, initialized with the value from localStorage or fallback to "123"
const filter = useState('filter', () => {
  return localStorage.getItem('filter') || ''; // Default to "" if not set
});

// Computed property to filter workouts based on play_name
const filteredWorkouts = computed(() => {
  // If play_name is empty, return all workouts, otherwise filter by startsWith
  return store.workouts.filter((workout) =>
    filter.value === "" || workout.name.startsWith(filter.value)
  );
});
</script>

<template>
  <v-list class="pa-0 max-h-[25em] overflow-y-auto custom-scrollbar">
    <v-skeleton-loader v-if="loading" type="list-item-avatar" class="pa-0 my-2" :loading="loading" />

    <!-- Loop through filtered workouts based on play_name -->
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
