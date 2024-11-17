import { defineStore } from "pinia";

export const useVideoStore = defineStore("videoStore", {
  state: () => ({
    video: {}, // Store video details keyed by index
  }),
  actions: {
    setVideoDetails(index, name, thumbnail, link) {
      this.video[index] = { name, thumbnail, link };
    },

    removeIndex(index) {
      if (index < Object.keys(this.video).length) {
        delete this.video[index];

        for (let n = 0; n < Object.keys(this.video).length - index + 1; n++) {
          this.video[index + n] = { ...this.video[index + 1 + n] };
          delete this.video[index + 1 + n];
        }
      } else {
        console.log("index is the last");
      }
    },

    getVideoDetails(index) {
      return this.video[index] || { name: "", thumbnail: "", link: "" };
    },

    getVideoCount() {
      return Object.keys(this.video).length;
    },
  },
});
