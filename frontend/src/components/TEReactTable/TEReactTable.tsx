import React from 'react'
import ReactTable from 'react-table'

import { customTableFilter } from 'helpers'

const TEReactTable = (props: any) => {
	return <ReactTable defaultFilterMethod={customTableFilter} {...props} />
}

TEReactTable.defaultProps = {
	defaultPageSize: 10,
}

export default TEReactTable
