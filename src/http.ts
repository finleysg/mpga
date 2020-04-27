import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as Sentry from "@sentry/browser";

import constants from "./constants";

const Api = axios.create({
    baseURL: constants.ApiUrl,
    xsrfCookieName: constants.CrsfCookieName,
});

const Auth = axios.create({
    baseURL: constants.AuthUrl,
    xsrfCookieName: constants.CrsfCookieName,
});

Api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getTokenFromStorage();
    if (token) {
        config.headers["Authorization"] = "Token " + token;
    }
    return config;
});

Auth.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getTokenFromStorage();
    if (token) {
        config.headers["Authorization"] = "Token " + token;
    }
    return config;
});

Auth.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response.status !== 401) {
            Sentry.captureException(error);
        }
        return error;
    }
);

const getTokenFromStorage = (): string | null => {
    let token = localStorage.getItem(constants.BearerTokenName);
    if (!token) {
        token = sessionStorage.getItem(constants.BearerTokenName);
    }
    return token;
};

export { Api, Auth };
