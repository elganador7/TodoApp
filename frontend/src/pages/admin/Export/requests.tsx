import { useTEPopupsFunctions } from 'react-tec'
import { apiRequest } from 'helpers'
import { MemberModel } from 'interfaces'

import Papa from 'papaparse'

interface Data {
    userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}

export const getCSV = async (data: Data) => {
    const { userToken, popupFunctions } = data
    const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	try {
		showNetworkActivity('Creating CSV...')
		const response: { data: { members: MemberModel[] } } = await apiRequest({
			method: 'GET',
			headers: { Authorization: userToken },
			path: `members_no_pages`,
		})
        console.log(response.data.members)
        var csv = Papa.unparse(response.data.members)
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'members.csv';
        hiddenElement.click();
		hideNetworkActivity()
		showAlert({
			title: 'Success',
			message: 'CSV Downloaded',
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
