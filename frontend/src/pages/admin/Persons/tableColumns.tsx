import React from 'react'

import TETableLink from 'components/TETableLink'

import { filterDateColumn, convertToDateShort } from 'helpers'

export const tableColumns = [
	{
		id: 'created_at',
		Header: 'Date Created',
		filterMethod: (filter: any, row: any) => filterDateColumn(convertToDateShort, filter, row),
		accessor: 'created_at',
		Cell: (d: any) => convertToDateShort(d.value),
	},
	{
		id: 'name',
		Header: 'Name',
		accessor: 'name',
	},
	{
		id: 'phone_number',
		Header: 'Phone Number',
		accessor: 'phone_number',
	},
	{
		id: 'latitude',
		Header: 'Latitude',
		accessor: 'latitude',
	},
	{
		id: 'longitude',
		Header: 'Longitude',
		accessor: 'longitude',
	},


]
