<template>

</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Werte zum füllen:
// videos
// name
// muscle
// 


const workoutStore = useWorkoutStore()
const videoStore = useVideoStore();
const name = ref('')
const intensity = ref('Medium') // Default value for intensity
const musclegroup = ref([]) // Default value for muscle group
const Editdialog = ref(true)
const refreshKey = ref(0); // Unique key to force re-render

// Computed property to get the number of cards to render
// const card_amount = computed(() => videoStore.getVideoCount() + 1);

// Watch for changes in card_amount and trigger necessary updates
watch(card_amount, (newCount) => {
    refreshList()
    console.log('Card amount changed:', newCount);
});
// Function to refresh the list
const refreshList = () => {
    refreshKey.value++;
};

const handleSubmit = async () => {
    // const trimmedName = name.value.trim();

    if (trimmedName && musclegroup.value.length > 0 && intensity.value) {
        console.log("submitting");
        // await workoutStore.addWorkout(trimmedName, videoStore.video, intensity.value, musclegroup.value);
        Editdialog.value = false; // Close the Editdialog after submission
        // Reset all the form values to their initial states
        // name.value = '';
        // musclegroup.value = [];
        // intensity.value = 'Medium'; // Reset to the default intensity
        // videoStore.$reset(); // Reset video store if necessary
        // refreshKey.value++; // Refresh list if needed
    }
}

</script>

<style scoped>
.v-card__title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>