<template>
  <v-card flat append-icon="mdi-plus" class="border-dashed rounded-xl pa-1" style="border-width: 3px; font-size: 1.5em;"
    subtitle="No Workout found in library" title="Create New Workout" @click="dialog = true">
  </v-card>

  <v-dialog v-model="dialog">
    <v-card prepend-icon="mdi-dumbbell" append-icon="mdi-dumbbell" title="Create Workout"
      class="mx-auto pa-3 rounded-xl text-center text-base" style="max-width: 36em;">

      <v-divider></v-divider>

      <v-list class="d-flex self-center mx-6" style="overflow-x: auto; white-space: nowrap;">
        <v-list-item v-for="index in 2" :key="index" class="pa-1">
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
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const intensity = ref('Medium') // Default value for intensity
const musclegroup = ref([]) // Default value for muscle group
const dialog = ref(false)

const workoutStore = useWorkoutStore()
const videoStore = useVideoStore();

const handleSubmit = async () => {
  const trimmedName = name.value.trim(); // Remove leading/trailing spaces from the name

  if (trimmedName && musclegroup.value.length > 0 && intensity.value) {
    console.log("submitting");
    await workoutStore.addWorkout(trimmedName, videoStore.videoLinks, intensity.value, musclegroup.value);
    dialog.value = false; // Close the dialog after submission
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
