<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <!-- Bind the input field to `filter` -->
      <v-text-field class="mx-auto -mb-5" density="comfortable" placeholder="Search Workouts"
        prepend-inner-icon="mdi-magnify" flat variant="solo" v-model="filter"></v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-select label="Intensity" :items="['Low', 'Medium', 'doable', 'High']" variant="underlined" chips multiple
          clearable></v-select>
      </v-col>
      <v-col>
        <v-select label="Group" :items="['HIIT', 'Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs']"
          variant="underlined" chips multiple clearable></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
// Clear `filter` from localStorage when the component is loaded
localStorage.removeItem('filter');

// Define a `filter` state, initialized with the value from `localStorage` or fallback to ""
const filter = useState('filter', () => {
  return localStorage.getItem('filter') || ''; // Default to an empty string if not set
});

// Watch for changes in `filter` and update `localStorage` when the value changes
watch(filter, (newValue) => {
  localStorage.setItem('filter', newValue);
});
</script>

<style scoped>
/* Optional: Customize styling if needed */
</style>
