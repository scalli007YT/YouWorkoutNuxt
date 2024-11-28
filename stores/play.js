// playStore.ts (Pinia Store)
import { defineStore } from "pinia";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";

export const usePlayStore = defineStore("playStore", {
  state: () => ({
    filter: {
      search: "",
      intensity: [],
      group: [],
    },
    currentWorkout: null,
    selected: false,
    current_tab: 1,
    current_video: {},
    muted: false,
    autoplay: true,
    mode: "selection", // or playing
  }),
  actions: {
    async loadWorkout(id) {
      const { $db } = useNuxtApp();
      const { data } = useAuth();
      const docRef = doc($db, "users", data.value.user.email, "workouts", id);
      const workoutDoc = await getDoc(docRef);

      if (workoutDoc.exists()) {
        this.currentWorkout = { id: workoutDoc.id, ...workoutDoc.data() };
        this.selected = true;
      } else {
        this.currentWorkout = null;
      }
    },
  },
  persist: true,
});
