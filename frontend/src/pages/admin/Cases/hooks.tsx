import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { CaseModel, SortedData, FilteredData } from 'interfaces'

export const useCases = (currentPage: number, pageSize: number, sorted: SortedData | null, filtered: FilteredData[]) => {
	const { userToken } = useAppContext()

	const [caseArray, setCaseArray] = useState<CaseModel[]>([])
	const [casesLoaded, setCasesLoaded] = useState(false)
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
					data: { cases: CaseModel[]; Pages: number }
				} = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `mycases/${currentPage}/${pageSize}`,
					params,
				})

				const { cases = [], Pages = 1 } = response && response.data
				setCaseArray(cases)
				setCasesLoaded(true)
				setTotalPages(Pages)
			} catch (e) {
				console.log(e)
				setCaseArray([])
				setCasesLoaded(true)
				setTotalPages(1)
			}
		}
		loadData()
	}, [userToken, currentPage, pageSize, sorted])

	useEffect(() => {
		loadData()
		return () => {
			setCasesLoaded(false)
		}
	}, [userToken, currentPage, pageSize, loadData])

	return { caseArray, casesLoaded, totalPages, loadData }
}
