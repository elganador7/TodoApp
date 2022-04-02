import validate from 'validate.js'

import { apiRequest } from 'helpers'

import { useTEPopupsFunctions } from 'react-tec'

interface Data {
	name: string
	poc: string
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const addUnit = async (data: Data) => {
	const { name, poc, userToken, popupFunctions } = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		name: {
			presence: {
				allowEmpty: false,
			},
		},
		poc: {
			presence: {
				allowEmpty: false,
			},
		},
	}
	const validationResponse = validate(data, validatorConstraints)
	if (validationResponse) {
		const valuesArray: any[][] = Object.values(validationResponse)
		const firstError: any[] = valuesArray[0]
		const firstErrorMessage: string = firstError[0]
		showAlert({
			title: 'Error',
			message: firstErrorMessage,
		})
		throw new Error(firstErrorMessage)
	}

	try {
		showNetworkActivity('Adding Unit...')
		const data = {
			name,
			poc,
		}
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: `unit`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Unit Added.',
		})
		return
	} catch (e) {
		console.log(e)
		//Handle Errors
		if (e && e.response && e.response.data && e.response.data.errors) {
			console.log(e.response.data.errors)
			hideNetworkActivity()
			for (const key in e.response.data.errors) {
				const message = e.response.data.errors[key][0]
				showAlert({
					title: 'Error',
					message: `${key} - ${message}`,
				})
				throw new Error(`${key} - ${message}`)
			}
		}
		hideNetworkActivity()
		showAlert({
			title: 'Error',
			message: e.message,
		})
		throw new Error(e)
	}
}
