import React from 'react'

import TETableLink from 'components/TETableLink'

import { filterDateColumn, convertToDateShort } from 'helpers'

export const tableColumns = [
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
		id: 'details',
		Header: '',
		width: 100,
		sortable: false,
		filterable: false,
		className: 'actionCell',
		accessor: 'uuid',
		Cell: (d: { value: string }) => (
			<TETableLink to={`/admin/member/${d.value}`}>Details</TETableLink>
		),
	},
]
