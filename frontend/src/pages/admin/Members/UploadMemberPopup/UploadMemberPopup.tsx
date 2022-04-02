import React, { useState } from 'react'
import { TEPopupForm, TEFileRow, useTEPopups } from 'react-tec'

import TEPopupTitle from 'components/TEPopupTitle'

import { useAppContext } from 'hooks'

import { uploadMemberFile } from './requests'
import TEPopupSubtitle from 'components/TEPopupSubtitle/TEPopupSubtitle'

const exampleFile = require('./../../../../assets/files/example_csv_pm.csv')

interface Props {
	visible: boolean
	onSubmit(): void
	onClose(): void
	loadData(): void
}
const UploadMemberPopup = (props: Props) => {
	const { visible, onSubmit, onClose, loadData } = props

	const { userToken } = useAppContext()
	const popupFunctions = useTEPopups()
	const [file, setFile] = useState<File | undefined>()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				file,
				userToken,
				popupFunctions,
			}
			await uploadMemberFile(data)
			onSubmit()
			setFile(undefined)
			loadData()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<TEPopupForm visible={visible} onClose={onClose} onSubmit={handleSubmit}>
			<TEPopupTitle>Upload Members File</TEPopupTitle>
			<TEPopupSubtitle>
				The file should match this format.{' '}
				<a href={exampleFile} download>
					Example File
				</a>
			</TEPopupSubtitle>
			<TEFileRow
				labelForKey='name'
				title='Members File (.csv)'
				onChange={(files: FileList) => {
					console.log(files)
					if (files && files.length > 0) {
						setFile(files[0])
					}
				}}
				accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
				required
			/>
		</TEPopupForm>
	)
}

export default UploadMemberPopup
