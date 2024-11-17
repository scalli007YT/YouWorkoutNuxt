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
      delete this.video[index];
    },

    getVideoDetails(index) {
      return this.video[index] || { name: "", thumbnail: "", link: "" };
    },

    getVideoCount() {
      return Object.keys(this.video).length;
    },
  },
});
