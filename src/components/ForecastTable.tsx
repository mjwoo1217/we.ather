// ForecastTable.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forecastAxios } from '../api';
import { Forecast, ForecastData } from "../types/forecast";
import { ForecastRequest } from "../dto";
import { format } from 'date-fns';

const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const monthDay = `${dateString.substring(4, 6)}/${dateString.substring(6, 8)}`;
    return { year, monthDay };
};

const groupByYear = (data: Forecast[]) => {
    return data.reduce((acc, item) => {
        const { year, monthDay } = formatDate(item.date);
        if (!acc[year]) {
            acc[year] = { year, dates: {} as Record<string, Forecast> };
        }
        acc[year].dates[monthDay] = item;
        return acc;
    }, {} as Record<string, { year: string; dates: Record<string, Forecast> }>);
};

const useFetchForecastData = (request: ForecastRequest) => {
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchForecastData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await forecastAxios(request);
                setForecastData(data);
            } catch (error) {
                setError('Failed to fetch forecast data');
                console.error('Failed to fetch forecast data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchForecastData().then(r => r);
    }, [request]);

    return { forecastData, loading, error };
};

interface ForecastTableProps {
    initialRequest: ForecastRequest;
}

const ForecastTable: React.FC<ForecastTableProps> = ({ initialRequest }) => {
    const { t } = useTranslation();
    const [request, setRequest] = useState<ForecastRequest>(initialRequest);
    const { forecastData, loading, error } = useFetchForecastData(request);

    // initialRequest가 변경될 때마다 request 상태를 업데이트
    useEffect(() => {
        setRequest(initialRequest);
    }, [initialRequest]);

    // Date 변경 핸들러
    const handleDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setRequest(prevRequest => ({
                ...prevRequest,
                startDate: formattedDate
            }));
        }
    };

    if (loading) return <div>{t('loading')}</div>;
    if (error) return <div>{t('error')}: {error}</div>;
    if (!forecastData) return <div>{t('no_data')}</div>;

    const groupedData = groupByYear(forecastData.forecasts);
    const sortedYears = Object.keys(groupedData).sort((a, b) => parseInt(b) - parseInt(a));
    const monthDays = sortedYears.length > 0
        ? Object.keys(groupedData[sortedYears[0]].dates)
        : [];

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-end mb-4">
                <div className="flex items-center space-x-2 sm:space-x-0 sm:flex-row sm:space-y-0 space-y-2">
                    <label htmlFor="startDate" className="sm:mr-2">{t('component.forecast.table.startDate')}:</label>
                    <DatePicker
                        id="startDate"
                        selected={new Date(request.startDate)}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="border p-2 w-full sm:w-auto"
                    />
                </div>
            </div>

            <div className="w-full overflow-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2">{t(forecastData.city)}</th>
                        {monthDays.map((monthDay, index) => (
                            <th className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap" key={index}>
                                {monthDay}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {sortedYears.map((year, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2">{year}</td>
                            {monthDays.map((monthDay, i) => (
                                <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap" key={i}>
                                    {t('component.forecast.table.temperature')}: {groupedData[year].dates[monthDay]?.temperature}°C<br/>
                                    {t('component.forecast.table.max.temperature')}: {groupedData[year].dates[monthDay]?.maxTemperature}°C<br/>
                                    {t('component.forecast.table.min.temperature')}: {groupedData[year].dates[monthDay]?.minTemperature}°C<br/>
                                    {t('component.forecast.table.rainfall')}: {groupedData[year].dates[monthDay]?.rainfall}<br/>
                                    {t('component.forecast.table.cloud.avg')}: {groupedData[year].dates[monthDay]?.cloudAvg}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ForecastTable;