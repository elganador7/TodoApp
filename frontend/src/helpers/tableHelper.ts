export const customTableFilter = (filter: any, row: any) => {
	const id = filter.pivotId || filter.id
	const rowValue = row[id]

	if (rowValue !== null && (typeof rowValue === 'string' || typeof rowValue === 'number')) {
		return row[id] !== undefined
			? String(rowValue)
					.toLowerCase()
					.includes(filter.value.toLowerCase())
			: true
	}
}

export const filterDateColumn = (dateFormatFunction: any, filter: any, row: any) => {
	const id = filter.pivotId || filter.id
	const rowValue = row[id]

	if (rowValue) {
		const dateString = dateFormatFunction(rowValue)
		return dateString.toLowerCase().includes(filter.value.toLowerCase())
	}
}
