<template>
  <v-container>
    <v-card elevation="8" class="mx-auto pa-6 rounded-xl border" :class="cardSizeClass"
      style="transition: max-width 0.3s;">
      <v-stepper v-model="step" hide-actions flat :items="['Select', 'Settings', 'Workout']">
        <template v-slot:item.1>
          <PlayList />
          <v-row class="mt-4">
            <v-col class="text-right">
              <v-btn color="primary" text="Continue" :disabled="!playStore.selected" variant="outlined"
                @click="step = 2"></v-btn>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.2>
          <v-card flat v-for="(item, index) in settings" :key="index">
            <v-row class="pa-2">
              <v-col cols="6" class="flex items-center justify-start">
                <span class="text-left text-xl font-sans">{{ item.label }}</span>
              </v-col>
              <v-col cols="6" class="flex items-center justify-end">
                <v-switch color="primary" v-model="playStore[item.model]" hide-details />
              </v-col>
            </v-row>
          </v-card>

          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn color="surface-variant" text="Back" :disabled="!playStore.selected" variant="outlined"
                @click="step = 1"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Start Workout" :disabled="!playStore.selected" variant="outlined"
                @click="step = 3"></v-btn>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.3>
          <v-card flat>
            <v-row class="pa-0" align="center" justify="center">
              <v-col class="text-center">
                <span class="text-h5">Start Workout?</span>
              </v-col>
            </v-row>
          </v-card>

          <v-timeline side="start" truncate-line="both">
            <v-timeline-item v-for="(workout, i) in playStore.currentWorkout.contents" :key="i" size="small">
              <v-card>
                <v-img :src="workout.thumbnail" alt="Thumbnail" min-width="150" class="rounded-lg"></v-img>
              </v-card>

              <!-- Place the button on the opposite side of the timeline item -->
              <template v-slot:opposite>
                <v-btn color="primary" @click="handleButtonClick(workout)" prepend-icon="mdi-play">
                  Start
                </v-btn>
              </template>
            </v-timeline-item>
          </v-timeline>


          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn color="surface-variant" text="Back" :disabled="!playStore.selected" variant="outlined"
                @click="step = 2"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Finish" :disabled="!playStore.selected" variant="outlined"
                @click="startProcess"></v-btn>
            </v-col>
          </v-row>
        </template>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const playStore = usePlayStore()

const step = computed({
  get: () => playStore.current_tab,  // Get the current tab value from the store
  set: (value) => (playStore.current_tab = value), // Update the store state when step changes
});

const startProcess = () => {
  // Logic to start the process
  console.log('Process Started');
};

const handleButtonClick = (workout) => {
  console.log('Button clicked for workout:', workout);
  // Add your custom logic here
};


const settings = [
  { label: 'Start Muted', model: 'muted' },
  { label: 'Start in fullscreen', model: 'fullscreen' },
]

// Dynamically change card size based on the current step
const cardSizeClass = computed(() => {
  switch (step.value) {
    case 1:
      return 'max-w-3xl'; // For step 1
    case 2:
      return 'max-w-xl'; // For step 2
    case 3:
      return 'max-w-full'; // For step 3
  }
});
</script>
