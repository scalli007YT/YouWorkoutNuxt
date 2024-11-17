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
      const { data } = useAuth();
      const user_name = data.value.user.email; // Use the authenticated user's email or ID

      // Fetch workouts from the user's 'workouts' subcollection
      const snapshot = await getDocs(
        collection($db, "users", user_name, "workouts")
      );

      // Update the local state with the fetched workouts
      this.workouts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },

    // adding new workouts
    async addWorkout(name, contents, intensity, musclegroup) {
      const { $db } = useNuxtApp();
      const { data } = useAuth();
      const workout = {
        contents,
        name,
        musclegroup,
        intensity,
        completions: 0,
      };

      // Add the workout to the user's 'workouts' subcollection
      const docRef = await addDoc(
        collection($db, "users", data.value.user.email, "workouts"),
        workout
      );

      // Add workout to the Pinia store (if needed)
      this.workouts.push({ id: docRef.id, ...workout });
    },

    // Get workouts for the logged-in user
    async getUserWorkouts() {
      const { $db } = useNuxtApp();
      const { data } = useAuth();
      const user_name = data.value.user.email;

      // Fetch workouts from the user's 'workouts' subcollection
      const snapshot = await getDocs(
        collection($db, "users", user_name, "workouts")
      );

      // Return the list of workouts
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
});
