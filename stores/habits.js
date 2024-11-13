import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const useHabitStore = defineStore("habitStore", {
  state: () => ({
    habits: [],
  }),
  actions: {
    // fetch habbits
    async fetchHabits() {
      const { $db } = useNuxtApp();

      const snapshot = await getDocs(collection($db, "habits"));
      this.habits = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    },

    // adding a habit
    async addHabit(name) {
      const { $db } = useNuxtApp();

      const habit = {
        name,
        completions: [],
        streak: 0,
      };

      const docRef = await addDoc(collection($db, "habits"), habit);

      this.habits.push({ id: docRef.id, ...habit });
    },

    // delete a habit
    async deleteHabit(id) {
      const { $db } = useNuxtApp();

      const docRef = doc($db, "habits", id);
      await deleteDoc(docRef);

      this.habits = this.habits.filter((habit) => habit.id !== id);
    },
  },
});
