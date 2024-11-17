<template>
  <v-card flat class="border-dashed rounded-xl" style="border-width: 3px; font-size: 1.5em;" @click="handleClick">
    <div class="card-content flex items-center justify-center min-h-[130px] min-w-[172px] max-h-[130px] max-w-[172px]">
      <template v-if="!Content">
        <v-row align="center" justify="center" no-gutters>
          <v-col class="flex justify-center" cols="auto">
            Add
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
            <v-card flat class="border-dotted rounded-xl mx-auto min-w-full d-flex align-center justify-center"
              style="border-width: 2px; font-size: 1.5em;" @click="saveVideoLink">
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
        <v-row>
          <v-col class="text-left">
            <v-btn v-if="Content" text="Delete" variant="plain" @click="handleDelete"></v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn text="Exit" variant="plain" @click="videoDialog = false"></v-btn>
          </v-col>

        </v-row>



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
  valid.value = /^https:\/\/www\.youtube\.com\/watch\?v=.+$/.test(youtubeLink.value);
  if (valid.value) {
    await fetchVideoTitle();
  } else {
    videoTitle.value = "";  // Clear title if invalid link
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
    videoTitle.value = data.title || 'Invalid Link';
  } catch (error) {
    console.error('Error fetching video title:', error);
    videoTitle.value = 'Error fetching title';
  }
};

// Handle click for adding or editing video
const handleClick = () => {
  if (Content.value) {
    // If content exists, open the video dialog to edit the video
    videoDialog.value = true;
  } else {
    // If no content, toggle the dialog to add a new video
    videoDialog.value = !Content.value;
  }
};

// Handle click for deleting video
const handleDelete = () => {
  // Remove video details from the store
  videoStore.removeIndex(props.index);

  // Reset the content state to indicate the video is deleted
  Content.value = false;
  youtubeLink.value = "";  // Clear the YouTube link input
  videoTitle.value = "";   // Clear the video title
  valid.value = false;     // Reset validation state

  // Close the dialog
  videoDialog.value = false;
};

const videoStore = useVideoStore()
const saveVideoLink = () => {
  videoStore.setVideoDetails(props.index, videoTitle.value, thumbnail.value, youtubeLink.value)
  Content.value = true;
  videoDialog.value = !Content.value;

};
</script>
