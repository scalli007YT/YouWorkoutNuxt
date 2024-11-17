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
            <v-chip variant="outlined" size="normal" prepend-icon="mdi-tag-heart" class="pa-1">
              <!-- Added the d-flex flex-wrap class to wrap chips -->
              <v-chip v-for="(group, index) in workout?.musclegroup.slice(0, 3)" :key="index" variant="text"
                size="x-small">
                {{ group }}
              </v-chip>
              <v-chip v-if="workout?.musclegroup.length > 3" variant="text" size="x-small">
                ...
              </v-chip>
              <v-tooltip activator="parent" location="right">{{ workout?.musclegroup.join(', ') }}</v-tooltip>
            </v-chip>
          </v-card-subtitle>
        </v-row>
      </v-col>

      <!-- Right Section: Action Buttons -->
      <v-col>
        <v-row class="justify-end">
          <v-chip elevation="8" size="normal" variant="text">
            <v-btn flat icon @click="onSecondActionClick" size="large">
              <v-icon size="x-large">mdi-pencil</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn flat icon @click="onPlayClick" size="large">
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

// Actions for the appended icons
function onPlayClick() {
  console.log("Play button clicked!");
}

function onSecondActionClick() {
  console.log("Second button clicked!");
}

onMounted(fetchWorkouts);
</script>

<style scoped></style>
