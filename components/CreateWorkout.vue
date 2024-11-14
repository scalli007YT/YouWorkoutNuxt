<template>
  <v-card flat append-icon="mdi-plus" class="border-dashed rounded-xl pa-1" style="border-width: 3px; font-size: 1.5em;"
    subtitle="No Workout found in library" title="Create New Workout" @click="dialog = true">
  </v-card>

  <v-dialog v-model="dialog" max-width="600">
    <v-card prepend-icon="mdi-dumbbell" append-icon="mdi-dumbbell" title="Create Workout"
      class="mx-auto pa-3 max-w-2xl rounded-xl text-center text-base">

      <v-divider style="margin-bottom: 24px;"></v-divider>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field label="First name*" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field hint="example of helper text only on focus" label="Middle name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field hint="example of persistent helper text" label="Last name*" persistent-hint
              required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Email*" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Password*" type="password" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Confirm Password*" type="password" required></v-text-field>
          </v-col>

        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
        <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
</script>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>
.v-card__title {
  text-align: center;
  font-size: 1.5rem;
  /* Adjust this value to make the title larger */
  font-weight: bold;
}
</style>
