export const getLocationLocal = () => {
    const location = localStorage.getItem('location')
        ? JSON.parse(localStorage.getItem('location'))
        : { lat: '21.028511', lon: '105.804817' };
    return location;
};

export const setLocationLocal = (lon, lat) => {
    const location = getLocationLocal();
    location.lon = lon;
    location.lat = lat;
    localStorage.setItem('location', JSON.stringify(location));
};
