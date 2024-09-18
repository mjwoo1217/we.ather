import map from "../assets/map.jpg"
import {ForecastTable} from "../components";
import {useTranslation} from "react-i18next";
import {ForecastRequest} from '../dto';
import {format, subDays} from 'date-fns';


const Weather = () => {
    const sevenDaysAgo = subDays(new Date(), 7);
    const formattedDate = format(sevenDaysAgo, 'yyyy-MM-dd');

    const initialRequest = new ForecastRequest('Seoul', formattedDate);
    const {t} = useTranslation();
    return (
        <section className="max-w-7xl mx-auto border-b-2">
            <div className="flex flex-col items-center my-20">
                <img src={map} className="w-1/2 h-auto object-cover rounded-2xl p-2" alt={'map'}/>
            </div>
            <h1 className="text-center text-2xl font-bold my-4">{t('page.weather.yearly.weather.data')}</h1>
            <ForecastTable initialRequest={initialRequest}/>
        </section>
    )
}

export default Weather