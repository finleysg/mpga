import axios, { AxiosRequestConfig } from "axios"

import constants from "./app-constants"

const Api = axios.create({
	baseURL: constants.ApiUrl,
	xsrfCookieName: constants.CrsfCookieName,
})

const Auth = axios.create({
	baseURL: constants.AuthUrl,
	xsrfCookieName: constants.CrsfCookieName,
})

Api.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = getTokenFromStorage()
	if (token) {
		config.headers["Authorization"] = "Token " + token
	}
	return config
})

Auth.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = getTokenFromStorage()
	if (token) {
		config.headers["Authorization"] = "Token " + token
	}
	return config
})

const getTokenFromStorage = (): string | null => {
	let token = localStorage.getItem(constants.BearerTokenName)
	if (!token) {
		token = sessionStorage.getItem(constants.BearerTokenName)
	}
	return token
}

export { Api, Auth }
