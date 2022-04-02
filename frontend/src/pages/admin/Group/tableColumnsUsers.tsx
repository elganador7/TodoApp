import React from 'react'

import TETableLink from 'components/TETableLink'
import TETableButton from 'components/TETableButton'

type RemoveUser = (uuid: string, user_uuid: string) => void
export const tableColumnsUsers = (removeUser: RemoveUser, groupUUID: string) => [
	{
		id: 'username',
		Header: 'Username',
		accessor: 'username',
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
				<TETableLink to={`/admin/user/${d.value}`}>Details</TETableLink>
				<TETableButton onClick={() => removeUser(groupUUID, d.value)}>Unassign</TETableButton>
			</>
		),
	},
]
