<template>
  <v-container>
    <v-card elevation="8" class="mx-auto pa-6 rounded-xl border" :class="cardSizeClass"
      style="transition: max-width 0.3s;">

      <!-- Stepper Component with Progress Bar -->
      <v-stepper v-model="step" hide-actions flat :items="['Select Playlist', 'Settings', 'Workout']">

        <!-- Step 1: Playlist Selection -->
        <template v-slot:item.1>
          <PlayList />
          <v-row class="mt-4">
            <v-col class="text-right">
              <v-btn color="primary" text="Continue" :disabled="!playStore.selected" variant="outlined"
                @click="step = 2" :title="!playStore.selected ? 'Please select a playlist first' : ''"></v-btn>
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
                @click="step = 1" :title="!playStore.selected ? 'Select a playlist first' : ''"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Start Training" :disabled="!playStore.selected" variant="outlined"
                @click="startDialog = true"
                :title="!playStore.selected ? 'Please select a playlist first' : ''"></v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Step 3: Workout Details -->
        <template v-slot:item.3>
          <v-card flat>
            <v-row class="mb-4" align="center" justify="center">
              <v-col class="text-center">
                <span class="text-h5">Please select a starting point</span>
              </v-col>
            </v-row>
          </v-card>

          <!-- Workout Timeline -->
          <div class="overflow-x-auto whitespace-nowrap custom-scrollbar">
            <v-timeline v-if="playStore.currentWorkout" side="end" truncate-line="both" class="ml-24">
              <v-timeline-item v-for="(workout, i) in playStore.currentWorkout.contents" :key="i" size="small">
                <v-card>
                  <v-img :src="workout.thumbnail" alt="Thumbnail" min-width="200" class="rounded-lg"></v-img>
                </v-card>

                <template v-slot:opposite>
                  <v-btn color="primary" @click="handleButtonClick(workout)" prepend-icon="mdi-play"
                    variant="outlined">Start</v-btn>
                </template>

              </v-timeline-item>
            </v-timeline>
          </div>

          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn color="surface-variant" text="Back to Playlist" :disabled="!playStore.selected" variant="outlined"
                @click="backDialog = true" :title="!playStore.selected ? 'Select a playlist first' : ''"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Complete Workout" :disabled="!playStore.selected" variant="outlined"
                @click="startProcess(workout)"
                :title="!playStore.selected ? 'Please select a playlist first' : ''"></v-btn>
            </v-col>
          </v-row>
        </template>
      </v-stepper>
    </v-card>
  </v-container>

  <!-- Custom Dialogs with Specific Messages -->
  <custom-dialog v-model="startDialog" icon="mdi-information-outline" header="Sure to start?"
    message="Once you start the workout, you won't be able to change it without resetting your progress."
    button1-name="Cancel" button2-name="Start" button1-color="" button2-color="success" :max-width="'29em'"
    @confirm="handleStart" @cancel="startDialog = false" />

  <custom-dialog v-model="backDialog" icon="mdi-information-outline" header="Are you sure?"
    message="If you go back, your current progress will be lost." button1-name="Cancel"
    button2-name="Return to Playlist" button1-color="" button2-color="danger" :max-width="'36em'" @confirm="handleBack"
    @cancel="backDialog = false" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

import { ref, computed } from 'vue';

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

const playStore = usePlayStore() as PlayStore;

const backDialog = ref(false);
const startDialog = ref(false);

const step = computed({
  get: () => playStore.current_tab,
  set: (value: number) => {
    playStore.current_tab = value;
  },
});

const settings = [
  { label: 'Start with sound muted', model: 'muted' },
  { label: 'Start in fullscreen', model: 'fullscreen' },
];

const cardSizeClass = computed(() => {
  switch (step.value) {
    case 1: return 'max-w-3xl';
    case 2: return 'max-w-xl';
    case 3: return 'max-w-full';
  }
});

const handleButtonClick = (workout: Workout) => {
  console.log('Button clicked for workout:', workout);
};

const handleStart = () => {
  step.value++;
  startDialog.value = false;
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

<style>
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
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
