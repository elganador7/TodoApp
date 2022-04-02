import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { UserModel, GroupModel } from 'interfaces'

export const useUser = (uid: string) => {
	const { userToken } = useAppContext()
	const [user, setUser] = useState<UserModel | undefined>(undefined)
	const [userLoaded, setUserLoaded] = useState(false)
	const [groupArray, setGroupArray] = useState<GroupModel[]>([])

	const loadData = useCallback(() => {
		const loadData = async () => {
			console.log(uid)
			try {
				const response: any = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `user/${uid}`,
				})
				console.log(response && response.data)
				setUser(response && response.data)
				setUserLoaded(true)
			} catch (e) {
				console.log(e)
				setUser(undefined)
				setUserLoaded(true)
			}
		}
		loadData()
	}, [uid, userToken])

	useEffect(() => {
		loadData()

		return () => {
			setUser(undefined)
			setUserLoaded(false)
		}
	}, [uid, userToken, loadData])

	const loadGroups = useCallback(() => {
		const loadGroups = async () => {
			try {
				const response: { data: { groups: GroupModel[] } } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `groups_no_pages`,
				})
				console.log(response)
				const { groups = [] } = response && response.data
				setGroupArray(groups)
			} catch (e) {
				console.log(e)
				setGroupArray([])
			}
		}
		loadGroups()
	}, [userToken])

	useEffect(() => {
		loadGroups()
		return () => {
			setGroupArray([])
		}
	}, [userToken, loadGroups])

	return { user, userLoaded, loadData, groupArray }
}
