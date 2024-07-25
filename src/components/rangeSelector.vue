<script setup lang="ts">
import { ref } from "vue";

const daysRange = [1, 2, 3, 4, 5, 6, 7];
const selectedDay = ref<number>(1);

const emit = defineEmits<{ (e: "update:selectedDay", value: number): void }>();

const emitSelectedDay = () => {
    emit("update:selectedDay", selectedDay.value);
};
</script>
<template>
    <div class="forecast-range-selector">
        <label v-for="day in daysRange" :key="day" :class="{ selected: selectedDay === day }">
            <input type="radio" :value="day" v-model="selectedDay" @change="emitSelectedDay" />
            {{ day }}
        </label>
    </div>
</template>

<style scoped>
.forecast-range-selector {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.forecast-range-selector label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s, border-color 0.3s;
}

.forecast-range-selector label.selected {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.forecast-range-selector input[type="radio"] {
    display: none;
}
</style>
