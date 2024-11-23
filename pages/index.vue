<template>
    <v-container>
        <v-card elevation="8" class="mx-auto pa-6 max-w-fit rounded-xl border">
            <div class="text-4xl font-bold text-center mb-8">Dashboard</div>

            <!-- Grid layout for cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                <!-- Card 1 -->
                <v-card flat class="mx-auto pa-3 rounded-xl border">
                    <v-row align="center">
                        <v-col class="text-center">
                            <v-icon size="x-large">mdi-yoga</v-icon>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-xl font-bold">Loaded Workouts</div>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-3xl font-bold">0</div>
                        </v-col>
                    </v-row>
                </v-card>

                <!-- Card 2 -->
                <v-card flat class="mx-auto pa-3 rounded-xl border">
                    <v-row align="center">
                        <v-col class="text-center">
                            <v-icon size="x-large">mdi-yoga</v-icon>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-xl font-bold">Loaded Workouts</div>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-3xl font-bold">0</div>
                        </v-col>
                    </v-row>
                </v-card>

                <!-- Card 3 -->
                <v-card flat class="mx-auto pa-3 rounded-xl border">
                    <v-row align="center">
                        <v-col class="text-center">
                            <v-icon size="x-large">mdi-yoga</v-icon>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-xl font-bold">Loaded Workouts</div>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-3xl font-bold">0</div>
                        </v-col>
                    </v-row>
                </v-card>

                <!-- Card 4 -->
                <v-card flat class="mx-auto pa-3 rounded-xl border">
                    <v-row align="center">
                        <v-col class="text-center">
                            <v-icon size="x-large">mdi-yoga</v-icon>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-xl font-bold">Loaded Workouts</div>
                        </v-col>
                        <v-divider inset vertical class="mx-2"></v-divider>
                        <v-col class="text-center">
                            <div class="text-3xl font-bold">0</div>
                        </v-col>
                    </v-row>
                </v-card>

            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
</script>

<style scoped></style>