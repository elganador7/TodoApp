import { apiRequest } from 'helpers'
import { useTEPopupsFunctions } from 'react-tec'
import { MemberModel } from 'interfaces'

interface Data {
	uid: string
	member : MemberModel | undefined
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}

export const saveMember = async (data: Data) => {
	const {
		uid,
		member,
		userToken,
		popupFunctions,
	} = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	try {
		showNetworkActivity('Updating Member...')
		const data = {
			...member
		}
		await apiRequest({
			method: 'POST',
			headers: { Authorization: userToken },
			path: `member/${uid}`,
			data,
		})
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Member Updated.',
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

export const advanceMember = async (uid : string, userToken : string | undefined | null, popupFunctions: useTEPopupsFunctions) => {
    const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions
    try {
        showNetworkActivity('Advancing Member...')
        await apiRequest({
            method: 'POST',
            headers: { Authorization: userToken },
            path: `member/advance/${uid}`,
        })
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
