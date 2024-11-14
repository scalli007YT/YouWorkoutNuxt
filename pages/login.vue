<template>
  <v-container fluid fill-height class="d-flex flex-column align-center justify-center">
    <v-card elevation="8" class="pa-4 text-center" width="312px">
      <div class="text-center">
        <v-icon large>mdi-application</v-icon> <!-- Replace with actual logo -->
      </div>
      <v-divider class="my-3"></v-divider>
      <v-card-title class="text-center headline">
        Welcome to My Application
      </v-card-title>
      <v-card-actions class="justify-center">
        <v-btn v-for="provider in providers" :key="provider.id" @click="signIn(provider.id)">
          Sign in with {{ provider.name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const { signIn, getProviders } = useAuth()
const providers = await getProviders()

definePageMeta({
  middleware: 'auth',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})

</script>


<style scoped>
html,
body,
#app,
.v-application {
  height: 100%;
  margin: 0;
}

.v-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>