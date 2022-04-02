import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { PersonModel, SortedData } from 'interfaces'

export const usePersons = (currentPage: number, pageSize: number, sorted: SortedData | null) => {
	const { userToken } = useAppContext()

	const [personArray, setPersonArray] = useState<PersonModel[]>([])
	const [personsLoaded, setPersonsLoaded] = useState(false)
	const [totalPages, setTotalPages] = useState(1)

	const loadData = useCallback(() => {
		const loadData = async () => {
			try {
				const params: any = {}
				if (sorted) {
					params.order_by = { [sorted.id]: sorted.desc ? 'desc' : 'asc' }
				}
				const response: {
					data: { persons: PersonModel[]; Pages: number }
				} = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `persons/${currentPage}/${pageSize}`,
					params,
				})

				const { persons = [], Pages = 1 } = response && response.data
				setPersonArray(persons)
				setPersonsLoaded(true)
				setTotalPages(Pages)
			} catch (e) {
				console.log(e)
				setPersonArray([])
				setPersonsLoaded(true)
				setTotalPages(1)
			}
		}
		loadData()
	}, [userToken, currentPage, pageSize, sorted])

	useEffect(() => {
		loadData()
		return () => {
			setPersonsLoaded(false)
		}
	}, [userToken, currentPage, pageSize, loadData])

	return { personArray, personsLoaded, totalPages, loadData }
}
