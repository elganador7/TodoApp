import validate from 'validate.js'

import { apiRequest } from 'helpers'
import { GroupModel } from 'interfaces'
import { useTEPopupsFunctions } from 'react-tec'
import { geolocated } from "react-geolocated";

interface Data {
	name: string
	phone_number: string
	latitude: string
	longitude: string
	popupFunctions: useTEPopupsFunctions
}
export const addPerson = async (data: Data) => {
	const {
		name,
		phone_number,
		latitude,
		longitude,
		popupFunctions,
	} = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		name: {
			presence: {
				allowEmpty: false,
			},
		},
		phone_number: {
			presence: {
				allowEmpty: false,
			},
		},
		latitude: {
			presence: {
				allowEmpty: false,
			},
		},
		longitude: {
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
		showNetworkActivity('Submitting Form...')
		const data = {
			name,
			phone_number,
			latitude,
			longitude,
		}
		await apiRequest({
			method: 'POST',
			path: `person`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Form Submitted!.',
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
