<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <!-- Bind the input field to `filter` -->
      <v-text-field class="mx-auto -mb-5" density="comfortable" placeholder="Search Workouts"
        prepend-inner-icon="mdi-magnify" flat variant="solo" v-model="filter"></v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-select label="Intensity" :items="['Low', 'Medium', 'doable', 'High']" variant="underlined"
          v-model="Intensityfilter" chips multiple clearable></v-select>
      </v-col>
      <v-col>
        <v-select label="Group" :items="['HIIT', 'Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs']"
          variant="underlined" chips multiple clearable v-model="Groupfilter"></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

// Utility function to handle state and localStorage sync
function useLocalStorageState(key: string, defaultValue: any) {
  const state = useState(key, () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  watch(state, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });

  return state;
}

// Initialize states using the utility function
const filter = useLocalStorageState('filter', '');
const Intensityfilter = useLocalStorageState('Intensityfilter', []);
const Groupfilter = useLocalStorageState('Groupfilter', []);
</script>