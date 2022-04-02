import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
	TEErrorLoadingAlert,
	TEPanelWrapper,
	TEPanel,
	TEForm,
	TEInputRow,
    TELabel,
	TEButton,
	useTEPopups,
    TESearchSelectInput,
} from 'react-tec'

import TEReactTable from 'components/TEReactTable'

import { UserModel } from 'interfaces'

import { useBarTitle, useAppContext } from 'hooks'

import { useGroup } from './hooks'
import { saveGroup, confirmRemoveUser } from './requests'

import { tableColumnsUsers } from './tableColumnsUsers'

import { GroupModel } from 'interfaces'

// TODO: Clean up all these unused things.

interface Props extends RouteComponentProps<{ uid: string }> {}
const Group = (props: Props) => {
	const { match } = props
	const { uid } = match.params
    const popupFunctions = useTEPopups()
	const [editingActive, setEditingActive] = useState(false)
	useBarTitle('Group')
	const { userToken } = useAppContext()

    const [group, setGroup] = useState<GroupModel>()

	const {
		groupOrig,
		groupLoaded,
		loadGroup,
		userArray,
	} = useGroup(uid)

	useEffect(() => {
		if(groupOrig) {
			setGroup(groupOrig)
		}
	}, [groupOrig])

    const handleSaveGroup = async (e: FormEvent) => {
		try {
			e.preventDefault()
			const data = {
                popupFunctions,
                userToken,
				group,
				uid,
			}
			await saveGroup(data)
			loadGroup()
			setEditingActive(false)
		} catch (e) {
			console.log(e)
		}
	}


    const handleRemoveUser = (uuid : string, user_uuid : string) => {
        const data = {
        	user_uuid: user_uuid,
            guid: uuid,
            userToken,
            popupFunctions,
            loadGroup,
        }
        confirmRemoveUser(data)
    }

	if (!group) {
		if (groupLoaded) {
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
			<TEPanel title='Group'>
				<TEForm onSubmit={handleSaveGroup}>
					<TEInputRow
						labelForKey='name'
						title='Group Name'
						value={group.name}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setGroup({ ...group, name: e.target.value })
						}}
					/>
					<TEInputRow
						labelForKey='role'
						title='Group Role'
						value={group.role}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setGroup({ ...group, role: e.target.value })
						}}
					/>
                    <TELabel>Users Assigned</TELabel>
                    <TESearchSelectInput
						type='multi'
						title='Users Assigned'
						labelForKey='users'
						onChange={({ options }: { options: UserModel[] }) =>{
							setGroup({ ...group, users: options })
						}} 
						options={userArray}
						value={group.users}
						optionLabelPath='last_name'
					/>
					<TEButton type='submit'>Save Group</TEButton>
				</TEForm>
			</TEPanel>
            <TEPanel title='Users'>
				<TEReactTable
					data={group.users || []}
					columns={tableColumnsUsers(handleRemoveUser, uid)}
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

export default Group
