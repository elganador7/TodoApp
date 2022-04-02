import axios, { AxiosRequestConfig } from 'axios'

import settings from 'config/settings'

interface ApiData extends AxiosRequestConfig {
	path: string
}
export const apiRequest = async (apiData: ApiData) => {
	const { path, ...rest } = apiData
	const { API_BASE_URL, API_DEBUGGING } = settings
	const url = API_BASE_URL + '/' + path

	if (API_DEBUGGING) {
		console.log(`API REQUEST - ${path}:`, { url, ...rest })
	}
	const response = await axios({ url, ...rest })
	if (API_DEBUGGING) {
		console.log(`API RESPONSE - ${path}:`, response)
	}
	return response
}
