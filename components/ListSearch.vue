<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <v-text-field class="mx-auto -mb-5" density="comfortable" placeholder="Search Workouts"
        prepend-inner-icon="mdi-magnify" flat variant="solo" v-model="searchFilter">
      </v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-select label="Intensity" :items="['Low', 'Medium', 'Doable', 'High']" variant="underlined" chips multiple
          clearable v-model="intensityFilter">
        </v-select>
      </v-col>
      <v-col>
        <v-select label="Group" :items="['HIIT', 'Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs']"
          variant="underlined" chips multiple clearable v-model="groupFilter">
        </v-select>
      </v-col>
    </v-row>
  </v-card>
</template>


<script lang="ts" setup>
import { storeToRefs } from 'pinia';

// Access the Pinia store
const playStore = usePlayStore();

// Use `storeToRefs` to get reactive references to the state
const { filter } = storeToRefs(playStore);

// Create computed properties to bind Vue inputs to the Pinia store
const searchFilter = computed({
  get: () => filter.value.search,
  set: (value) => filter.value.search = value
});

const intensityFilter = computed({
  get: () => filter.value.intensity,
  set: (value) => filter.value.intensity = value
});

const groupFilter = computed({
  get: () => filter.value.group,
  set: (value) => filter.value.group = value
});
</script>
