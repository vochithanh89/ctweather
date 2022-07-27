import { createSlice } from '@reduxjs/toolkit';
import { getLocationLocal } from '../../utils/localStorage';

const location = getLocationLocal();

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        lat: location.lat,
        lon: location.lon,
        language: 'en',
        units: 'c',
        section: 'hourly',
    },
    reducers: {
        unitsChange: (state, action) => {
            state.units = action.payload !== undefined ? action.payload : state.units;
        },
        sectionChange: (state, action) => {
            state.section = action.payload !== undefined ? action.payload : state.section;
        },
        locationChange: (state, action) => {
            state.lon = action.payload.lon !== undefined ? action.payload.lon : state.lon;
            state.lat = action.payload.lat !== undefined ? action.payload.lat : state.lat;
        },
    },
});
