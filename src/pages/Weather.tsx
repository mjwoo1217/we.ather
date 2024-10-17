import {ForecastTable} from "../components";
import {useTranslation} from "react-i18next";
import {ForecastRequest} from '../dto';
import {format, subDays} from 'date-fns';
import React, {useEffect, useState} from "react";
import MapComponent from "../components/MapComponent";
import korea from '../assets/korea.json';
import {Feature, FeatureCollection} from "geojson";


const Weather = () => {
    const sevenDaysAgo = subDays(new Date(), 7);
    const formattedDate = format(sevenDaysAgo, 'yyyy-MM-dd');
    const {t} = useTranslation();
    const [selectedRegion, setSelectedRegion] = useState('Seoul');
    const [initialRequest, setInitialRequest] = useState(new ForecastRequest(selectedRegion, formattedDate));

    useEffect(() => {
        setInitialRequest(new ForecastRequest(selectedRegion, formattedDate));
    }, [selectedRegion, formattedDate]);

    const handleRegionClick = (feature: Feature) => {
        setSelectedRegion(feature.properties!.name_eng);
    };

    return (
        <section className="max-w-7xl mx-auto border-b-2">
            <div className="flex flex-col items-center my-20">
                <MapComponent geoData={korea as FeatureCollection} onRegionClick={handleRegionClick}/>
            </div>

            <h1 className="text-center text-2xl font-bold my-4">
                {t('page.weather.yearly.weather.data')}
            </h1>
            <ForecastTable initialRequest={initialRequest}/>
        </section>
    );
};

export default Weather;