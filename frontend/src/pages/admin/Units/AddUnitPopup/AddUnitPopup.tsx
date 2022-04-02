import React, { useState, ChangeEvent } from 'react'
import { TEPopupForm, TEInputRow, useTEPopups } from 'react-tec'

import TEPopupTitle from 'components/TEPopupTitle'

import { useAppContext } from 'hooks'

import { addUnit } from './requests'

interface Props {
	visible: boolean
	onSubmit(): void
	onClose(): void
	loadData(): void
}
const AddUnitPopup = (props: Props) => {
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
			await addUnit(data)
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
			<TEPopupTitle>Add Unit</TEPopupTitle>
			<TEInputRow
				labelForKey='name'
				title='Unit Name'
				value={name}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				required
			/>
			<TEInputRow
				labelForKey='poc'
				title='Unit POC'
				value={poc}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setPOC(e.target.value)}
				required
			/>
		</TEPopupForm>
	)
}

export default AddUnitPopup
