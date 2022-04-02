import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle } from 'hooks'
import { SortedData } from 'interfaces'

import AddUnitPopup from './AddUnitPopup'

import { useUnits } from './hooks'
import { tableColumns } from './tableColumns'

const defaultSort = {
	id: 'created_at',
	desc: false,
}
const Units = () => {
	useBarTitle('Units')

	const [addUnitPopupVisible, setAddUnitPopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
	const { unitArray, unitsLoaded, totalPages, loadData } = useUnits(currentPage, pageSize, sorted)

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Units'
					rightComponent={
						<TEPanelActionButton onClick={() => setAddUnitPopupVisible(true)}>
							Add Unit
						</TEPanelActionButton>
					}
				>
					<TEReactTable
						data={unitArray}
						columns={tableColumns}
						defaultSorted={[defaultSort]}
						loading={!unitsLoaded}
                        filterable
						pages={totalPages}
						onFetchData={(state: {
							page: number
							pageSize: number
							sorted: SortedData[]
						}) => {
							setCurrentPage(state.page + 1)
							setPageSize(state.pageSize)
							if (state.sorted.length > 0) {
								setSorted(state.sorted[0])
							} else {
								setSorted(null)
							}
						}}
					/>
				</TEPanel>
			</TEPanelWrapper>
			<AddUnitPopup
				visible={addUnitPopupVisible}
				onSubmit={() => setAddUnitPopupVisible(false)}
				onClose={() => setAddUnitPopupVisible(false)}
				loadData={loadData}
			/>
		</>
	)
}

export default Units
