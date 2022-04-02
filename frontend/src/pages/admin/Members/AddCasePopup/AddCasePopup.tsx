import React, { useState, ChangeEvent } from 'react'
import { TEPopupForm, TEInputRow, useTEPopups } from 'react-tec'

import TEPopupTitle from 'components/TEPopupTitle'

import { useAppContext } from 'hooks'

import { addMember } from './requests'

interface Props {
	visible: boolean
	onSubmit(): void
	onClose(): void
	loadData(): void
}
const AddCasePopup = (props: Props) => {
	const { visible, onSubmit, onClose, loadData } = props

	const { userToken } = useAppContext()
	const popupFunctions = useTEPopups()
	const [name, setName] = useState('')
	const [poc, setPOC] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				name,
				poc,
				userToken,
				popupFunctions,
			}
			await addMember(data)
			onSubmit()
			setName('')
			setPOC('')
			loadData()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<TEPopupForm visible={visible} onClose={onClose} onSubmit={handleSubmit}>
			<TEPopupTitle>Add Member</TEPopupTitle>
			<TEInputRow
				labelForKey='name'
				title='Member Name'
				value={name}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				required
			/>
			<TEInputRow
				labelForKey='poc'
				title='Member POC'
				value={poc}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setPOC(e.target.value)}
				required
			/>
		</TEPopupForm>
	)
}

export default AddCasePopup
