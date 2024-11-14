<template>
    <v-container>
        <v-card elevation="8" class="mx-auto pa-6 max-w-2xl">
            <div class="text-4xl font-bold text-center mb-8">Workouts</div>
            <WorkoutList :habits="habitStore.habits" />
        </v-card>
    </v-container>

</template>

<script setup lang="ts">

// component imports
import HabitForm from '~/components/HabitForm.vue'
import HabitList from '~/components/HabitList.vue'


definePageMeta({
    middleware: 'auth'
})


import { useHabitStore } from '~/stores/habits';

const habitStore = useHabitStore()
habitStore.fetchHabits()
</script>

<style></style>