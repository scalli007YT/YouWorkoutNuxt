<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <v-text-field class="mx-auto -mb-5" density="comfortable" placeholder="Search Workouts"
        prepend-inner-icon="mdi-magnify" flat variant="solo"></v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-select label="Select" :items="[]" variant="underlined"></v-select>
      </v-col>
      <v-col>
        <v-select label="Select" :items="[]" variant="underlined"></v-select>
      </v-col>
      <v-col>
        <v-select label="Select" :items="[]" variant="underlined"></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
</script>

<style scoped>
/* Optional: Customize styling if needed */
</style>
