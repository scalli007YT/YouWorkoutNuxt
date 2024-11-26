<template>
  <v-container>
    <v-card elevation="8" class="mx-auto pa-6 max-w-5xl rounded-xl border">
      <v-stepper v-model="step" hide-actions flat :items="['Select', 'Settings', 'Start']">
        <template v-slot:item.1>
          <PlayList />
          <v-row class="mt-4">
            <v-col class="text-right">
              <v-btn color="primary" text="Continue" :disabled="!playStore.selected" variant="outlined"
                @click="step = 2"></v-btn>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.2>
          <v-card flat>
            <v-row class="pa-2">
              <v-col cols="6" class="flex items-center justify-start">
                <span class="text-left text-xl font-sans">Start Muted</span>
              </v-col>
              <v-col cols="6" class="flex items-center justify-end">
                <v-switch color="primary" v-model="playStore.muted" hide-details />
              </v-col>
            </v-row>
          </v-card>

          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn color="surface-variant" text="Back" :disabled="!playStore.selected" variant="outlined"
                @click="step = 1"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Continue" :disabled="!playStore.selected" variant="outlined"
                @click="step = 3"></v-btn>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.3>
          <v-card flat>
            <v-row class="pa-0" align="center" justify="center">
              <v-col class="text-center">
                <span class="text-h5">Start Workout?</span>
              </v-col>
            </v-row>
          </v-card>

          <v-row class="mt-4">
            <v-col class="text-left">
              <v-btn color="surface-variant" text="Back" :disabled="!playStore.selected" variant="outlined"
                @click="step = 2"></v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" text="Start" :disabled="!playStore.selected" variant="outlined"
                @click="startProcess"></v-btn>
            </v-col>
          </v-row>
        </template>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const playStore = usePlayStore()

const step = computed({
  get: () => playStore.current_tab,  // Get the current tab value from the store
  set: (value) => (playStore.current_tab = value), // Update the store state when step changes
});

const startProcess = () => {
  // Logic to start the process
  console.log('Process Started');
};
</script>
