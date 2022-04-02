import React from 'react'
import validate from 'validate.js'
import { RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { useTEPopupsFunctions } from 'react-tec'

import settings from 'config/settings'
import { UserModel } from 'interfaces'

interface SignInData {
	username: string
	password: string
	history: RouteComponentProps['history']
	popupFunctions: useTEPopupsFunctions
	setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>
	setAndStoreUserToken: (token: string | undefined) => void
	setUserModel: React.Dispatch<React.SetStateAction<UserModel | undefined>>
	setUserModelLoaded: React.Dispatch<React.SetStateAction<boolean>>
}
export const signInUser = async (data: SignInData) => {
	const {
		username,
		password,
		history,
		popupFunctions,
		setUserSignedIn,
		setAndStoreUserToken,
		setUserModel,
		setUserModelLoaded,
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
		return
	}

	try {
		showNetworkActivity('Signing In...')

		const loginData = { username, password }
		const loginResponse = await axios.post(`${settings.API_BASE_URL}/user/token`, loginData)

		const { token } = loginResponse.data
		setAndStoreUserToken(token)
		setUserSignedIn(true)

		const userData = { token }
		const userResponse = await axios.post(`${settings.API_BASE_URL}/user/session`, userData)
		const userModel: UserModel = userResponse.data
		setUserModel(userModel)
		setUserModelLoaded(true)
		history.push('/admin/persons')

		hideNetworkActivity()
	} catch (e) {
		console.error(e)
		hideNetworkActivity()
		setAndStoreUserToken(undefined)
		setUserSignedIn(false)
		setUserModel(undefined)
		setUserModelLoaded(false)
		showAlert({
			title: 'Error Signing In',
			message: 'Unable to sign in. Review your username and password and try again.',
		})
		return
	}
}
