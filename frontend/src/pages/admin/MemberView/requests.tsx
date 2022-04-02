import { apiRequest } from 'helpers'
import { useTEPopupsFunctions } from 'react-tec'

interface Data {
	uid: string
	roster_num: string
	given_name: string
	status: string
	duty_status: string
	date_of_birth: string
	rank: string
	duty_position: string
	coy: string
	ana_id: string
	taskera: string
	bid: string
	fathers_name: string
	ethnicity: string
	home_province: string
	home_district: string
	home_village: string
	birth_province: string
	birth_district: string
	birth_village: string
	cell_number_1: string
	cn1_date_reported: string
	cell_number_2: string
	cn2_date_reported: string
	social_media_account1: string
	social_media_account2: string
	ahmrs: string
	sofex_case_number: string
	date_last_enrolled: string
	date_screened: string
	recommend: string
	revetting_date: string
	actions_taken: string
	userToken: string | undefined | null
	popupFunctions: useTEPopupsFunctions
}
export const saveMember = async (data: Data) => {
	const {
		uid,
		roster_num,
		given_name,
		status,
		duty_status,
		date_of_birth,
		rank,
		duty_position,
		coy,
		ana_id,
		taskera,
		bid,
		fathers_name,
		ethnicity,
		home_province,
		home_district,
		home_village,
		birth_province,
		birth_district,
		birth_village,
		cell_number_1,
		cn1_date_reported,
		cell_number_2,
		cn2_date_reported,
		social_media_account1,
		social_media_account2,
		ahmrs,
		sofex_case_number,
		date_last_enrolled,
		date_screened,
		recommend,
		revetting_date,
		actions_taken,
		userToken,
		popupFunctions,
	} = data
	const { showAlert, showNetworkActivity, hideNetworkActivity } = popupFunctions

	try {
		showNetworkActivity('Updating Member...')
		const data = {
			roster_num,
			given_name,
			status,
			duty_status,
			date_of_birth,
			rank,
			duty_position,
			coy,
			ana_id,
			taskera,
			bid,
			fathers_name,
			ethnicity,
			home_province,
			home_district,
			home_village,
			birth_province,
			birth_district,
			birth_village,
			cell_number_1,
			cn1_date_reported,
			cell_number_2,
			cn2_date_reported,
			social_media_account1,
			social_media_account2,
			ahmrs,
			sofex_case_number,
			date_last_enrolled,
			date_screened,
			recommend,
			revetting_date,
			actions_taken,
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
