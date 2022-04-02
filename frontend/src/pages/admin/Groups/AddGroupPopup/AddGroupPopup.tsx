import React, { useState, ChangeEvent } from 'react'
import { TEPopupForm, TEInputRow, useTEPopups } from 'react-tec'

import TEPopupTitle from 'components/TEPopupTitle'

import { useAppContext } from 'hooks'

import { addGroup } from './requests'

interface Props {
	visible: boolean
	onSubmit(): void
	onClose(): void
	loadData(): void
}
const AddGroupPopup = (props: Props) => {
	const { visible, onSubmit, onClose, loadData } = props

	const { userToken } = useAppContext()
	const popupFunctions = useTEPopups()
	const [name, setName] = useState('')
	const [role, setRole] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				name,
				role,
				userToken,
				popupFunctions,
			}
			await addGroup(data)
			onSubmit()
			setName('')
			setRole('')
			loadData()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<TEPopupForm visible={visible} onClose={onClose} onSubmit={handleSubmit}>
			<TEPopupTitle>Add Group</TEPopupTitle>
			<TEInputRow
				labelForKey='name'
				title='Group Name'
				value={name}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				required
			/>
			<TEInputRow
				labelForKey='role'
				title='Group Role'
				value={role}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
				required
			/>
		</TEPopupForm>
	)
}

export default AddGroupPopup
