import { useMemo } from 'react';
import Lottie from 'react-lottie-player';
import { lottieJsonWeather } from './functions/functions';

function WeatherCard({ timeStamp, timeType = 'day', weather, temp, tempMin, tempMax }) {
    const time = useMemo(() => {
        const time = new Date(timeStamp * 1000);
        if (timeType === 'hourly') {
            const hours = time.getHours();
            const suffix = hours >= 12 ? 'PM' : 'AM';
            return `${((hours + 11) % 12) + 1} ${suffix}`;
        } else if (timeType === 'daily') {
            return time.toUTCString().slice(0, 3);
        }
    }, [timeStamp, timeType]);

    return (
        <div className="w-24 py-4 flex flex-col items-center rounded-lg bg-white">
            <h2>{time}</h2>
            <Lottie className="w-16" loop animationData={lottieJsonWeather(weather)} play />
            {temp && <p>{`${Math.round(temp)}º`}</p>}
            {tempMin && tempMax && (
                <div className="flex">
                    <p className="mr-2 text-gray-500">{`${Math.round(tempMin)}º`}</p>
                    <p>{`${Math.round(tempMax)}º`}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
