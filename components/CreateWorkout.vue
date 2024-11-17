<template>
  <v-card flat append-icon="mdi-plus" class="border-dashed rounded-xl pa-1" style="border-width: 3px; font-size: 1.5em;"
    subtitle="No Workout found in library" title="Create New Workout" @click="handleDialog">
  </v-card>

  <v-dialog v-model="dialog">
    <v-card prepend-icon="mdi-dumbbell" append-icon="mdi-dumbbell" title="Create Workout"
      class="mx-auto pa-3 rounded-xl text-center text-base" style="max-width: 36em;">

      <v-divider></v-divider>

      <!-- Dynamic list of ItemCard components with dynamic key -->
      <v-list :key="refreshKey" class="d-flex self-center mx-6" style="overflow-x: auto; white-space: nowrap;">
        <v-list-item v-for="index in card_amount" :key="index" class="pa-1">
          <ItemCard :index="index" />
        </v-list-item>
      </v-list>

      <v-divider style="margin-bottom: 24px;"></v-divider>

      <v-card-text>
        <v-row dense>
          <v-text-field label="Name*" variant="solo" v-model="name"></v-text-field>
        </v-row>
        <v-row dense>
          <v-select label="Muscle Group*" :items="['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs']" variant="solo"
            v-model="musclegroup" chips multiple>
          </v-select>
        </v-row>
        <v-row dense>
          <v-select label="Intensity" :items="['Low', 'Medium', 'High']" variant="solo" v-model="intensity"></v-select>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>
        <v-btn color="primary" text="Save" variant="tonal" @click="handleSubmit"></v-btn>
        <!-- Call handleSubmit here -->
      </v-card-actions>
    </v-card>
  </v-dialog>

  <WorkoutList />

</template>

<script setup>
import { ref, computed, watch } from 'vue'

const workoutStore = useWorkoutStore()
const videoStore = useVideoStore();

const name = ref('')
const intensity = ref('Medium') // Default value for intensity
const musclegroup = ref([]) // Default value for muscle group
const dialog = ref(false)
const refreshKey = ref(0); // Unique key to force re-render

// Computed property to get the number of cards to render
const card_amount = computed(() => videoStore.getVideoCount() + 1);

// Watch for changes in card_amount and trigger necessary updates
watch(card_amount, (newCount) => {
  refreshList()
  console.log('Card amount changed:', newCount);
});
// Function to refresh the list
const refreshList = () => {
  refreshKey.value++;
};


// Handle click for adding or editing video
const handleDialog = () => {
  videoStore.$reset()
  dialog.value = true;
};

const handleSubmit = async () => {
  const trimmedName = name.value.trim(); // Remove leading/trailing spaces from the name

  if (trimmedName && musclegroup.value.length > 0 && intensity.value) {
    console.log("submitting");
    await workoutStore.addWorkout(trimmedName, videoStore.video, intensity.value, musclegroup.value);
    dialog.value = false; // Close the dialog after submission

    // Reset all the form values to their initial states
    name.value = '';
    musclegroup.value = [];
    intensity.value = 'Medium'; // Reset to the default intensity
    videoStore.$reset(); // Reset video store if necessary
    refreshKey.value++; // Refresh list if needed
  }
}

</script>

<style scoped>
.v-card__title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
