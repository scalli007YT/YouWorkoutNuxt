<template>
    <v-container>
        <v-card elevation="8" class="mx-auto pa-6 max-w-fit rounded-xl border">
            <div class="text-4xl font-bold text-center mb-8">Dashboard</div>

            <!-- Grid layout for cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <!-- Card 1 -->
                <v-container class="pa-0">
                    <v-card flat class="mx-auto pa-5 rounded-xl border flex flex-col h-full min-w-full">
                        <v-row align="center" class="flex-grow">
                            <v-col class="text-center">
                                <v-icon size="x-large">mdi-check</v-icon>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <div class="text-xl font-bold w-44">Completed</div>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <div class="text-3xl font-bold">0</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>
                <!-- Card 2 -->
                <v-container class="pa-0">
                    <v-card flat class="mx-auto pa-5 rounded-xl border flex flex-col h-full min-w-full">
                        <v-row align="center" class="flex-grow">
                            <v-col class="text-center">
                                <v-icon size="x-large">mdi-yoga</v-icon>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <div class="text-xl font-bold w-44">Loaded</div>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <div class="text-3xl font-bold">{{ store.workouts.length || "◐" }}</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>
                <!-- Card 3 with @click event -->
                <v-container class="hover:scale-105 transition-transform duration-300 ease-in-out pa-0">
                    <v-card flat class=" mx-auto pa-5 rounded-xl border flex flex-col h-full min-w-full" to="/play">
                        <v-row align="center" class="flex-grow">
                            <v-col class="text-center">
                                <v-icon size="x-large">mdi-play</v-icon>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <div class="text-xl font-bold w-44">Start</div>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <v-icon size="x-large">mdi-play</v-icon>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>
                <!-- Card 4 with @click event -->
                <v-container class="hover:scale-105 transition-transform duration-300 ease-in-out pa-0">
                    <v-card flat class="mx-auto pa-5 rounded-xl border flex flex-col h-full min-w-full" to="/workouts">

                        <v-row align="center" class="flex-grow">
                            <v-col class="text-center">
                                <v-icon size="x-large">mdi-library</v-icon>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <div class="text-xl font-bold w-44">Library</div>
                            </v-col>
                            <v-divider inset vertical class="mx-2"></v-divider>
                            <v-col class="text-center">
                                <v-icon size="x-large">mdi-library</v-icon>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>

            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const store = useWorkoutStore();

// Automatically fetch workouts when the module is loaded
onMounted(async () => {
    await store.updateUserWorkouts();  // Wait for the workout data to load
});


const handleStart = () => {
    console.log('Start');
    // Add your logic for Card 3 click event
}

const handleLibrary = () => {
    console.log('Library');
    // Add your logic for Card 4 click event
}
</script>

<style scoped />
