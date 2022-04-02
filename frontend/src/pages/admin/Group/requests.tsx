import validate from 'validate.js'
import { useTEPopupsFunctions } from 'react-tec'
import { apiRequest } from 'helpers'
import { UserModel, GroupModel } from 'interfaces'

interface Data {
	group : GroupModel | undefined
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const saveGroup = async (data: Data) => {
	const { group, userToken, popupFunctions } = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		group: {
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
		showNetworkActivity('Updating Group...')
		const data = {
			...group,
			relationships : {
				users: group? group.users : []
			}
		}
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: `group/${group ? group.uuid : ''}`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Group Updated.',
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

interface RemoveUserData {
	user_uuid: string
	guid: string
	userToken: string | null | undefined
	popupFunctions: useTEPopupsFunctions
	loadGroup(): void
}

export const confirmRemoveUser = (data: RemoveUserData) => {
	const { user_uuid, guid, userToken, popupFunctions, loadGroup } = data
	const {
		showNetworkActivity,
		hideNetworkActivity,
		showAlert,
		showConfirm,
		hideConfirm,
	} = popupFunctions

	const removeUser = async () => {
		try {
			hideConfirm()
			showNetworkActivity('Unassigning User...')
			const data = {
				group_uuid: guid,
				user_uuid: user_uuid,
			}
			await apiRequest({
				method: 'DELETE',
				headers: { Authorization: userToken },
				path: `group/user/assign`,
				data,
			})
			loadGroup()
			hideNetworkActivity()
			showAlert({
				title: 'Success',
				message: 'User unassigned.',
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
				message: 'Error attempting to unassign user.',
			})
			return
		}
	}

	showConfirm({
		title: 'Unassign User',
		message: 'Are you sure you want to unassign this user?',
		leftTitle: 'Cancel',
		rightOnClick: removeUser,
		rightTitle: 'Unassign User',
	})
}
