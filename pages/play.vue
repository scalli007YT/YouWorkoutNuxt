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
                @click="step = 2" :title="!playStore.selected ? 'Please select a playlist first' : ''" />
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
                @click="step = 1" :title="!playStore.selected ? 'Select a playlist first' : ''" />
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Start Training" :disabled="!playStore.selected" variant="outlined"
                @click="startDialog = true" :title="!playStore.selected ? 'Please select a playlist first' : ''" />
            </v-col>
          </v-row>
        </template>

        <!-- Step 3: Workout -->
        <template v-slot:item.3>
          <youtubeEmbed v-if="playStore.mode === 'playing'" :videoUrl="playStore.current_video.link"
            :autoplay="playStore.autoplay" :mute="playStore.muted" />
          <CustomTimeline v-if="playStore.mode === 'selection' && playStore.currentWorkout"
            :contents="playStore.currentWorkout?.contents" @startWorkout="handleStartButton" />

          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn :color="'surface-variant'" variant="outlined"
                @click="playStore.mode === 'selection' ? backDialog = true : playStore.mode = 'selection'">
                {{ playStore.mode === 'selection' ? 'Back to Selection' : 'Back to List' }}
              </v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn :color="'primary'" variant="outlined" @click="handleNextClick(playStore.current_video)">
                {{ isLastVideo(playStore.current_video) ? 'Complete Workout' : 'Next Video' }}
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-stepper>
    </v-card>
  </v-container>

  <!-- Custom Dialogs -->
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
});

import { ref, computed } from 'vue';

interface PlayStore {
  current_tab: number;
  selected: boolean;
  currentWorkout: { contents: Array<{ thumbnail: string }> } | null;
  muted: boolean;
  autoplay: boolean;
  mode: string;
  current_video: Object;
}

interface Workout {
  thumbnail: string;
  link: string;
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
  { label: 'Start in Autoplay', model: 'autoplay' },
];

const cardSizeClass = computed(() => {
  switch (step.value) {
    case 1:
      return 'max-w-3xl';
    case 2:
      return 'max-w-xl';
    case 3:
      return 'max-w-3xl';
  }
});

const addProgressToContents = () => {
  Object.values(playStore.currentWorkout?.contents || {}).forEach((video) => {
    video.progress ??= 'not_started';
  });
};

const checkState = () => {
  if (playStore.current_video.progress === 'not_started') {
    playStore.current_video.progress = 'in_progress';
  }
};

const finishState = () => {
  playStore.current_video.progress = 'completed';
};

const handleStartButton = (current_video: Workout) => {
  playStore.mode = 'playing';
  playStore.current_video = current_video;
  checkState();
};

const handleNextClick = (current_video: Workout) => {
  if (isLastVideo(current_video)) {
    handleComplete(playStore.currentWorkout);
  } else {
    handleNextButton(current_video);
  }
};

const handleNextButton = (current_video: Workout) => {
  finishState();

  const currentIndex = Object.values(playStore.currentWorkout?.contents || {}).findIndex(
    (video) => video.link === current_video.link
  );

  const nextIndex = currentIndex + 1;
  const next_video = nextIndex < Object.values(playStore.currentWorkout?.contents || {}).length
    ? Object.values(playStore.currentWorkout?.contents || {})[nextIndex]
    : null;

  if (next_video) {
    playStore.current_video = next_video;
  }

  checkState();
};

const isLastVideo = (current_video: Workout) => {
  const currentIndex = Object.values(playStore.currentWorkout?.contents || {}).findIndex(
    (video) => video.link === current_video.link
  );
  return currentIndex === Object.values(playStore.currentWorkout?.contents || {}).length - 1;
};

const handleStart = () => {
  step.value++;
  addProgressToContents();
  startDialog.value = false;
};

const handleBack = () => {
  backDialog.value = false;
  playStore.currentWorkout = null;
  playStore.selected = false;
  step.value = 1;
};

const handleComplete = (workout: Workout) => {
  console.log('Workout Completed');
};
</script>
