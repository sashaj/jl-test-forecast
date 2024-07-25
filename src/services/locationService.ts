import { Location } from "../types/interfaces";

export const fetchLocationData = async (searchQuery: string): Promise<Location[]> => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`);
    if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results as Location[];
};
