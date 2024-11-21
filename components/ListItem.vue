<template>
  <v-card flat class="border-solid rounded-xl pa-5" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">

      <!-- Left Section: Title, Intensity, and Muscle Groups -->
      <v-col>
        <v-row>
          <v-card-title class="pa-3">{{ workout?.name }}</v-card-title>
        </v-row>
        <v-row>
          <v-card-subtitle class="pa-0">
            <v-chip prepend-icon="mdi-arm-flex" variant="outlined" size="large">{{ workout?.intensity
              }}</v-chip>
            <v-divider vertical inset class="mx-1"></v-divider>
            <v-chip variant="outlined" size="large" class="pa-2">
              <!-- Added the d-flex flex-wrap class to wrap chips -->
              <v-icon>mdi-target</v-icon>
              <v-chip v-for="(group, index) in workout?.musclegroup.slice(0, 2)" :key="index" variant="text"
                size="small">
                {{ group }}
              </v-chip>
              <v-chip v-if="workout?.musclegroup.length > 2" variant="text" size="x-small">
                ...
              </v-chip>
              <v-tooltip activator="parent" location="right">{{ workout?.musclegroup.join(', ') }}</v-tooltip>
            </v-chip>
            <v-divider vertical inset class="mx-1"></v-divider>

            <v-chip prepend-icon="mdi-check-all" variant="outlined" size="large">
              {{ workout?.completions }}</v-chip>

          </v-card-subtitle>
        </v-row>
      </v-col>

      <!-- Right Section: Action Buttons -->
      <v-col>
        <v-row class="justify-end">
          <v-chip elevation="8" size="normal" variant="text">
            <v-btn flat icon @click="handleEdit(workout)" size="large">
              <v-icon size="x-large">mdi-pencil</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn flat icon @click="handlePlay(workout)" size="large">
              <v-icon size="x-large">mdi-play</v-icon>
            </v-btn>
          </v-chip>
        </v-row>
      </v-col>
    </v-row>
  </v-card>

</template>

<script lang="ts" setup>
const props = defineProps({
  index: { type: Number, required: true },
  workout: { type: Object, required: true },
});

import { ref, onMounted } from 'vue';

const store = useWorkoutStore();
const workouts = ref();

async function fetchWorkouts() {
  const workoutData = await store.getUserWorkouts();
  if (workoutData.length > 0) {
    workouts.value = workoutData;
  } else {
    console.warn("No workouts found");
  }
}

function handleEdit(workout: any) {
  console.log('Edit button clicked!')
  console.log('getting value: ', props.index)

  const editVideos = ref(workout.contents || {});  // Extract videos or set empty object if no videos
  const editName = ref(workout.name || '');  // Extract the name of the workout
  const editMuscleGroup = ref(workout.musclegroup || []);  // Join muscle groups as a string
  const editIntensity = ref(workout.intensity || '');  // Extract the intensity level
  console.log(editVideos.value)
  console.log('got Value')
}

function handlePlay(workout: object) {
  console.log('Play button!')
}

onMounted(fetchWorkouts);
</script>

<style scoped></style>
