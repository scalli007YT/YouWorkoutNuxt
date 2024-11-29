<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <v-col>
        <!-- Adjusting the layout of the title and subtitle -->
        <v-row>
          <v-card-title class="pa-3 pt-0" style="white-space: normal;">{{ workout?.name }}</v-card-title>
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
            <v-chip prepend-icon="mdi-check-all" variant="outlined" size="large">{{ workout?.completions.length
              }}</v-chip>
          </v-card-subtitle>
        </v-row>
      </v-col>

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
    <v-card prepend-icon="mdi-puzzle-edit-outline" append-icon="none" title="Edit Workout"
      class="mx-auto pa-3 rounded-xl text-center text-base" style="max-width: 36em;">

      <v-divider></v-divider>

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
          <v-select label="Muscle Group*" :items="['HIIT', 'Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs']"
            variant="solo" v-model="musclegroup" chips multiple>
          </v-select>
        </v-row>
        <v-row dense>
          <v-select label="Intensity" :items="['Low', 'Medium', 'doable', 'High']" variant="solo"
            v-model="intensity"></v-select>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-row>
          <v-col class="text-left">
            <v-btn text="Cancel" @click="dialogState = false"></v-btn>
            <v-btn color="primary" variant="plain" text="Delete" @click="handleDelete"></v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn color="primary" text="Save" variant="outlined" @click="updateWorkout"></v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  workout: { type: Object, required: true },
});

const store = useWorkoutStore();
const videoStore = useVideoStore();

const dialogState = ref(false);
const refreshKey = ref(0);

const name = ref(props.workout.name);
const intensity = ref(props.workout.intensity);
const musclegroup = ref(props.workout.musclegroup);
const completions = ref(props.workout.completions);

const card_amount = computed(() => videoStore.getVideoCount() + 1);

watch(videoStore, () => refreshList());

watch(dialogState, (newValue) => {
  if (!newValue) {
    store.updateUserWorkouts();
  }
});

const refreshList = () => refreshKey.value++;

const handleDelete = () => {
  store.deleteWorkout(props.workout.id);
  dialogState.value = false;
};

const toggleEdit = () => {
  videoStore.video = props.workout.contents;
  name.value = props.workout.name;
  intensity.value = props.workout.intensity;
  musclegroup.value = [...props.workout.musclegroup];
  completions.value = [...props.workout.completions];
  dialogState.value = true;
};

const updateWorkout = async () => {
  try {
    dialogState.value = false;
    await store.updateWorkout(props.workout.id, name.value, videoStore.video, intensity.value, musclegroup.value, completions.value);
  } catch (error) {
    console.error('Failed to update workout:', error);
  }
};

function handlePlay(workout: object) {
  console.log('Play button clicked!', workout);
}
</script>

<style scoped>
/* Ensure proper wrapping of workout name */
.v-card-title {
  white-space: normal;
  overflow-wrap: break-word;
}
</style>
