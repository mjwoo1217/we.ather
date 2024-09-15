import axiosInstance from './AxiosInstance';
import {ForecastData} from "../types/forecast";
import {forecastData} from "../data/forecastData";

const forecastAxios = async (): Promise<ForecastData> => {
    try {
        const response = await axiosInstance.get('/forecast');
        return response.data;
    } catch (error) {
        console.error(error);
        return forecastData
    }
};

export default forecastAxios;