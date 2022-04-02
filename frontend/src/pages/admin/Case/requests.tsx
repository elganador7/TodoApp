import { apiRequest } from 'helpers'
import { useTEPopupsFunctions } from 'react-tec'
import { CaseModel } from 'interfaces'

interface Data {
	openCase: CaseModel | undefined
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const saveCase = async (data: Data) => {
	const {
		openCase,
		userToken,
		popupFunctions,
	} = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	try {
		showNetworkActivity('Updating Case...')
		const data = {
			case : openCase
		}
		if (openCase) {
			await apiRequest({
				method: 'POST',
				headers: { Authorization: userToken },
				path: `case/${openCase.uuid}`,
				data,
			})
		}
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'Case Updated.',
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

export const advanceCase = async (uid : string, userToken : string | undefined | null, popupFunctions: useTEPopupsFunctions) => {
    const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions
    try {
        showNetworkActivity('Advancing Case...')
        await apiRequest({
            method: 'POST',
            headers: { Authorization: userToken },
            path: `case/advance/${uid}`,
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
