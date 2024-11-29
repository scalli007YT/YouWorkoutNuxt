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
              <v-btn color="primary" text="Start Training" :disabled="!playStore.selected" variant="elevated"
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
              <v-btn :color="'primary'" variant="elevated" @click="handleNextClick(playStore.current_video)">
                {{ (isLastVideo(playStore.current_video) || (playStore.mode == 'selection')) ? 'Complete Workout' :
                  'Next Video' }}
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
    button1-name="Cancel" button2-name="Start" button2-color="success" :max-width="'29em'" @confirm="handleStart"
    @cancel="startDialog = false" />

  <custom-dialog v-model="backDialog" icon="mdi-information-outline" header="Are you sure?"
    message="If you go back, your current progress will be lost." button1-name="Cancel"
    button2-name="Return to Playlist" button2-color="danger" :max-width="'36em'" @confirm="handleBack"
    @cancel="backDialog = false" />

  <custom-dialog v-model="completeDialog" icon="mdi-check" header="Are you sure?"
    message="If you complete, you can't go back" button1-name="Cancel" button2-name="Complete" button2-color="success"
    :max-width="'36em'" @confirm="handleComplete(playStore.currentWorkout)" @cancel="completeDialog = false" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
});

import { ref, computed } from 'vue';
import { format } from 'date-fns';

interface PlayStore {
  selected: boolean;
  currentWorkout: { contents: Array<Workout> } | null;
  current_tab: number;
  current_video: { link?: string } | null;
  muted: boolean;
  autoplay: boolean;
  mode: string;
}


interface Workout {
  thumbnail: string;
  link: string;
}

const playStore = usePlayStore()
const workoutStore = useWorkoutStore()
const backDialog = ref(false);
const startDialog = ref(false);
const completeDialog = ref(false);

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
    // Add progress if it doesn't exist
    video.progress ??= 'not_started';
    // Assign a unique ID to each video if it doesn't already have one
    if (!video.id) {
      video.id = generateUniqueId();  // Generate and assign a unique ID
    }
  });
};

const generateUniqueId = (): string => {
  return '_' + Math.random().toString(36).slice(2, 11);  // Use slice instead of substr
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
  if (isLastVideo(current_video) || playStore.mode == 'selection') {
    completeDialog.value = true;
  } else {
    handleNextButton(current_video);
  }
};

const handleNextButton = (current_video: Workout) => {
  finishState();

  const contents = Object.values(playStore.currentWorkout?.contents || {});
  const currentIndex = contents.findIndex(video => video.id === current_video.id);

  if (currentIndex === -1) return console.error('Current video not found');

  const next_video = contents[currentIndex + 1] || null;
  if (next_video) playStore.current_video = next_video;

  checkState();
};

const isLastVideo = (current_video: Workout) => {
  const currentIndex = Object.values(playStore.currentWorkout?.contents || {}).findIndex(
    (video) => video.id === current_video.id  // Use the unique id here
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
  console.log('Completing workout');

  // Remove progress and id from each video
  Object.values(playStore.currentWorkout?.contents || {}).forEach((video) => {
    delete video.progress;
    delete video.id;
  });

  // Add current timestamp to completions array
  const currentTimestamp = format(new Date(), 'HH:mm:ss dd.MM.yyyy '); // You can adjust the format as needed
  playStore.currentWorkout?.completions.push(currentTimestamp);
  workoutStore.updateUserWorkouts()
  workoutStore.updateWorkout(playStore.currentWorkout.id, playStore.currentWorkout.name, playStore.currentWorkout.contents, playStore.currentWorkout.intensity, playStore.currentWorkout.musclegroup, playStore.currentWorkout.completions);

  // Reset the playStore state
  playStore.$reset();

  // Redirect to the home page
  const router = useRouter();
  router.push('/'); // Route to the home page
};
</script>
