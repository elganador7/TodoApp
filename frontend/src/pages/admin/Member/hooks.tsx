import { useState, useEffect, useCallback } from 'react'

import { apiRequest } from 'helpers'
import { useAppContext } from 'hooks'
import { MemberModel } from 'interfaces'

export const useMember = (uid: string) => {
	const { userToken } = useAppContext()

	const [member, setMember] = useState<MemberModel | undefined>(undefined)
	const [memberLoaded, setMemberLoaded] = useState(false)

	const loadMember = useCallback(() => {
		const loadMember = async () => {
			try {
				const response: { data: MemberModel } = await apiRequest({
					method: 'GET',
					headers: { Authorization: userToken },
					path: `member/${uid}`,
				})
				setMember(response && response.data)
				setMemberLoaded(true)
			} catch (e) {
				console.log(e)
				setMember(undefined)
				setMemberLoaded(true)
			}
		}
		loadMember()
	}, [uid, userToken])
	useEffect(() => {
		loadMember()

		return () => {
			setMember(undefined)
			setMemberLoaded(false)
		}
	}, [uid, userToken, loadMember])

	return { memberOrig: member, memberLoaded, loadMember }
}
