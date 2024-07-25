export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    current: {
        temperature: number;
    };
    forecast: Array<{
        time: string;
        temperature_2m: number;
    }>;
}

export interface HourlyData {
    time: string[];
    temperature_2m: number[];
}
