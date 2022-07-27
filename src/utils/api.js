import { axiosGet } from './request';

export const getHome = async (lon, lat, language = 'en') => {
    const data = await axiosGet('/data/2.5/onecall', {
        params: {
            lon,
            lat,
            units: 'metric',
            lang: language,
        },
    });

    const step = 3;

    data.hourly = [...new Array(8)].map((item, index) => {
        return data.hourly[step * index];
    });

    return data;
};

export const getLocationInfo = async (lon, lat, language) => {
    let data = await axiosGet('/geo/1.0/reverse', {
        params: {
            lon,
            lat,
            limit: 1,
        },
    });
    data = data[0];
    data.name = data.local_names && data.local_names[language] ? data.local_names[language] : data.name;
    return data;
};

export const getSearchCity = async (cityName, language) => {
    let data = await axiosGet('/geo/1.0/direct', {
        params: {
            q: cityName,
            limit: 10,
        },
    });

    data.forEach((city) => {
        city.name = city.local_names && city.local_names[language] ? city.local_names[language] : city.name;
    });

    return data;
};
