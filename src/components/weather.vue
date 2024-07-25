<script setup lang="ts">
import { ref, watch, computed } from "vue";
import RangeSelector from "./rangeSelector.vue";
import { fetchWeatherData } from "../services/weatherService";
import { formatToRussianDate } from "../utils/dateUtils";
import { mapWeatherData, filterPastTimes } from "../utils/weatherUtils";
import { Location, WeatherData } from "../types/interfaces";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const props = defineProps<{ location: Location }>();
const weatherData = ref<WeatherData | null>(null);
const numberofDays = ref<number>(1);

const loadWeatherData = async (location: Location) => {
    const startRange = new Date().toISOString().split("T")[0];
    const endRange = new Date(Date.now() + numberofDays.value * (3600 * 24 * 1000)).toISOString().split("T")[0];
    const data = await fetchWeatherData(location, startRange, endRange, userTimeZone);
    const filteredData = filterPastTimes(mapWeatherData(data.hourly));

    if (filteredData.length > 0) {
        const currentTemperature = filteredData[0].temperature_2m;
        const forecast = filteredData.slice(1);
        weatherData.value = {
            current: {
                temperature: currentTemperature,
            },
            forecast: forecast,
        };
    }
};

const updateRange = (days: number) => {
    numberofDays.value = days;
    if (props.location) {
        loadWeatherData(props.location);
    }
};

watch(
    () => props.location,
    (newLocation) => {
        if (newLocation) {
            loadWeatherData(newLocation);
        }
    },
    { immediate: true }
);

const currentWeather = computed(() => weatherData.value?.current);
const dailyForecast = computed(() => weatherData.value?.forecast);
</script>

<template>
    <div v-if="weatherData">
        <h3>{{ location.name }}</h3>
        <h5>Your Time zone: {{ userTimeZone }}</h5>
        <p>Current temperature now: {{ currentWeather?.temperature || "no info" }}°C</p>
        <RangeSelector @update:selectedDay="updateRange" />
        <h3>Forecast</h3>
        <ul class="forecast-wrapper">
            <li class="forecast-item" v-for="forecast in dailyForecast" :key="forecast.time">
                {{ formatToRussianDate(forecast.time) }}: {{ forecast.temperature_2m }}°C
            </li>
        </ul>
    </div>
</template>
<style scoped>
.search-query {
    height: 30px;
    padding: 10px;
    width: 500px;
}

.forecast-item {
    list-style-type: none;
    display: flex;
    justify-content: center;
}

.forecast-wrapper {
    padding-left: 0;
    width: 500px;
}
</style>
