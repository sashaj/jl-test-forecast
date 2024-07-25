<script setup lang="ts">
import { ref } from "vue";
import Location from "../components/location.vue";
import Weather from "../components/weather.vue";

interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const selectedLocation = ref<Location | null>(null);

const setLocation = (location: Location) => {
    selectedLocation.value = location;
};
</script>

<template>
    <div id="app">
        <Location @location-selected="setLocation" />
        <Weather v-if="selectedLocation" :location="selectedLocation" />
    </div>
</template>
<style scoped></style>
