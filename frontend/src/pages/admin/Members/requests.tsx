import validate from 'validate.js'

import { apiRequest } from 'helpers'
import { useTEPopupsFunctions } from 'react-tec'

interface Data {
	member_uid: string
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const createCase = async (data: Data) => {
	const { userToken, popupFunctions } = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		member_uid: {
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
		showNetworkActivity('Assigning Member to Current User...')
		// const data = { member_uid }
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: '/case',
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Created Case for Member',
		})
		return
	} catch (e) {
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
				console.log(`${key} - ${message}`)
			}
		}
		hideNetworkActivity()
		showAlert({
			title: 'Error',
			message: e.message,
		})
		console.log(e)
	}
}
