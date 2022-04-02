import React from 'react'

import TETableLink from 'components/TETableLink'

import { filterDateColumn, convertToDateShort } from 'helpers'
import TETableButton from 'components/TETableButton'

export const tableColumns = (createCase: (memberUuid: string) => void) => [
	{
		id: 'given_name',
		Header: 'Given Name',
		accessor: 'given_name',
	},
	{
		id: 'created_at',
		Header: 'Date Created',
		filterMethod: (filter: any, row: any) => filterDateColumn(convertToDateShort, filter, row),
		accessor: 'created_at',
		Cell: (d: any) => convertToDateShort(d.value),
	},
	{
		id: 'ana_id',
		Header: 'ANA ID',
		accessor: 'ana_id',
	},
	{
		id: 'unit',
		Header: 'Unit ',
		accessor: 'unit',
	},
	{
		id: 'cell_number_1',
		Header: 'Cell Number',
		accessor: 'cell_number_1',
	},
	{
		id: 'actions',
		Header: '',
		width: 100,
		sortable: false,
		filterable: false,
		className: 'actionCell',
		accessor: 'uuid',
		Cell: (d: any) => (
			<>
				<TETableButton
					onClick={() => {
						// You can also do stuff with d.original for other data. Log that and see. d.value here is the uuid of the object
						createCase(d.value)
					}}
				>
					Claim
				</TETableButton>
				<TETableLink to={`/admin/member_view/${d.value}`}>Details</TETableLink>
			</>
		),
	},
]
