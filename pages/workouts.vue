<template>
  <v-container>
    <v-card elevation="8" class="mx-auto pa-6 max-w-2xl rounded-xl border">
      <div class="text-4xl font-bold text-center mb-8">Workouts</div>
      <CreateWorkout />
    </v-card>
  </v-container>

</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

</script>

<style></style>