import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { UnitModel, SortedData } from 'interfaces'

export const useUnits = (currentPage: number, pageSize: number, sorted: SortedData | null) => {
	const { userToken } = useAppContext()

	const [unitArray, setUnitArray] = useState<UnitModel[]>([])
	const [unitsLoaded, setUnitsLoaded] = useState(false)
	const [totalPages, setTotalPages] = useState(1)

	const loadData = useCallback(() => {
		const loadData = async () => {
			try {
				const params: any = {}
				if (sorted) {
					params.order_by = { [sorted.id]: sorted.desc ? 'desc' : 'asc' }
				}
				const response: { data: { units: UnitModel[]; Pages: number } } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `units/${currentPage}/${pageSize}`,
					params,
				})

				const { units = [], Pages = 1 } = response && response.data
				setUnitArray(units)
				setUnitsLoaded(true)
				setTotalPages(Pages)
			} catch (e) {
				console.log(e)
				setUnitArray([])
				setUnitsLoaded(true)
				setTotalPages(1)
			}
		}
		loadData()
	}, [userToken, currentPage, pageSize, sorted])

	useEffect(() => {
		loadData()
		return () => {
			setUnitsLoaded(false)
		}
	}, [userToken, currentPage, pageSize, loadData])

	return { unitArray, unitsLoaded, totalPages, loadData }
}
