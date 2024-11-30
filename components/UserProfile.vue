<template>
    <v-menu v-model="openMenu" offset-y>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="mr-4">
                <span>{{ data?.user?.name }}</span>
                <v-avatar size="32" class="ml-2 mr-2">
                    <img :src="data?.user?.image" class="w-full h-full object-cover" @error="imageLoadFailed = true"
                        v-if="!imageLoadFailed" />
                    <v-icon v-if="imageLoadFailed" size="x-large">mdi-account</v-icon>
                </v-avatar>
                <v-icon size="x-large">{{ openMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item>
                <v-btn block prepend-icon="mdi-theme-light-dark" @click="toggleTheme">Color mode</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn block prepend-icon="mdi-cog">Settings</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn block prepend-icon="mdi-progress-helper"
                    :href="`${useRuntimeConfig().public.githubRepoUrl}issues/new`" target="_blank">Create
                    Issue</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn block prepend-icon="mdi-logout" @click="signOut()">Log out</v-btn>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup>
import { ref } from 'vue';
const { data, signOut } = useAuth();

import { useTheme } from 'vuetify';
const theme = useTheme();

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'workoutLight' : 'workoutDark';
}

// Track if the image load fails
const imageLoadFailed = ref(false);

// Track the state of the menu (open or closed)
const openMenu = ref(false);
</script>