export interface Forecast {
    date: string;
    temperature: number;
    maxTemperature: number;
    minTemperature: number;
    cloudAvg: number;
    rainfall: number;
}

export interface ForecastData {
    city: string;
    forecasts: Forecast[];
}