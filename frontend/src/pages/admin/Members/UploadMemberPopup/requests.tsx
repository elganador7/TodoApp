import validate from 'validate.js'
import Papa from 'papaparse'

import { apiRequest } from 'helpers'
import { useTEPopupsFunctions } from 'react-tec'
import { MemberModel } from 'interfaces'

interface Data {
	file: File | undefined
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const uploadMemberFile = (data: Data) => {
	const { file, userToken, popupFunctions } = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	//Validate Data
	const validatorConstraints = {
		file: {
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

	if (!file) {
		throw new Error('No File')
	}
	return new Promise((res, rej) => {
		Papa.parse(file, {
			header: true,
			complete: async (response) => {
				const { data } = response

				try {
					showNetworkActivity('Adding Member...')
					const uploadData = {
						rows: data,
					}
					const response: { data: { members: MemberModel[] } } = await apiRequest({
						method: 'POST',
						headers: { Authorization: userToken },
						path: `upload`,
						data: uploadData,
					})
                    if (response.data.members.length > 0) {
                        var csv = Papa.unparse(response.data.members)
                        var hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = 'rejected_entries.csv';
                        hiddenElement.click();
                    }
            		hideNetworkActivity()
					showAlert({
						title: 'Success',
						message: 'File Uploaded.',
					})
					return res()
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
							return rej(`${key} - ${message}`)
						}
					}
					hideNetworkActivity()
					showAlert({
						title: 'Error',
						message: e.message,
					})
					return rej(e.message)
				}
			},
			error: (e) => {
				console.log(e)
				showAlert({
					title: 'Error',
					message: 'Error Parsing File',
				})
				return rej(e.message)
			},
		})
	})
}
