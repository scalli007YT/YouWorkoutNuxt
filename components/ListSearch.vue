<template>
  <v-card flat class="border-solid rounded-xl pa-8" style="border-width: 1px; font-size: 1.5em;">
    <v-row align="center" justify="space-between">
      <v-autocomplete :items="[]" class="mx-auto -mb-5" density="comfortable" menu-icon="" placeholder="Search Workouts"
        prepend-inner-icon="mdi-magnify" flat variant="solo" item-props></v-autocomplete>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<style scoped>
/* Optional: Customize styling if needed */
</style>
