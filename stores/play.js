import { defineStore } from "pinia";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";

export const usePlayStore = defineStore("playStore", {
  state: () => ({
    filter: {
      search: "",
      intensity: [],
      group: [],
    },
    currentWorkout: null, // Holds the single workout
    selected: false,
    muted: true,
  }),
  actions: {
    // Load a specific workout from Firestore into the store
    async loadWorkout(id) {
      const { $db } = useNuxtApp();
      const { data } = useAuth();
      const docRef = doc($db, "users", data.value.user.email, "workouts", id);
      const workoutDoc = await getDoc(docRef);

      if (workoutDoc.exists()) {
        this.currentWorkout = { id: workoutDoc.id, ...workoutDoc.data() };
        this.selected = true;
      } else {
        this.currentWorkout = null; // Clear if not found
      }
    },
  },
});
