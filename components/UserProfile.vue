<template>
    <v-btn text v-if="data">
        <span style="margin-right: 0.5em;">{{ data.user.name }}</span>
        <v-avatar size="32">
            <img :src="data.user.image" style="width: 100%; height: 100%; object-fit: cover;" />
        </v-avatar>
    </v-btn>

    <v-btn icon>
        <v-icon @click="signOut()" v-if="data">mdi-logout</v-icon>
        <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
    </v-btn>

</template>
<script setup>
const { status, data, signOut } = useAuth()

</script>

<style scoped>
.v-btn {
    margin: 0;
}

.v-avatar img {
    object-fit: cover;
}
</style>