<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <!-- Bind the input field to `filter` -->
      <v-text-field class="mx-auto -mb-5" density="comfortable" placeholder="Search Workouts"
        prepend-inner-icon="mdi-magnify" flat variant="solo" v-model="filter"></v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-select label="Select" :items="[]" variant="underlined"></v-select>
      </v-col>
      <v-col>
        <v-select label="Select" :items="[]" variant="underlined"></v-select>
      </v-col>
      <v-col>
        <v-select label="Select" :items="[]" variant="underlined"></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

// Define a `filter` state, initialized with the value from `localStorage` or fallback to "123"
const filter = useState('filter', () => {
  return localStorage.getItem('filter') || '123'; // Default to "123" if not set
});

// Watch for changes in `filter` and update `localStorage` when the value changes
watch(filter, (newValue) => {
  localStorage.setItem('filter', newValue);
});
</script>

<style scoped>
/* Optional: Customize styling if needed */
</style>
