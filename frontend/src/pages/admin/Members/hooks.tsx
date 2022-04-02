import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { MemberModel, SortedData, FilteredData } from 'interfaces'

export const useMembers = (currentPage: number, pageSize: number, sorted: SortedData | null, filtered: FilteredData[],) => {
	const { userToken } = useAppContext()

	const [memberArray, setMemberArray] = useState<MemberModel[]>([])
	const [membersLoaded, setMembersLoaded] = useState(false)
	const [totalPages, setTotalPages] = useState(1)

	const loadData = useCallback(() => {
		const loadData = async () => {
			try {
				const params: any = {}
                if (filtered) {
                    var filter: { [id: string] : string } = {};
                    for (var i = 0; i < filtered.length; i++) {
                        filter[filtered[i].id] = filtered[i].value
                    }
                    params.filter = filter
                }
				if (sorted) {
					params.order_by = { [sorted.id]: sorted.desc ? 'desc' : 'asc' }
				}
				const response: {
					data: { members: MemberModel[]; Pages: number }
				} = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `members/${currentPage}/${pageSize}`,
					params,
				})

				const { members = [], Pages = 1 } = response && response.data
				setMemberArray(members)
				setMembersLoaded(true)
				setTotalPages(Pages)
			} catch (e) {
				console.log(e)
				setMemberArray([])
				setMembersLoaded(true)
				setTotalPages(1)
			}
		}
		loadData()
	}, [userToken, currentPage, pageSize, sorted, filtered])

	useEffect(() => {
		loadData()
		return () => {
			setMembersLoaded(false)
		}
	}, [userToken, currentPage, pageSize, loadData])

	return { memberArray, membersLoaded, totalPages, loadData }
}
