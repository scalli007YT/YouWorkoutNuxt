import { defineStore } from "pinia";

export const useVideoStore = defineStore("videoStore", {
  state: () => ({
    videoLinks: {}, // Store video links keyed by index
  }),
  actions: {
    setVideoLink(index, link) {
      this.videoLinks[index] = link;
    },
    getVideoLink(index) {
      return this.videoLinks[index] || "";
    },
  },
});
