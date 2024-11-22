<template>
  <v-card flat class="border-solid rounded-xl pa-5" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <!-- Left Section: Title, Intensity, and Muscle Groups -->
      <v-col>
        <v-row>
          <v-card-title class="pa-3">{{ workout?.name }}</v-card-title>
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
            <v-chip prepend-icon="mdi-check-all" variant="outlined" size="large">
              {{ workout?.completions }}
            </v-chip>
          </v-card-subtitle>
        </v-row>
      </v-col>

      <!-- Right Section: Action Buttons -->
      <v-col>
        <v-row class="justify-end">
          <v-chip elevation="8" size="normal" variant="text">
            <v-btn flat icon @click="toggleEdit" size="large">
              <v-icon size="x-large">mdi-pencil</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn flat icon @click="handlePlay(workout)" size="large">
              <v-icon size="x-large">mdi-play</v-icon>
            </v-btn>
          </v-chip>
        </v-row>
      </v-col>
    </v-row>
  </v-card>



  <v-dialog v-model="dialogState">
    <v-card prepend-icon="mdi-pencil" append-icon="mdi-pencil" title="Edit Workout"
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
        <v-btn text="Delete" variant="plain" @click="handleDelete"></v-btn>
        <v-btn text="Cancel" variant="plain" @click="dialogState = false"></v-btn>
        <v-btn color="primary" text="Save" variant="tonal" @click="updateWorkout"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>


<script lang="ts" setup>
const props = defineProps({
  index: { type: Number, required: true },
  workout: { type: Object, required: true },
});

const workout = props.workout
import { ref, onMounted } from 'vue';


const store = useWorkoutStore();
const videoStore = useVideoStore();
// 

const dialogState = ref(false); // Local state for dialog visibility
const refreshKey = ref(0); // Unique key to force re-render

const name = ref(workout.name);
const intensity = ref(workout.intensity); // Default value for intensity
const musclegroup = ref(workout.musclegroup); // Default value for muscle group

// Computed property to get the number of cards to render
const card_amount = computed(() => videoStore.getVideoCount() + 1);

// Watch for changes in card_amount and trigger necessary updates
watch(card_amount, () => {
  refreshList();
});

// Function to refresh the list
const refreshList = () => {
  refreshKey.value++;
};

// Function to Delete the Workout
const handleDelete = () => {
  store.deleteWorkout(workout.id)
  dialogState.value = false;
};

const toggleEdit = () => {
  videoStore.video = workout.contents;
  name.value = workout.name;  // Reset fields
  intensity.value = workout.intensity;
  musclegroup.value = [...workout.musclegroup];

  dialogState.value = true;
};

const updateWorkout = async () => {
  try {
    await store.updateWorkout(workout.id, name.value, videoStore.video, intensity.value, musclegroup.value);
    dialogState.value = false;
  } catch (error) {
    console.error('Failed to update workout:', error);
  }
};



function handlePlay(workout: object) {
  console.log('Play button clicked!', workout);
}


</script>


<style scoped></style>
