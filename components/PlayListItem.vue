<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <v-col>
        <v-row>
          <v-card-title class="pa-3 pt-0">{{ workout?.name }}</v-card-title>
        </v-row>
        <v-row>
          <v-card-subtitle class="pa-0">
            <v-chip prepend-icon="mdi-arm-flex" variant="outlined" size="large">{{ workout?.intensity }}</v-chip>
            <v-divider vertical inset class="mx-1"></v-divider>
            <v-chip variant="outlined" size="large" class="pa-2">
              <v-icon>mdi-target</v-icon>
              <v-chip v-for="(group, index) in workout?.musclegroup.slice(0, 2)" :key="index" variant="text"
                size="small">
                {{ group }}
              </v-chip>
              <v-chip v-if="workout?.musclegroup.length > 2" variant="text" size="x-small">...</v-chip>
              <v-tooltip activator="parent" location="right">{{ workout?.musclegroup.join(', ') }}</v-tooltip>
            </v-chip>
            <v-divider vertical inset class="mx-1"></v-divider>
            <v-chip prepend-icon="mdi-check-all" variant="outlined" size="large">{{ workout?.completions }}</v-chip>
          </v-card-subtitle>
        </v-row>
      </v-col>

      <v-col>

      </v-col>
      <v-col>
        <v-row class="justify-end">
          <v-chip elevation="8" size="normal" variant="text" class="border">
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
  workout: { type: Object, required: true },
});

const store = useWorkoutStore();
const videoStore = useVideoStore();


const name = ref(props.workout.name);
const intensity = ref(props.workout.intensity);
const musclegroup = ref(props.workout.musclegroup);

function handlePlay(workout: object) {
  console.log('Play button clicked!', workout);
}
</script>

<style scoped></style>
