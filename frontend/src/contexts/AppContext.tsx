import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { apiRequest } from 'helpers'
import { UserModel } from 'interfaces'


interface ContextProps {
	userSignedIn: boolean
	setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>
	userSignedInCheckComplete: boolean
	setUserSignedInCheckComplete: React.Dispatch<React.SetStateAction<boolean>>
	userToken: string | undefined | null
	setAndStoreUserToken: (token: string | undefined) => void
	userModel: UserModel | undefined
	setUserModel: React.Dispatch<React.SetStateAction<UserModel | undefined>>
	userModelLoaded: boolean
	setUserModelLoaded: React.Dispatch<React.SetStateAction<boolean>>
	sideNavActive: boolean
	setSideNavActive: React.Dispatch<React.SetStateAction<boolean>>
	barTitle: string
	userLang: string
	setUserLang: React.Dispatch<React.SetStateAction<string>>
	setBarTitle: React.Dispatch<React.SetStateAction<string>>
	signOutUser(): void
}
export const AppContext = createContext<ContextProps>({
	userSignedIn: false,
	setUserSignedIn: () => {},
	userSignedInCheckComplete: false,
	setUserSignedInCheckComplete: () => {},
	userToken: undefined,
	setAndStoreUserToken: () => {},
	userModel: undefined,
	setUserModel: () => {},
	userModelLoaded: false,
	setUserModelLoaded: () => {},
	sideNavActive: true,
	setSideNavActive: () => {},
	barTitle: '',
	userLang: 'en',
	setUserLang: () => {},
	setBarTitle: () => {},
	signOutUser: () => {},
})

export const AppProvider = (props: { children: ReactNode }) => {
	const [userSignedIn, setUserSignedIn] = useState(false)
	const [userSignedInCheckComplete, setUserSignedInCheckComplete] = useState(false)
	const [userToken, setUserToken] = useState()
	const [userModel, setUserModel] = useState<UserModel | undefined>()
	const [userModelLoaded, setUserModelLoaded] = useState(false)
	const [sideNavActive, setSideNavActive] = useState(true)
	const [barTitle, setBarTitle] = useState('')
	const [userLang, setUserLang] = useState("en")


	const setAndStoreUserToken = (token?: string | undefined | null) => {
		if (token) {
			localStorage.setItem('tc2-token', token)
		} else {
			localStorage.removeItem('tc2-token')
		}
		setUserToken(token)
	}

	useEffect(() => {
		const loadToken = async () => {
			try {
				const token = localStorage.getItem('tc2-token')

				if (token) {
					const userData = { token }
					const userResponse = await apiRequest({
						method: 'POST',
						path: 'user/session',
						data: userData,
					})
					if (userResponse && userResponse.data) {
						const userModel: UserModel = userResponse.data
						//Order Matters
						setAndStoreUserToken(token)
						setUserSignedIn(true)
						setUserSignedInCheckComplete(true)
						setUserModel(userModel)
						setUserModelLoaded(true)
						return
					}
				}
				//Order Matters
				setAndStoreUserToken(undefined)
				setUserSignedIn(false)
				setUserSignedInCheckComplete(true)
				setUserModel(undefined)
				setUserModelLoaded(false)
			} catch (e) {
				console.log(e)
				//Order Matters
				setAndStoreUserToken(undefined)
				setUserSignedIn(false)
				setUserSignedInCheckComplete(true)
				setUserModel(undefined)
				setUserModelLoaded(false)
			}
		}
		loadToken()
	}, [])

	const signOutUser = useCallback(() => {
		setAndStoreUserToken(undefined)
		setUserSignedIn(false)
		setUserSignedInCheckComplete(true)
		setUserModel(undefined)
		setUserModelLoaded(false)
	}, [])

	return (
		<AppContext.Provider
			value={{
				userSignedIn,
				setUserSignedIn,
				userSignedInCheckComplete,
				setUserSignedInCheckComplete,
				userToken,
				setAndStoreUserToken,
				userModel,
				setUserModel,
				userModelLoaded,
				userLang,
				setUserLang,
				setUserModelLoaded,
				sideNavActive,
				setSideNavActive,
				barTitle,
				setBarTitle,
				signOutUser,
			}}
		>
			{props.children}
		</AppContext.Provider>
	)
}
