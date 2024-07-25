import { HourlyData } from "../types/interfaces";

export const mapWeatherData = (data: HourlyData) => {
    return data.time.map((time: string, index: number) => ({
        time: time,
        temperature_2m: data.temperature_2m[index],
    }));
};

export const filterPastTimes = (data: { time: string; temperature_2m: number }[]) => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    return data.filter((item) => {
        const itemTime = new Date(item.time);
        return itemTime >= now;
    });
};
