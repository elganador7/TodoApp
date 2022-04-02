import validate from 'validate.js'

import { apiRequest } from 'helpers'
import { GroupModel } from 'interfaces'
import { useTEPopupsFunctions } from 'react-tec'

interface Data {
	username: string
	password: string
	write_privileges: string
	group_admin: string
	groups: GroupModel[]
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const addUser = async (data: Data) => {
	const {
		username,
		password,
		write_privileges,
		group_admin,
		groups,
		userToken,
		popupFunctions,
	} = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		username: {
			presence: {
				allowEmpty: false,
			},
		},
		password: {
			presence: {
				allowEmpty: false,
			},
		},
		group_admin: {
			presence: {
				allowEmpty: false,
			},
		},
		write_privileges: {
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
		showNetworkActivity('Adding User...')
		const data = {
			username,
			password,
			is_active: true,
			group_admin: group_admin === 'Yes',
			write_privileges: write_privileges === 'Yes',
			relationships: { groups },
		}
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: `user`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'User Added.',
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
