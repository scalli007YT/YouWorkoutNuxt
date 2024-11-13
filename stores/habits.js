import { defineStore } from "pinia";
import { addDoc, collection } from "firebase/firestore";

export const useHabitStore = defineStore("habitStore", {
  state: () => ({
    habits: [],
  }),
  actions: {
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
  },
});
