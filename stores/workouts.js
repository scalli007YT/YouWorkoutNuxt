import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useWorkoutStore = defineStore("workoutStore", {
  state: () => ({
    workouts: [],
  }),
  actions: {
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

    // adding new workouts
    async updateWorkout(id, name, contents, intensity, musclegroup) {
      const workout = {
        contents,
        name,
        musclegroup,
        intensity,
        completions: 0,
      };

      const { $db } = useNuxtApp();
      const { data } = useAuth();
      const docRef = doc($db, "users", data.value.user.email, "workouts", id);
      await updateDoc(docRef, workout);

      // Fix: Correctly find and update the workout in the workouts array
      const updateIndex = this.workouts.findIndex((w) => w.id === id);
      if (updateIndex !== -1) {
        // Correctly update the workout at the found index
        this.workouts[updateIndex] = {
          ...this.workouts[updateIndex],
          ...workout,
        };
      }
    },

    // Get workouts for the logged-in user
    async updateUserWorkouts() {
      const { $db } = useNuxtApp();
      const { data } = useAuth();
      const user_name = data.value.user.email;

      // Fetch workouts from the user's 'workouts' subcollection
      const snapshot = await getDocs(
        collection($db, "users", user_name, "workouts")
      );

      // Map the snapshot docs to the workout data
      const fetchedWorkouts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Push the fetched workouts to the Pinia store
      this.workouts.push(...fetchedWorkouts);

      return fetchedWorkouts;
    },
  },
});
