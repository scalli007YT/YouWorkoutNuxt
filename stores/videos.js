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
        delete this.video[index];
      }
    },

    swapVideos(index, direction) {
      if (direction !== -1 && direction !== 1) {
        throw new Error("Direction must be -1 or 1");
      }

      const swapIndex = index + direction;
      if (this.video[swapIndex]) {
        const temp = this.video[index];
        this.video[index] = this.video[swapIndex];
        this.video[swapIndex] = temp;
      } else {
        throw new Error("Invalid index for swap");
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
