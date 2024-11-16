<template>
  <v-card flat class="border-dashed rounded-xl" style="border-width: 3px; font-size: 1.5em;" @click="handleClick">
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
            <v-img class="border-none rounded-xl" aspect-ratio="16/9" cover :src="thumbnail"></v-img>
          </v-row>
          <v-row justify="center">{{ videoTitle }}</v-row>
        </v-col>
      </template>
    </div>
  </v-card>

  <!-- Dialog for Add Video -->
  <v-dialog v-model="videoDialog" style="max-width: 31em;">
    <v-card prepend-icon="mdi-shape-plus" title="Add Video" class="mx-auto pa-3 rounded-xl min-w-full">
      <v-divider></v-divider>
      <v-col>
        <v-card-text>
          <v-row>
            <v-text-field label="Youtube Link*" v-model="youtubeLink" @input="validateLink"></v-text-field>
          </v-row>
          <v-row v-if="valid">
            <v-card flat class="border-dashed rounded-xl mx-auto min-w-full d-flex align-center justify-center"
              style="border-width: 3px; font-size: 1.5em;" @click="handleClick">
              <v-row class="align-center justify-center">
                <v-col class="d-flex align-center justify-center">
                  <v-img :src="thumbnail" />
                </v-col>
                <v-col class="d-flex align-center justify-center">
                  {{ videoTitle }}
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-card-text>
      </v-col>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text="Cancel" variant="plain" @click="videoDialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  index: { type: Number, required: true },
});

// Reactive properties
const Content = ref(false);
const videoDialog = ref(false);
const youtubeLink = ref(""); // Input link
const valid = ref(false); // Link validation state
const videoTitle = ref(""); // Video title

// Validate YouTube link
const validateLink = async () => {
  const youtubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=.+$/;
  valid.value = youtubeRegex.test(youtubeLink.value);
  if (valid.value) {
    await fetchVideoTitle();
  }
};

// Generate thumbnail URL dynamically
const thumbnail = computed(() => {
  const videoIdMatch = youtubeLink.value.match(/v=([^&]+)/);
  return videoIdMatch
    ? `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`
    : "";
});

// Fetch video title from YouTube page
const fetchVideoTitle = async () => {
  try {
    const response = await fetch(`/api/fetch-youtube-title?url=${encodeURIComponent(youtubeLink.value)}`);
    const data = await response.json();

    if (data.title) {
      videoTitle.value = data.title;
    } else {
      videoTitle.value = 'Error fetching title';
      console.error(data.error);
    }
  } catch (error) {
    console.error('Error fetching video title:', error);
    videoTitle.value = 'Error fetching title';
  }
};


// Handle click for adding or editing video
const handleClick = () => {
  videoDialog.value = !Content.value;
};

// Save video link
const saveVideoLink = () => {
  Content.value = true;
  videoDialog.value = false;
};
</script>
