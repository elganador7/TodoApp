import React from 'react'

import TETableLink from 'components/TETableLink'

import { filterDateColumn, convertToDateShort } from 'helpers'

export const tableColumns = [
	{
		id: 'name',
		Header: 'Unit Name',
		accessor: 'name',
	},
	{
		id: 'created_at',
		Header: 'Date Created',
		filterMethod: (filter: any, row: any) => filterDateColumn(convertToDateShort, filter, row),
		accessor: 'created_at',
		Cell: (d: any) => convertToDateShort(d.value),
	},
	{
		id: 'poc',
		Header: 'Unit POC',
		accessor: 'poc',
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
			<TETableLink to={`/admin/unit/${d.value}`}>Details</TETableLink>
		),
	},
]
