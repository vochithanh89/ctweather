import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSelector } from '../../components/redux/selectors';
import { getHome, getLocationInfo } from '../../utils/api';
import { BiCurrentLocation } from 'react-icons/bi';

import Lottie from 'react-lottie-player';
import { dayOfWeekAsInteger, imgWeather, lottieJsonWeather } from '../../components/functions/functions';
import Searchbar from './Searchbar';
import { settingsSlice } from '../../components/redux/settingsSlice';
import { setLocationLocal } from '../../utils/localStorage';

function LeftSidebar() {
    const dispatch = useDispatch();
    const { lon, lat, language } = useSelector(settingsSelector);

    const getData = async () => {
        return await getHome(lon, lat, language);
    };

    const { isFetching, isSuccess, data } = useQuery({
        queryKey: ['weatherData', lon, lat, language],
        queryFn: getData,
    });
    const { isLoading: isLocationLoading, data: locationInfo } = useQuery({
        queryKey: ['locationInfo', lon, lat],
        queryFn: async () => await getLocationInfo(lon, lat, language),
    });

    if (isFetching || isLocationLoading) {
        return <div></div>;
    }

    const { dt, temp, weather } = data.current;

    const currentTime = new Date(dt);

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                const lon = location.coords.longitude;
                const lat = location.coords.latitude;
                dispatch(settingsSlice.actions.locationChange({ lon, lat }));
                setLocationLocal(lon, lat);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="h-full">
            {isSuccess && (
                <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                        <Searchbar />
                        <button className="p-[0.25rem] rounded-full bg-gray-200 ml-2">
                            <BiCurrentLocation onClick={handleGetCurrentLocation} className="text-2xl" />
                        </button>
                    </div>
                    <h1 className="text-2xl xs:text-xl">{locationInfo.name}</h1>
                    <Lottie
                        className="w-3/4 md:w-1/2 mx-auto text-center"
                        loop
                        animationData={lottieJsonWeather(weather[0].main)}
                        play
                    />
                    <div>
                        <p className="mb-4 text-center text-6xl xs:text-4xl">
                            {Math.round(temp)}
                            <sup>ºC</sup>
                        </p>
                        <p className="text-center">{`${dayOfWeekAsInteger(
                            currentTime.getDay(),
                        )}, ${`${currentTime.getHours()}:${currentTime.getMinutes()}`}`}</p>
                    </div>
                    <div className="flex items-center justify-start">
                        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].main} />
                        <div>
                            <p>{weather[0].main}</p>
                            <p className="text-gray-400">{weather[0].description}</p>
                        </div>
                    </div>
                    <div>
                        <img
                            className="w-full h-32 rounded-xl object-cover"
                            src={imgWeather(weather[0].main)}
                            alt={weather[0].main}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default LeftSidebar;
