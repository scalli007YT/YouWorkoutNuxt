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
    habits: [],
  }),
  actions: {},
});
