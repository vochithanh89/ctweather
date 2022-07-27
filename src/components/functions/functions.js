import { cloud, error, rain, snow, thunderstorm } from '../../assets/lottie';
import { cloudImg, rainImg, snowImg, thunderstormImg } from '../../assets/img';

export const tempConverter = (temp) => {
    return Number.isFinite(temp) ? Math.round((9 / 5) * temp + 32) : null;
};
export const msToTime = (duration) => {
    // eslint-disable-next-line
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    // eslint-disable-next-line
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // eslint-disable-next-line
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${hours}h ${minutes}m`;
};

export const lottieJsonWeather = (weather) => {
    switch (weather) {
        case 'Clouds':
            return cloud;
        case 'Clear':
            return cloud;
        case 'Rain':
            return rain;
        case 'Thunderstorm':
            return thunderstorm;
        case 'Snow':
            return snow;
        default:
            return error;
    }
};

export const imgWeather = (weather) => {
    switch (weather) {
        case 'Clouds':
            return cloudImg;
        case 'Clear':
            return cloudImg;
        case 'Rain':
            return rainImg;
        case 'Thunderstorm':
            return thunderstormImg;
        case 'Snow':
            return snowImg;
        default:
            return error;
    }
};

export const dayOfWeekAsInteger = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
};
