<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const store = useWorkoutStore();
const loading = ref(true); // Add a loading state to track whether data is still being fetched
const route = useRoute();
const router = useRouter();

// A ref to store the loaded workout data
const loaded_workout = ref<any>(null); // Initialize with null to avoid undefined errors

// Automatically fetch workouts when the module is loaded
onMounted(async () => {
  await store.updateUserWorkouts();  // Wait for the workout data to load
  loading.value = false; // Set loading to false once data is fetched
  checkQuery();
});

// Function to check the query parameters and fetch the workout if the 'id' exists
const checkQuery = async () => {
  if (route.query.id) {
    console.log('Load id:', route.query.id);

    try {
      // Fetch the workout and ensure it's set properly
      loaded_workout.value = await store.getShareWorkout(route.query.id);
      console.log('Loaded workout:', loaded_workout.value.name);

      // Open the dialog only after the workout has been successfully loaded
      importDialog.value = true;

      // Remove the query parameter from the URL
      router.replace({ path: route.path, query: {} });
    } catch (error) {
      console.error('Error loading workout:', error);
    }
  }
};

// New function to handle adding the workout to the store
const addWorkoutToStore = async () => {
  if (loaded_workout.value) {
    const { name, contents, intensity, musclegroup } = loaded_workout.value;
    importDialog.value = false

    try {
      // Add the workout to the store using addWorkout function
      await store.addWorkout(name, contents, intensity, musclegroup);
      console.log('Workout added to store');
    } catch (error) {
      console.error('Error adding workout to store:', error);
    }
  }
};

const importDialog = ref(false);

</script>

<template>
  <v-list class="pa-0 max-h-[33em] custom-scrollbar">
    <v-skeleton-loader v-if="loading" type="list-item-avatar" class="pa-0 my-4" :loading="loading" />
    <v-list-item v-for="(workout) in store.workouts" :key="workout" class="pa-0 my-6" v-if="!loading">
      <ListItem :workout="workout" />
    </v-list-item>
  </v-list>

  <!-- Ensure dialog is only shown if workout is loaded and has a name -->
  <custom-dialog v-if="loaded_workout" v-model="importDialog" icon="mdi-information-outline" header="Importing"
    :message="'Want to import ' + loaded_workout.name + '?'" button1-name="Cancel" button2-name="Start"
    button2-color="warning" :max-width="'36em'" @confirm="addWorkoutToStore()" @cancel="importDialog = false" />


</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar {
  scrollbar-width: 8px;
}
</style>
