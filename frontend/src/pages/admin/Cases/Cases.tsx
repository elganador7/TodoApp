import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle } from 'hooks'
import { SortedData, FilteredData } from 'interfaces'

import { useCases } from './hooks'
import { tableColumns } from './tableColumns'

const defaultSort = {
	id: 'created_at',
	desc: false,
}
const Cases = () => {
	useBarTitle('Cases')

	const [addCasePopupVisible, setAddCasePopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
    const [filtered, setFiltered] = useState<FilteredData[]>([])
    const { caseArray, casesLoaded, totalPages, loadData } = useCases(currentPage, pageSize, sorted, filtered)

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Cases'
				>
					<TEReactTable
						data={caseArray}
						columns={tableColumns}
						defaultSorted={[defaultSort]}
						loading={!casesLoaded}
                        manual
                        filterable
						pages={totalPages}
						onFetchData={(state: {
							page: number
							pageSize: number
							sorted: SortedData[]
                            filtered: FilteredData[]
						}) => {
							setCurrentPage(state.page + 1)
							setPageSize(state.pageSize)
							if (state.sorted.length > 0) {
								setSorted(state.sorted[0])
							} else {
								setSorted(null)
							}
                            setFiltered(state.filtered)
						}}
					/>
				</TEPanel>
			</TEPanelWrapper>
		</>
	)
}

export default Cases
