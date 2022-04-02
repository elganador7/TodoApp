import React, { useState, useEffect, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
	TEErrorLoadingAlert,
	TEPanelWrapper,
	TEPanel,
	TEForm,
	TEInputRow,
	TEButton,
	useTEPopups,
    TELabel,
    TESearchSelectInput,
} from 'react-tec'

import { tableColumnsGroups } from './tableColumnsGroups'

import TEReactTable from 'components/TEReactTable'
import { GroupModel } from 'interfaces'

import { useBarTitle, useAppContext } from 'hooks'

import { useUnit } from './hooks'
import { saveUnit, confirmRemoveGroup } from './requests'

interface Props extends RouteComponentProps<{ uid: string }> {}
const Unit = (props: Props) => {
	useBarTitle('Unit')
	const { match } = props
	const { uid } = match.params
	const popupFunctions = useTEPopups()
	const { userToken } = useAppContext()
	const [name, setName] = useState('')
	const [poc, setPOC] = useState('')
    const [groups, setGroups] = useState<GroupModel[]>([])
	const { unit, unitLoaded, loadData, groupArray } = useUnit(uid)

	useEffect(() => {
		if (unit) {
			const { name = '', poc = '', groups } = unit
			setName(name)
			setPOC(poc)
            setGroups(groups)
		}
	}, [unit])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = {
				uid,
				name,
				poc,
                groups,
				userToken,
				popupFunctions,
			}
			await saveUnit(data)
			loadData()
		} catch (e) {
			console.log(e)
		}
	}

    const handleRemoveGroup = (uuid : string, group_uuid : string) => {
        const data = {
            group_uuid: group_uuid,
            unit_uuid: uuid,
            userToken,
            popupFunctions,
            loadData,
        }
        confirmRemoveGroup(data)
    }

	if (!unit) {
		if (unitLoaded) {
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
			<TEPanel title='Unit'>
				<TEForm onSubmit={handleSubmit}>
					<TEInputRow
						labelForKey='name'
						title='Unit Name'
						value={name}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
					/>
					<TEInputRow
						labelForKey='poc'
						title='Unit POC'
						value={poc}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPOC(e.target.value)}
					/>
                    <TELabel>Groups Assigned</TELabel>
                    <TESearchSelectInput
                        type='multi'
                        title='Groups Assigned'
                        labelForKey='groups'
                        onChange={({ options }: { options: GroupModel[] }) => setGroups(options)}
                        options={groupArray}
                        value={groups}
                        optionLabelPath='name'
                    />
					<TEButton type='submit'>Save Unit</TEButton>
				</TEForm>
			</TEPanel>
            <TEPanel title='Groups'>
				<TEReactTable
					data={unit.groups || []}
					columns={tableColumnsGroups(handleRemoveGroup, uid)}
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

export default Unit
