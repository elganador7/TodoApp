import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { GroupModel, UserModel } from 'interfaces'

export const useGroup = (uid: string) => {
	const { userToken } = useAppContext()

	const [groupOrig, setGroupOrig] = useState<GroupModel | undefined>(undefined)
	const [groupLoaded, setGroupLoaded] = useState(false)
    const [userArray, setUserArray] = useState<UserModel[]>([])
    const [usersLoaded, setUsersLoaded] = useState(false)

	const loadGroup = useCallback(() => {
		const loadGroup = async () => {
			try {
				const response: { data: GroupModel } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `group/${uid}`,
				})
				setGroupOrig(response && response.data)
				setGroupLoaded(true)
			} catch (e) {
				console.log(e)
				setGroupOrig(undefined)
				setGroupLoaded(true)
			}
		}
		loadGroup()
	}, [uid, userToken])
	useEffect(() => {
		loadGroup()

		return () => {
			setGroupOrig(undefined)
			setGroupLoaded(false)
		}
	}, [uid, userToken, loadGroup])

    const loadUsers = useCallback(() => {
        const loadUsers = async () => {
            try {
                const response: { data: { users: UserModel[] } } = await apiRequest({
                    method: 'GET',
                    headers: { Authorization: userToken },
                    path: `users_no_pages`,
                })

                const { users = [] } = response && response.data
                setUserArray(users)
                setUsersLoaded(true)
            } catch (e) {
                console.log(e)
                setUserArray([])
                setUsersLoaded(true)
            }
        }
        loadUsers()
    }, [userToken])

    useEffect(() => {
        loadUsers()
        return () => {
            setUserArray([])
        }
    }, [userToken, loadUsers])

	return { groupOrig, groupLoaded, userArray, usersLoaded, loadGroup }
}
