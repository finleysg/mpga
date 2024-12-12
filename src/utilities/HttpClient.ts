import constants from "../app-constants"

const parseError = (error: any) => {
	if (typeof error === "string") {
		return new Error(error)
	}
	if (error.non_field_errors) {
		return new Error(error.non_field_errors[0])
	}
	if (error.detail) {
		return new Error(error.detail)
	}
	try {
		const message = JSON.stringify(error)
		return new Error(message)
	} catch (err) {
		return new Error("Server error")
	}
}

const normalizeEndpoint = (endpoint: string) => {
	if (!endpoint) {
		console.warn("Endpoint is empty")
		return ""
	}
	const [base, querystring] = endpoint.split("?")
	if (!base.startsWith("/") && base.endsWith("/")) {
		return `${base}${querystring ? "?" + querystring : ""}`
	}
	if (!base.startsWith("/") && !base.endsWith("/")) {
		return `${base}/${querystring ? "?" + querystring : ""}`
	}
	if (base.startsWith("/") && base.endsWith("/")) {
		return `${base.substring(1)}${querystring ? "?" + querystring : ""}`
	}
	if (base.startsWith("/") && !base.endsWith("/")) {
		return `${base.substring(1)}/${querystring ? "?" + querystring : ""}`
	}
	throw new Error("Naughty Zoot! Someone messed up their url.")
}

export const apiUrl = (endpoint: string) => {
	if (endpoint.startsWith("http")) {
		return endpoint
	}
	return `${constants.ApiUrl}/${normalizeEndpoint(endpoint)}`
}
export const authUrl = (endpoint: string) => {
	return `${constants.AuthUrl}/${normalizeEndpoint(endpoint)}`
}
export const serverUrl = (endpoint: string) => {
	return `${constants.ServerUrl}/${normalizeEndpoint(endpoint)}`
}

export async function httpClient(endpoint: string, options?: Partial<RequestInit>) {
	const { body, ...customConfig } = options ?? {}
	const headers = body instanceof FormData ? {} : { "Content-Type": "application/json" }

	const config = {
		method: body ? "POST" : "GET",
		body: body,
		credentials: "include",
		headers: {
			...headers,
			...customConfig.headers,
		},
		...customConfig,
	} as RequestInit

	return window.fetch(endpoint, config).then(async (response) => {
		if (response.ok) {
			if (response.status !== 204) {
				const data = await response.json()
				return data
			}
			return null
		} else {
			const error = await response.json()
			return Promise.reject(parseError(error))
		}
	})
}
