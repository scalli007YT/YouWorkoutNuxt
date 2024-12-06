<template>
  <v-card flat @click="handlePlay(workout)" class="border-solid rounded-xl pa-4 transition-all duration-800 bg-blend-"
    :style="{
      borderWidth:
        currentWorkoutId === props.workout.id && playStore.selected
          ? '3px'
          : '1px',
      backgroundColor:
        currentWorkoutId === props.workout.id && playStore.selected
          ? $vuetify.theme.current.colors.primary
          : '',
      fontSize: '1.5em',
    }">
    <v-row align="center" justify="space-between" class="w-full">
      <v-col cols="12" sm="12" class="flex flex-col">
        <!-- Workout name -->
        <v-card-title class="pa-3 text-xl font-semibold pb-0" style="white-space: normal; overflow-wrap: break-word;">
          {{ workout?.name }}
        </v-card-title>

        <!-- Dynamic list of thumbnails with arrows between them -->
        <div class="flex items-center overflow-x-auto space-x-2 custom-scrollbar pl-3">
          <template v-for="(content, index) in workout?.contents" :key="index">
            <v-img :src="content.thumbnail" alt="Thumbnail" min-width="120" max-width="120" class="rounded-lg"></v-img>
            <v-icon v-if="index < contentLength" class="pa-0 ma-0 mx-1" size="x-small">mdi-arrow-right</v-icon>
          </template>
        </div>

        <!-- Intensity and Muscle Groups -->
        <v-row class="mt-0">
          <v-card-subtitle class="pa-6 flex items-center space-x-2 pt-2">
            <v-chip prepend-icon="mdi-arm-flex" variant="outlined" size="large">
              {{ workout?.intensity }}
            </v-chip>

            <v-chip variant="outlined" size="large" class="pa-4">
              <v-icon>mdi-target</v-icon>
              <div class="flex items-center space-x-1">
                <v-chip v-for="(group, index) in workout?.musclegroup.slice(0, 2)" :key="index" variant="text"
                  size="small">
                  {{ group }}
                </v-chip>
                <v-chip v-if="workout?.musclegroup.length > 2" variant="text" size="x-small">...</v-chip>
              </div>
            </v-chip>

            <!-- Completions Chip (Moved here) -->
            <v-chip prepend-icon="mdi-check-all" variant="outlined" size="large" class="pa-4">{{
              workout?.completions.length
            }}</v-chip>
          </v-card-subtitle>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from "vue";

const props = defineProps({
  workout: {
    type: Object as () => {
      id: string;
      name: string;
      intensity: string;
      musclegroup: string[];
      completions: number;
      contents: Array<{ thumbnail: string }>;
    },
    required: true,
  },
});

const playStore = usePlayStore();
const currentWorkoutId = ref<string | null>(playStore.currentWorkout?.id || "");


// Length calculation
const contentArray = computed(() => Object.values(props.workout.contents));
const contentLength = contentArray.value.length;

// Watch for changes in currentWorkout.id
watch(
  () => playStore.currentWorkout?.id,
  (newId) => {
    if (newId) {
      currentWorkoutId.value = newId;
    }
  }
);

// Watch for changes in playStore.selected
watch(
  () => playStore.selected,
  (newVal) => {
    // Apply borderWidth change logic
    if (!newVal) {
      currentWorkoutId.value = "";
    }
  }
);

// Handle play button click
function handlePlay(workout: typeof props.workout) {
  playStore.loadWorkout(workout.id);
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 1em;
}

.custom-scrollbar::-webkit-scrollbar-track:hover {
  background: transparent;
}
</style>
