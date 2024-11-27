<template>
  <v-container>
    <v-card elevation="8" class="mx-auto pa-6 rounded-xl border" :class="cardSizeClass"
      style="transition: max-width 0.3s;">
      <v-stepper v-model="step" hide-actions flat :items="['Select', 'Settings', 'Workout']">
        <!-- Step 1: Playlist Selection -->
        <template v-slot:item.1>
          <PlayList />
          <v-row class="mt-4">
            <v-col class="text-right">
              <v-btn color="primary" text="Continue" :disabled="!playStore.selected" variant="outlined"
                @click="step = 2"></v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Step 2: Settings -->
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
                @click="startDialog = true"></v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Step 3: Workout Details -->
        <template v-slot:item.3>
          <v-card flat>
            <v-row class="pa-0" align="center" justify="center">
              <v-col class="text-center">
                <span class="text-h5">Start</span>
              </v-col>
            </v-row>
          </v-card>

          <div class="overflow-x-auto whitespace-nowrap">
            <v-timeline v-if="playStore.currentWorkout" side="end" truncate-line="both" class="ml-0"
              direction="horizontal">
              <v-timeline-item v-for="(workout, i) in playStore.currentWorkout.contents" :key="i" size="small">
                <v-card>
                  <v-img :src="workout.thumbnail" alt="Thumbnail" min-width="150" class="rounded-lg"></v-img>
                </v-card>

                <template v-slot:opposite>
                  <v-btn color="primary" @click="handleButtonClick(workout)" prepend-icon="mdi-play">Start</v-btn>
                </template>

                <!-- Progress bar between items -->
                <v-progress-linear v-if="i < playStore.currentWorkout.contents.length - 1" color="blue" height="4"
                  :value="((i + 1) / playStore.currentWorkout.contents.length) * 100"></v-progress-linear>
              </v-timeline-item>
            </v-timeline>
          </div>

          <!-- 
          <YoutubeEmbed videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" :autoplay="true" :mute="true" /> -->

          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn color="surface-variant" text="Back" :disabled="!playStore.selected" variant="outlined"
                @click="backDialog = true"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Finish" :disabled="!playStore.selected" variant="outlined"
                @click="startProcess(workout)"></v-btn>
            </v-col>
          </v-row>
        </template>
      </v-stepper>
    </v-card>
  </v-container>

  <!-- Custom Dialogs -->
  <custom-dialog v-model="startDialog" icon="mdi-information-outline" header="Are you sure?"
    message="You won’t be able to change the workout without resetting the progress." button1-name="Cancel"
    button2-name="Start" button1-color="" button2-color="success" :max-width="'29em'" @confirm="handleStart"
    @cancel="startDialog = false" />

  <custom-dialog v-model="backDialog" icon="mdi-information-outline" header="Are you sure?"
    message="Your workout progress will be lost." button1-name="Cancel" button2-name="Go Back" button1-color=""
    button2-color="danger" :max-width="'36em'" @confirm="handleBack" @cancel="backDialog = false" />


</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})


import { ref, computed } from 'vue';

// Types for PlayStore and Workout, ensuring no implicit 'any' type
interface PlayStore {
  current_tab: number;
  selected: boolean;
  currentWorkout: { contents: Array<{ thumbnail: string }> } | null;
  muted: boolean;
  fullscreen: boolean;
}

interface Workout {
  thumbnail: string;
}

const playStore = usePlayStore() as PlayStore; // Assuming usePlayStore is already defined

// Dialog states
const backDialog = ref(false);
const startDialog = ref(false);

// Current step in the stepper
const step = computed({
  get: () => playStore.current_tab,
  set: (value: number) => {
    playStore.current_tab = value;
  },
});

// Settings configuration
const settings = [
  { label: 'Start Muted', model: 'muted' },
  { label: 'Start in fullscreen', model: 'fullscreen' },
];

// Dynamically change card size based on the current step
const cardSizeClass = computed(() => {
  switch (step.value) {
    case 1: return 'max-w-3xl'; // Step 1
    case 2: return 'max-w-xl'; // Step 2
    case 3: return 'max-w-full'; // Step 3
  }
});

// Handlers
const handleButtonClick = (workout: Workout) => {
  console.log('Button clicked for workout:', workout);
};

const handleStart = () => {
  step.value++
  startDialog.value = false
};

const handleBack = () => {
  backDialog.value = false;
  playStore.currentWorkout = null;
  playStore.selected = false;
  step.value = 1;
};

const startProcess = (workout: Workout) => {
  console.log(workout);
};
</script>
