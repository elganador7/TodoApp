import React, { useState, ChangeEvent } from 'react'
import {
	TEPopupForm,
	TEInputRow,
	useTEPopups,
	TESegmentedGroup,
	TESearchSelectInput,
} from 'react-tec'

import TEPopupTitle from 'components/TEPopupTitle'

import { useAppContext } from 'hooks'
import { GroupModel } from 'interfaces'
import { addUser } from './requests'

interface Props {
	visible: boolean
	onSubmit(): void
	onClose(): void
	loadData(): void
	groupArray: GroupModel[]
}
const AddUserPopup = (props: Props) => {
	const { visible, onSubmit, onClose, loadData, groupArray } = props

	const { userToken } = useAppContext()
	const popupFunctions = useTEPopups()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [active, setActive] = useState('')
	const [group_admin, setGroupAdmin] = useState('')
	const [groups, setGroups] = useState<GroupModel[]>([])
	const [write_privileges, setWritePrivileges] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				username,
				password,
				active,
				write_privileges,
				group_admin,
				groups,
				userToken,
				popupFunctions,
			}
			await addUser(data)
			onSubmit()
			setUsername('')
			setPassword('')
			setActive('')
			setGroupAdmin('')
			setGroups([])
			setWritePrivileges('')
			loadData()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<TEPopupForm visible={visible} onClose={onClose} onSubmit={handleSubmit}>
			<TEPopupTitle>Add User</TEPopupTitle>
			<TEInputRow
				labelForKey='username'
				title='Username'
				value={username}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
				required
			/>
			<TEInputRow
				type='password'
				labelForKey='password'
				title='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				required
			/>
			<TESegmentedGroup
				labelForKey='write_privileges'
				title='Write Privileges'
				checkedValue={write_privileges}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setWritePrivileges(e.target.value)}
				buttonArray={['Yes', 'No']}
				required
			/>
			<TESegmentedGroup
				labelForKey='group_admin'
				title='Group Admin'
				checkedValue={group_admin}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setGroupAdmin(e.target.value)}
				buttonArray={['Yes', 'No']}
				required
			/>
			<TESearchSelectInput
				type='multi'
				title='Groups'
				labelForKey='groups'
				onChange={({ options }: { options: GroupModel[] }) => setGroups(options)}
				options={groupArray}
				value={groups}
				optionLabelPath='name'
			/>
		</TEPopupForm>
	)
}

export default AddUserPopup
