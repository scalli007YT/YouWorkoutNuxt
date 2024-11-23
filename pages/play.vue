<template>
  <v-container>
    <v-card elevation="8" class="mx-auto pa-6 max-w-full rounded-xl border">
      <v-stepper flat :items="['Select', 'Settings', 'Start']">

        <template v-slot:item.1>
          <ListSearch />
          <PlayList />
        </template>

        <template v-slot:item.2>
          <v-card title="Step Two" flat>...</v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Step Three" flat>...</v-card>
        </template>

      </v-stepper>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>

</script>

<style></style>