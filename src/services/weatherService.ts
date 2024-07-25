import { Location } from "../types/interfaces";

export const fetchWeatherData = async (location: Location, startRange: string, endRange: string, timezone: string): Promise<any> => {
    const { latitude, longitude } = location;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${startRange}&end_date=${endRange}&timezone=${timezone}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return await response.json();
};
