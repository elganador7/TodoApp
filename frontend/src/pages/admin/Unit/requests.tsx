import validate from 'validate.js'

import { apiRequest } from 'helpers'
import { useTEPopupsFunctions } from 'react-tec'

interface Data {
	uid: string
	poc: string
	name: string
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const saveUnit = async (data: Data) => {
	const { uid, name, poc, userToken, popupFunctions } = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		name: {
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
		showNetworkActivity('Updating Unit...')
		const data = {
			name,
			poc,
		}
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: `unit/${uid}`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Unit Updated.',
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

interface RemoveGroupData {
	group_uuid: string
	unit_uuid: string
	userToken: string | null | undefined
	popupFunctions: useTEPopupsFunctions
	loadData(): void
}
export const confirmRemoveGroup = (data: RemoveGroupData) => {
	const { group_uuid, unit_uuid, userToken, popupFunctions, loadData } = data
	const {
		showNetworkActivity,
		hideNetworkActivity,
		showAlert,
		showConfirm,
		hideConfirm,
	} = popupFunctions

	const removeGroup = async () => {
		try {
			hideConfirm()
			showNetworkActivity('Unassigning Group...')
			const data = {
				group_uuid: group_uuid,
				unit_uuid: unit_uuid,
			}
			await apiRequest({
				method: 'DELETE',
				headers: { Authorization: userToken },
				path: `unit/group/assign`,
				data,
			})
			loadData()
			hideNetworkActivity()
			showAlert({
				title: 'Success',
				message: 'Group unassigned.',
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
					throw new Error(`${key} - ${message}`)
				}
			}
			hideNetworkActivity()
			showAlert({
				title: 'Error',
				message: 'Error attempting to unassign group.',
			})
			return
		}
	}

	showConfirm({
		title: 'Unassign Group',
		message: 'Are you sure you want to unassign this group?',
		leftTitle: 'Cancel',
		rightOnClick: removeGroup,
		rightTitle: 'Unassign Group',
	})
}
