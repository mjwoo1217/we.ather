export type AxiosRequest = object

export class ForecastRequest implements AxiosRequest {
    city: string;
    startDate: string;

    constructor(city: string, startDate: string) {
        this.city = city;
        this.startDate = startDate;
    }
}