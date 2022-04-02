import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { UserModel, SortedData, GroupModel } from 'interfaces'

export const useUsers = (currentPage: number, pageSize: number, sorted: SortedData | null) => {
	const { userToken } = useAppContext()
	const [groupArray, setGroupArray] = useState<GroupModel[]>([])
	const [groupsLoaded, setGroupsLoaded] = useState(false)
	const [userArray, setUserArray] = useState<UserModel[]>([])
	const [usersLoaded, setUsersLoaded] = useState(false)
	const [totalPages, setTotalPages] = useState(1)

	const loadData = useCallback(() => {
		const loadData = async () => {
			try {
				const params: any = {}
				if (sorted) {
					params.order_by = { [sorted.id]: sorted.desc ? 'desc' : 'asc' }
				}
				const response: { data: { users: UserModel[]; Pages: number } } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `users/${currentPage}/${pageSize}`,
					params,
				})

				const { users = [], Pages = 1 } = response && response.data
				setUserArray(users)
				setUsersLoaded(true)
				setTotalPages(Pages)
			} catch (e) {
				console.log(e)
				setUserArray([])
				setUsersLoaded(true)
				setTotalPages(1)
			}
		}
		loadData()
	}, [userToken, currentPage, pageSize, sorted])

	useEffect(() => {
		loadData()
		return () => {
			setUsersLoaded(false)
		}
	}, [userToken, currentPage, pageSize, loadData])

	const loadGroups = useCallback(() => {
		const loadGroups = async () => {
			try {
				const response: { data: { groups: GroupModel[] } } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `groups_no_pages`,
				})

				const { groups = [] } = response && response.data
				setGroupArray(groups)
				setGroupsLoaded(true)
			} catch (e) {
				console.log(e)
				setGroupArray([])
				setGroupsLoaded(true)
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

	return { userArray, groupArray, usersLoaded, groupsLoaded, totalPages, loadData }
}
