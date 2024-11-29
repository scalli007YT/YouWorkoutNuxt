<template>
  <v-dialog v-model="dialogState" :style="{ maxWidth: maxWidth }">
    <v-card :prepend-icon="icon" :title="header" class="mx-auto pa-3 rounded-xl text-center" append-icon="none">
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-h6 font-weight-medium pa-4">{{ message }}</v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions class="mx-2">
        <v-row>
          <v-col class="text-left">
            <v-btn :color="button1Color" variant="tonal" @click="cancelAction">{{ button1Name }}</v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn :color="button2Color" @click="confirmAction" variant="elevated">{{ button2Name
              }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    icon: String,
    header: String,
    message: String,
    button1Name: String,
    button2Name: String,
    button1Color: String,
    button2Color: String,
    maxWidth: {
      type: String,
      default: "36em" // Default max width if none is provided
    }
  },
  data() {
    return {
      dialogState: false
    };
  },
  methods: {
    confirmAction() {
      this.$emit("confirm");
      this.dialogState = false;
    },
    cancelAction() {
      this.$emit("cancel");
      this.dialogState = false;
    }
  }
};
</script>
