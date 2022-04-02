import React from 'react'

import TETableLink from 'components/TETableLink'
import TETableButton from 'components/TETableButton'

type RemoveGroup = (uuid: string) => void
export const tableColumns = (removeGroup: RemoveGroup) => [
	{
		id: 'name',
		Header: 'Name',
		accessor: 'name',
	},
	{
		id: 'role',
		Header: 'Role',
		accessor: 'role',
	},
	{
		id: 'details',
		Header: '',
		width: 100,
		sortable: false,
		filterable: false,
		className: 'actionCell',
		accessor: 'uuid',
		Cell: (d: { value: string }) => (
			<>
				<TETableLink to={`/admin/group/${d.value}`}>Details</TETableLink>
				<TETableButton onClick={() => removeGroup(d.value)}>Unassign</TETableButton>
			</>
		),
	},
]
