<template>
    You are currently {{ status }}.
    <v-spacer></v-spacer>
    <button @click="signIn('github')">
        Login
    </button>
    <v-spacer></v-spacer>
    <button @click="signOut()">
        Logout
    </button>
</template>

<script setup lang="ts">

// definePageMeta({
//     middleware: 'auth'
// })
// component imports
// import HabitForm from '~/components/HabitForm.vue'
// import HabitList from '~/components/HabitList.vue'
import { useHabitStore } from '~/stores/habits';
const { status, signOut, signIn } = useAuth()

const habitStore = useHabitStore()
habitStore.fetchHabits()
</script>

<style></style>