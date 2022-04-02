import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { CaseModel } from 'interfaces'

export const useCase = (uid: string) => {
	const { userToken } = useAppContext()

	const [openCaseOrig, setCase] = useState<CaseModel | undefined>(undefined)
	const [openCaseOrigLoaded, setCaseLoaded] = useState(false)

	const loadCase = useCallback(() => {
		const loadCase = async () => {
			try {
				const response: { data: CaseModel } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `case/${uid}`,
				})
				setCase(response && response.data)
				setCaseLoaded(true)
			} catch (e) {
				console.log(e)
				setCase(undefined)
				setCaseLoaded(true)
			}
		}
		loadCase()
	}, [uid, userToken])
	useEffect(() => {
		loadCase()

		return () => {
			setCase(undefined)
			setCaseLoaded(false)
		}
	}, [uid, userToken, loadCase])

	return { openCaseOrig, openCaseOrigLoaded, loadCase }
}
