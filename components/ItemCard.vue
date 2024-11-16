<template>
  <v-card flat class="border-dashed rounded-xl" style="border-width: 3px; font-size: 1.5em;" @click="onAddVideo">
    <div class="card-content flex items-center justify-center min-h-[130px] min-w-[172px] max-h-[130px] max-w-[172px]">
      <template v-if="!Content">
        <v-row align="center" justify="center" no-gutters>
          <v-col class="flex justify-center" cols="auto">
            Add {{ index }}
          </v-col>
          <v-col class="flex justify-center" cols="auto">
            <v-icon>mdi-plus</v-icon>
          </v-col>
        </v-row>
      </template>
      <template v-if="Content">
        <v-col justify="center" class="pa-4">
          <v-row>
            <v-img class="border-none rounded-xl" aspect-ratio="16/9" cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
          </v-row>
          <v-row justify="center">
            Video {{ index }}
          </v-row>
        </v-col>
      </template>
    </div>
  </v-card>

  <!-- Dialog for Add Video -->
  <v-dialog v-model="videoDialog" style="max-width: 31em;">
    <v-card prepend-icon="mdi-plus" append-icon="mdi-plus" title="Add Video" class="mx-auto pa-3 rounded-xl min-w-full">
      <v-divider></v-divider>
      <v-col>
        <v-card-text>
          <v-row>
            <v-text-field label="Youtube Link*" v-model="youtubeLink"></v-text-field>
          </v-row>
        </v-card-text>
      </v-col>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text="Cancel" variant="plain" @click="videoDialog = false"></v-btn>
        <v-btn color="primary" text="Save" variant="tonal" @click="saveVideoLink"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
});
import { ref } from 'vue';

const videoStore = useVideoStore();
const Content = ref(false);
const videoDialog = ref(false);
const youtubeLink = ref("");  // This will store the input link
const videoLink = ref("");    // This will store the final video link to display

videoStore.$reset()

const onAddVideo = () => {
  console.log('Button 1 clicked');
  videoDialog.value = true; // Open the dialog when the "Add Video" button is clicked
};

const saveVideoLink = () => {
  videoStore.setVideoLink(props.index, youtubeLink.value); // Use the index prop directly
  videoLink.value = youtubeLink.value;
  Content.value = true;
  videoDialog.value = false;
};
</script>