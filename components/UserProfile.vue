<template>
    <v-btn text v-if="data">
        <span style="margin-right: 0.5em;">{{ data.user.name }}</span>
        <v-avatar size="32">
            <img :src="data.user.image" style="width: 100%; height: 100%; object-fit: cover;"
                @error="imageLoadFailed = true" v-if="!imageLoadFailed" />
            <!-- Display mdi-account icon when image fails -->
            <v-icon v-if="imageLoadFailed" size="x-large">mdi-account</v-icon>
        </v-avatar>
    </v-btn>

    <v-btn icon v-if="data">
        <v-icon @click="signOut()">mdi-logout</v-icon>
        <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
    </v-btn>
</template>

<script setup>
import { ref } from 'vue';
const { data, signOut } = useAuth();

// Track if the image load fails
const imageLoadFailed = ref(false);
</script>

<style scoped>
.v-btn {
    margin: 0;
}

.v-avatar img {
    object-fit: cover;
}
</style>