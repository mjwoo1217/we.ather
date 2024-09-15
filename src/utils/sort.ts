import {ForecastData} from "../types/forecast";

export const sortForecastsByDateDesc = (data: ForecastData): ForecastData => {
    return {
        ...data,
        forecasts: data.forecasts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        })
    };
};
