import axiosInstance from './AxiosInstance';
import {ForecastData} from "../types/forecast";
import {forecastData} from "../data/forecastData";
import {ForecastRequest} from "../dto";

const forecastAxios = async (request: ForecastRequest): Promise<ForecastData> => {
    try {
        const response = await axiosInstance.get('/forecast', {
            params: request
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return forecastData;
    }
};

export default forecastAxios;