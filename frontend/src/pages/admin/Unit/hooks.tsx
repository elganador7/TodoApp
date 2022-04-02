import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { UnitModel, GroupModel } from 'interfaces'

export const useUnit = (uid: string) => {
	const { userToken } = useAppContext()

	const [unit, setUnit] = useState<UnitModel | undefined>(undefined)
	const [unitLoaded, setUnitLoaded] = useState(false)
    const [groupArray, setGroupArray] = useState<GroupModel[]>([])


	const loadData = useCallback(() => {
		const loadData = async () => {
			try {
				const response: { data: UnitModel } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `unit/${uid}`,
				})
				setUnit(response && response.data)
				setUnitLoaded(true)
			} catch (e) {
				console.log(e)
				setUnit(undefined)
				setUnitLoaded(true)
			}
		}
		loadData()
	}, [uid, userToken])

	useEffect(() => {
		loadData()

		return () => {
			setUnit(undefined)
			setUnitLoaded(false)
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

	return { unit, unitLoaded, loadData, groupArray }
}
