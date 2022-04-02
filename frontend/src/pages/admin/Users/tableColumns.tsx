import React from 'react'

import TETableLink from 'components/TETableLink'

import { filterDateColumn, convertToDateShort } from 'helpers'
import TETableButton from 'components/TETableButton'

export const tableColumns = (selectedUserForDeactivation: (userData: string) => void) => [
	{
		id: 'username',
		Header: 'Username',
		accessor: 'username',
	},
	{
		id: 'created_at',
		Header: 'Date Created',
		filterMethod: (filter: any, row: any) => filterDateColumn(convertToDateShort, filter, row),
		accessor: 'created_at',
		Cell: (d: any) => convertToDateShort(d.value),
	},
	{
		id: 'is_active',
		Header: 'Account Active',
		accessor: (d: any) => (d.is_active ? 'Yes' : 'No'),
	},
	{
		id: 'details',
		Header: '',
		width: 100,
		sortable: false,
		filterable: false,
		className: 'actionCell',
		accessor: 'uuid',
		Cell: (d: any) => (
			<>
				<TETableLink to={`/admin/user/${d.value}`}>Details</TETableLink>
				<TETableButton
					onClick={() => {
						// You can also do stuff with d.original for other data. Log that and see. d.value here is the uuid of the object
						selectedUserForDeactivation(d.value)
					}}
				>
					Deactivate
				</TETableButton>
			</>
		),
	},
]
