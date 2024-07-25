<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { Location } from "../types/interfaces";
import { fetchLocationData } from "../services/locationService";
const searchQuery = ref<string>("");
const locations = ref<Location[]>([]);
const emit = defineEmits(["location-selected"]);
const searchLocation = async () => {
    if (searchQuery.value.length > 2) {
        try {
            locations.value = await fetchLocationData(searchQuery.value);
        } catch (error) {
            console.error(error);
        }
    }
};

const selectLocation = (location: Location) => {
    locations.value = [];
    searchQuery.value = "";
    emit("location-selected", location);
};
</script>

<template>
    <div class="flex">
        <input class="search-query" type="text" v-model="searchQuery" placeholder="Location..." @input="searchLocation" />
        <ul class="location-wrapper" v-if="locations.length">
            <li class="location-item" v-for="location in locations" :key="location.id" @click="selectLocation(location)">
                {{ location.name }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.search-query {
    height: 40px;
    padding: 10px;
    width: 500px;
}

.location-item {
    cursor: pointer;
    list-style-type: none;
}

.location-item:hover {
    background-color: #007bff;
    color: white;
}
.location-wrapper {
    width: 500px;
    padding: 0;
}
</style>
