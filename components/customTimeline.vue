<template>
  <div class="mx-auto">
    <v-timeline side="end" truncate-line="both">
      <v-timeline-item v-for="(workout, i) in contents" :key="i" size="small"
        :dot-color="playStore.currentWorkout.contents[i].progress" elevation="8">
        <v-card>
          <v-skeleton-loader v-if="loader" type="card" max-height="82"></v-skeleton-loader>
          <v-img :src="workout.thumbnail" alt="Thumbnail" min-width="150" class="rounded-lg"
            @load="loader = false"></v-img>
        </v-card>

        <template v-slot:opposite>
          <v-btn color="primary" @click="handleButtonClick(workout)" prepend-icon="mdi-play">Start</v-btn>
        </template>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Setup loader and playStore
const loader = ref(true);
const playStore = usePlayStore()

// Define props with the expected type and required property
const props = defineProps({
  contents: {
    type: Object,
    required: true
  }
});

// Define emits to handle the event
const emit = defineEmits(['startWorkout']);

// Method to emit the 'startWorkout' event with the workout data
const handleButtonClick = (workout) => {
  emit('startWorkout', workout);
};
</script>
