import validate from 'validate.js'
import { useTEPopupsFunctions } from 'react-tec'

import { apiRequest } from 'helpers'
import { GroupModel } from 'interfaces'

interface Data {
	uid: string
	active: string
	group_admin: string
	write_privileges: string
	groups: GroupModel[]
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const saveUser = async (data: Data) => {
	const { uid, active, group_admin, write_privileges, groups, userToken, popupFunctions } = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		active: {
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
		showNetworkActivity('Updating User...')
		const data = {
			is_active: active === 'Yes',
			group_admin: group_admin === 'Yes',
			write_privileges: write_privileges === 'Yes',
			relationships: { groups },
		}
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: `user/${uid}`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'User Updated.',
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
	user_uuid: string
	guid: string
	userToken: string | null | undefined
	popupFunctions: useTEPopupsFunctions
	loadData(): void
}
export const confirmRemoveGroup = (data: RemoveGroupData) => {
	const { user_uuid, guid, userToken, popupFunctions, loadData } = data
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
				group_uuid: guid,
				user_uuid: user_uuid,
			}
			await apiRequest({
				method: 'DELETE',
				headers: { Authorization: userToken },
				path: `current_user/group/assign`,
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
