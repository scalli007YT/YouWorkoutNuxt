import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { format, differenceInDays } from "date-fns";

export const useWorkoutStore = defineStore("workoutStore", {
  state: () => ({
    workouts: [],
  }),
  actions: {
    // fetching all habits
    async fetchHabits() {
      const { $db } = useNuxtApp();

      const snapshot = await getDocs(collection($db, "workouts"));
      this.workouts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },

    // adding new habits
    async addWorkout(name, contents, intensity, musclegroup) {
      const { $db } = useNuxtApp();
      const { data } = useAuth();

      const workout = {
        contents,
        name,
        musclegroup,
        intensity,
        completions: 0,
        user: data.value.user.email,
      };

      // add habit in firebase
      const docRef = await addDoc(collection($db, "workouts"), workout);

      // add habit to pinia store
      this.workouts.push({ id: docRef.id, ...workout });
    },
  },
});
