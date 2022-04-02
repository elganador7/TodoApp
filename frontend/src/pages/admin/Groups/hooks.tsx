import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { GroupModel, SortedData } from 'interfaces'

export const useGroups = (currentPage: number, pageSize: number, sorted: SortedData | null) => {
	const { userToken } = useAppContext()

	const [groupArray, setGroupArray] = useState<GroupModel[]>([])
	const [groupsLoaded, setGroupsLoaded] = useState(false)
	const [totalPages, setTotalPages] = useState(1)

	const loadData = useCallback(() => {
		const loadData = async () => {
			try {
				const params: any = {}
				if (sorted) {
					params.order_by = { [sorted.id]: sorted.desc ? 'desc' : 'asc' }
				}
				const response: {
					data: { groups: GroupModel[]; Pages: number }
				} = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `groups/${currentPage}/${pageSize}`,
					params,
				})

				const { groups = [], Pages = 1 } = response && response.data
				setGroupArray(groups)
				setGroupsLoaded(true)
				setTotalPages(Pages)
			} catch (e) {
				console.log(e)
				setGroupArray([])
				setGroupsLoaded(true)
				setTotalPages(1)
			}
		}
		loadData()
	}, [userToken, currentPage, pageSize, sorted])

	useEffect(() => {
		loadData()
		return () => {
			setGroupsLoaded(false)
		}
	}, [userToken, currentPage, pageSize, loadData])

	return { groupArray, groupsLoaded, totalPages, loadData }
}
