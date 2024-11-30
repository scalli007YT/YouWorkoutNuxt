import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // To generate unique 16-character IDs

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
        completions: [],
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
    async updateWorkout(
      id,
      name,
      contents,
      intensity,
      musclegroup,
      completions
    ) {
      const workout = {
        contents,
        name,
        musclegroup,
        intensity,
        completions,
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

      // Clear the current workouts in the store
      this.workouts = [];

      // Add the fetched workouts to the Pinia store
      this.workouts.push(...fetchedWorkouts);
      return fetchedWorkouts;
    },

    // deleting workout
    async deleteWorkout(id) {
      const { $db } = useNuxtApp();
      const { data } = useAuth();

      // delete from Firebase
      const docRef = doc($db, "users", data.value.user.email, "workouts", id);
      await deleteDoc(docRef);

      // Ensure workouts is correctly populated
      this.workouts = this.workouts.filter((workout) => workout.id !== id); // Use the reactive workouts array
    },

    // Create a new document in FireStore, in $db/"templinks", which creates a new object with the key (random 16 char id)
    // and the content (workout). It should only persist there for 1 minute.
    async createShareWorkout(workout) {
      const { $db } = useNuxtApp();

      // Add an expiration time (1 minute from now)
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 10); // 10 minutes expiry

      // Create the share workout object with expiration
      const shareWorkout = {
        workout,
        expiration: expirationTime,
      };

      // Add the workout to Firestore in the "templinks" collection
      const docRef = await addDoc(collection($db, "templinks"), shareWorkout);

      // Return the generated document ID (Firestore automatically generates the ID)
      return docRef.id; // This is the unique ID for the newly created document
    },

    // Fetch a shared workout by its unique ID
    async getShareWorkout(id) {
      const { $db } = useNuxtApp();

      // Get all documents from the "templinks" collection
      const snapshot = await getDocs(collection($db, "templinks"));

      // Get the current time to compare with the expiration time
      const currentTime = new Date();

      // Loop through all the templinks and remove the ones that have expired
      const deletePromises = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const expiration = data?.expiration?.toDate(); // Convert Firestore timestamp to JavaScript Date object
        if (expiration && expiration < currentTime) {
          // If the document is expired, delete it
          await deleteDoc(doc.ref);
        }
      });

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Now check for the specific shared workout by its unique ID
      const docRef = doc($db, "templinks", id);
      const docSnapshot = await getDoc(docRef);

      // If the document exists and is not expired, return the workout
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const expiration = data?.expiration?.toDate(); // Convert Firestore timestamp to JavaScript Date object

        // Check if the link has expired
        if (expiration && expiration > currentTime) {
          return data.workout; // Return the workout if it's valid
        } else {
          // If expired, delete the document
          await deleteDoc(docRef);
          throw new Error("The shared workout link has expired.");
        }
      } else {
        throw new Error("Workout not found.");
      }
    },
  },
});
