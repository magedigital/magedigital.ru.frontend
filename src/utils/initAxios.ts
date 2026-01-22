import axios from 'axios';

import { enums } from '@global/enums';

import { getCookie, setCookie } from './cookies';

const AxiosInst = axios.create({
    baseURL: process.env.REACT_APP_API,
});

AxiosInst.interceptors.request.use(
    (config) => {
        const token = getCookie(enums.ACCESS_TOKEN);

        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        config.withCredentials = true;

        return config;
    },
    (err) => Promise.reject(err),
);

AxiosInst.interceptors.response.use(
    async (response) => {
        const data = response.data;
        const { accessToken, updatedAuthUser } = data as ResponseT;

        if (accessToken) {
            setCookie(enums.ACCESS_TOKEN, accessToken);
        }

        if (updatedAuthUser) {
            // appStore.getState().setUser(updatedAuthUser)

            localStorage.setItem(enums.USER, JSON.stringify(updatedAuthUser));
        }

        return data;
    },
    async (e) => {
        const error = e?.response?.data as ResponseErrorT;

        // if (key === 1) {
        //     if (error.error?.text) {
        //         setError({ text: error.error.text });
        //     } else if (error.message === 'Permission denied') {
        //         setError({ text: 'Доступ запрещён' });
        //     }
        // }

        return Promise.reject(error || {});
    },
);

export { AxiosInst };
