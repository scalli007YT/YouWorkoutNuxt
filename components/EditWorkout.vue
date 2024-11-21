<template>
  <v-dialog v-model="dialogState">
    <v-card prepend-icon="mdi-dumbbell" append-icon="mdi-dumbbell" title="Create Workout"
      class="mx-auto pa-3 rounded-xl text-center text-base" style="max-width: 36em;">
      <v-divider></v-divider>

      <!-- Dynamic list of ItemCard components with dynamic key -->
      <v-list :key="refreshKey" class="d-flex self-center mx-6" style="overflow-x: auto; white-space: nowrap;">
        <v-list-item v-for="index in card_amount" :key="index" class="pa-1">
          <ItemCard :index="index" />
        </v-list-item>
      </v-list>

      <v-divider style="margin-bottom: 24px;"></v-divider>

      <v-card-text>
        <v-row dense>
          <v-text-field label="Name*" variant="solo" v-model="name"></v-text-field>
        </v-row>
        <v-row dense>
          <v-select label="Muscle Group*" :items="['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs']" variant="solo"
            v-model="musclegroup" chips multiple>
          </v-select>
        </v-row>
        <v-row dense>
          <v-select label="Intensity" :items="['Low', 'Medium', 'High']" variant="solo" v-model="intensity"></v-select>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Cancel" variant="plain" @click="closeDialog"></v-btn>
        <v-btn color="primary" text="Save" variant="tonal" @click="handleSubmit"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useNuxtApp } from '#app';

const store = useWorkoutStore();
const videoStore = useVideoStore();

// Props
const props = defineProps({
  Cardindex: { type: Number, required: true },
  dialog: { type: Boolean, required: true },
});


// Handle form submission
const handleSubmit = async () => {
  const trimmedName = name.value.trim();
  if (trimmedName && musclegroup.value.length > 0 && intensity.value) {
    console.log("Submitting workout update");

    await store.addWorkout(trimmedName, videoStore.video, intensity.value, musclegroup.value);

    // Reset the dialog and refresh values
    dialogState.value = false;
    name.value = '';
    musclegroup.value = [];
    intensity.value = 'Medium';
    refreshKey.value++;
  }
};
</script>

<style scoped>
.v-card__title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
