import axios from 'axios';
import { api_key, baseURL } from './constants';

const request = axios.create({
    baseURL: baseURL,
    method: 'get',
});

export const axiosGet = async (path, options) => {
    try {
        const myOptions = {
            ...options,
            params: {
                ...options.params,
                appid: api_key,
            },
        };
        const data = await request(path, myOptions);
        return data.data;
    } catch (error) {
        throw Error(error);
    }
};
