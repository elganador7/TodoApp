import { useEffect } from 'react'

import { useAppContext } from './useAppContext'

export const useBarTitle = (title = '', resetValue = '') => {
	const { setBarTitle } = useAppContext()
	useEffect(() => {
		setBarTitle(title)
		return () => {
			setBarTitle(resetValue)
		}
	}, [title, resetValue, setBarTitle])
}
