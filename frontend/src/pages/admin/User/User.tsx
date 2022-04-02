import React, { useState, useEffect, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GroupModel } from 'interfaces'
import {
	TEErrorLoadingAlert,
	TEPanelWrapper,
	TEPanel,
	TEForm,
	TEInputRow,
    TELabel,
	TESegmentedGroup,
	TEButton,
	useTEPopups,
	TESearchSelectInput,
} from 'react-tec'

import { useBarTitle, useAppContext } from 'hooks'
import TEReactTable from 'components/TEReactTable'

import { useUser } from './hooks'
import { saveUser, confirmRemoveGroup } from './requests'

import { tableColumns } from './tableColumns'

interface Props
	extends RouteComponentProps<{
		uid: string
	}> {}

const User = (props: Props) => {
	const { match } = props
	const { uid } = match.params
	useBarTitle('User')

	const popupFunctions = useTEPopups()
	const { userToken } = useAppContext()
	const [active, setActive] = useState('')
	const [group_admin, setGroupAdmin] = useState('')
	const [write_privileges, setWritePrivileges] = useState('')
	const [groups, setGroups] = useState<GroupModel[]>([])
	const { user, userLoaded, loadData, groupArray } = useUser(uid)

	useEffect(() => {
		if (user) {
			const { is_active, group_admin, write_privileges, groups } = user
			setActive(is_active ? 'Yes' : 'No')
			setGroupAdmin(group_admin ? 'Yes' : 'No')
			setWritePrivileges(write_privileges ? 'Yes' : 'No')
			setGroups(groups)
		}
	}, [user])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				uid,
				active,
				group_admin,
				groups,
				write_privileges,
				userToken,
				popupFunctions,
			}
			await saveUser(data)
			loadData()
		} catch (e) {
			console.log(e)
		}
	}
	const handleRemoveGroup = (uuid: string) => {
		const data = {
			user_uuid: uid,
			guid: uuid,
			userToken,
			popupFunctions,
			loadData,
		}
		confirmRemoveGroup(data)
	}

	if (!user) {
		if (userLoaded) {
			return (
				<TEErrorLoadingAlert
					title='Error Loading'
					message='Error occured while loading Device Data.'
				/>
			)
		} else {
			return null //Still Loading
		}
	}

	return (
		<TEPanelWrapper>
			<TEPanel title='User'>
				<TEForm onSubmit={handleSubmit}>
					<TEInputRow
						labelForKey='username'
						title='Username'
						value={user.username}
						onChange={() => {}}
						disabled
					/>
					<TESegmentedGroup
						labelForKey='active'
						title='Account Active'
						checkedValue={active}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setActive(e.target.value)}
						buttonArray={['Yes', 'No']}
						required
						inline
					/>
					<TESegmentedGroup
						labelForKey='write_privileges'
						title='Write Privileges'
						checkedValue={write_privileges}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setWritePrivileges(e.target.value)
						}
						buttonArray={['Yes', 'No']}
						required
						inline
					/>
					<TESegmentedGroup
						labelForKey='group_admin'
						title='Group Admin'
						checkedValue={group_admin}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setGroupAdmin(e.target.value)
						}
						buttonArray={['Yes', 'No']}
						required
						inline
					/>
                    <TELabel>Units Assigned</TELabel>
                    <TESearchSelectInput
						type='multi'
						title='Groups'
						labelForKey='groups'
						onChange={({ options }: { options: GroupModel[] }) => setGroups(options)}
						options={groupArray}
						value={groups}
						optionLabelPath='name'
					/>
					<TEButton type='submit'>Save User</TEButton>
				</TEForm>
			</TEPanel>
			<TEPanel title='Groups'>
				<TEReactTable
					data={user.groups || []}
					columns={tableColumns(handleRemoveGroup)}
					filterable
					defaultSorted={[
						{
							id: 'dateCreated',
							desc: false,
						},
					]}
				/>
			</TEPanel>
		</TEPanelWrapper>
	)
}

export default User
