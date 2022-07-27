import { useQuery } from 'react-query';
import { settingsSelector } from '../components/redux/selectors';
import WeatherCard from '../components/WeatherCard';
import { useSelector } from 'react-redux';
import { getHome } from '../utils/api';
import Loading from '../components/Loading';
import { tempConverter } from '../components/functions/functions';
import Uv from '../components/Uv/Uv';
import StatusCard from '../components/StatusCard';
import OtherStatus from '../components/OtherStatus';
import { directionImg, humidityImg, pressureImg, visibilityImg } from '../assets/today';
import Sun from '../components/Sun';
import useDelay from '../hooks/useDelay';

function Home() {
    const { lon, lat, units, language, section } = useSelector(settingsSelector);

    const getData = async () => {
        return await getHome(lon, lat, language);
    };

    const { isFetching, isError, data } = useQuery({
        queryKey: ['weatherData', lon, lat, language],
        queryFn: getData,
    });

    const isSuccess = useDelay(1500, isFetching);

    if (!isSuccess && !isError) {
        return <Loading />;
    }

    if (isError) {
        return <></>;
    }

    const { dt, humidity, pressure, sunrise, sunset, uvi, visibility, wind_deg, wind_speed } = data.current;

    return (
        <div className="p-8">
            {isSuccess && (
                <>
                    <div className="flex flex-wrap justify-center gap-[0.5rem] mb-5">
                        {data[section].map((item, index) => {
                            return (
                                <WeatherCard
                                    key={index}
                                    timeStamp={item.dt}
                                    timeType={section}
                                    weather={item.weather[0].main}
                                    temp={section === 'hourly' && units === 'c' ? item.temp : tempConverter(item.temp)}
                                    tempMin={units === 'c' ? item.temp.min : tempConverter(item.temp.min)}
                                    tempMax={units === 'c' ? item.temp.max : tempConverter(item.temp.max)}
                                />
                            );
                        })}
                    </div>
                    <div className="flex flex-wrap justify-center max-w-[51.5rem] m-auto gap-[1.75rem]">
                        <StatusCard title="UV Index">
                            <Uv value={uvi} />
                        </StatusCard>
                        <StatusCard title="Wind Status">
                            <OtherStatus
                                count={wind_speed}
                                units="m/s"
                                iconUrl={directionImg}
                                iconText={`${wind_deg} degrees`}
                            />
                        </StatusCard>
                        <StatusCard title="Sunrise and Sunset">
                            <Sun dtStamp={dt} sunriseStamp={sunrise} sunsetStamp={sunset} />
                        </StatusCard>
                        <StatusCard title="Humidity">
                            <OtherStatus
                                count={humidity}
                                units="%"
                                iconUrl={humidityImg}
                                iconText={humidity < 30 ? 'Very Dry' : humidity < 70 ? 'Normal' : 'Very Wet'}
                            />
                        </StatusCard>
                        <StatusCard title="Visibility">
                            <OtherStatus
                                count={Math.round(visibility / 1000)}
                                units="km"
                                iconUrl={visibilityImg}
                                iconText={
                                    Math.round(visibility / 1000) < 3
                                        ? 'Too much dust'
                                        : Math.round(visibility / 1000) < 7
                                        ? 'Normal'
                                        : 'Good for eyes'
                                }
                            />
                        </StatusCard>
                        <StatusCard title="Air Pressure">
                            <OtherStatus
                                count={pressure}
                                units="hPa"
                                iconUrl={pressureImg}
                                iconText={
                                    pressure < 900 ? 'Low pressure' : pressure < 1100 ? 'Normal' : 'High pressure'
                                }
                            />
                        </StatusCard>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
