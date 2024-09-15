import React from 'react';
import {useTranslation} from 'react-i18next';
import {forecastData} from "../data/forecastData";
import {Forecast} from "../types/forecast";

const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const monthDay = `${dateString.substring(4, 6)}/${dateString.substring(6, 8)}`;
    return {year, monthDay};
};

const groupByYear = (data: Forecast[]) => {
    return data.reduce((acc, item) => {
        const {year, monthDay} = formatDate(item.date);
        if (!acc[year]) {
            acc[year] = {year, dates: {} as Record<string, Forecast>};
        }
        acc[year].dates[monthDay] = item;
        return acc;
    }, {} as Record<string, { year: string; dates: Record<string, Forecast> }>);
};

const ForecastTable: React.FC = () => {
    const {t} = useTranslation();

    const groupedData = groupByYear(forecastData.forecasts);
    const monthDays = Object.values(groupedData)[0]
        ? Object.keys(Object.values(groupedData)[0].dates)
        : [];

    return (
        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
            <tr>
                <th className="border border-gray-300 px-4 py-2">{t(forecastData.city)}</th>
                {monthDays.map((monthDay, index) => (
                    <th className="border border-gray-300 px-4 py-2" key={index}>
                        {monthDay}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {Object.values(groupedData).map((yearData, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{yearData.year}</td>
                    {monthDays.map((monthDay, i) => (
                        <td className="border border-gray-300 px-4 py-2" key={i}>
                            {t('component.forecast.table.temperature')}: {yearData.dates[monthDay]?.temperature}°C<br/>
                            {t('component.forecast.table.max.temperature')}: {yearData.dates[monthDay]?.maxTemperature}°C<br/>
                            {t('component.forecast.table.min.temperature')}: {yearData.dates[monthDay]?.minTemperature}°C<br/>
                            {t('component.forecast.table.rainfall')}: {yearData.dates[monthDay]?.rainfall}<br/>
                            {t('component.forecast.table.cloud.avg')}: {yearData.dates[monthDay]?.cloudAvg}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ForecastTable;