import { sunriseImg, sunsetImg } from '../assets/today';
import { msToTime } from './functions/functions';

function Sun({ dtStamp, sunriseStamp, sunsetStamp }) {
    const sunriseDistance = '-' + msToTime(Math.abs(sunriseStamp - dtStamp) * 1000);
    const sunsetDistance = '+' + msToTime(Math.abs(sunsetStamp - dtStamp) * 1000);

    const sunriseTime = new Date(sunriseStamp * 1000);
    const sunsetTime = new Date(sunsetStamp * 1000);

    return (
        <div className="w-full h-full flex flex-col justify-around">
            <div className="flex items-center">
                <img className="w-12 h-12 mr-4" src={sunriseImg} alt="sunrise" />
                <div>
                    <p>{`${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`}</p>
                    <p className="text-sm text-gray-400">{sunriseDistance}</p>
                </div>
            </div>
            <div className="flex items-center">
                <img className="w-12 h-12 mr-4" src={sunsetImg} alt="sunset" />
                <div>
                    <p>{`${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`}</p>
                    <p className="text-sm text-gray-400">{sunsetDistance}</p>
                </div>
            </div>
        </div>
    );
}

export default Sun;
