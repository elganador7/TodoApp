import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle } from 'hooks'
import { SortedData } from 'interfaces'

import AddGroupPopup from './AddGroupPopup'

import { useGroups } from './hooks'
import { tableColumns } from './tableColumns'

const defaultSort = {
	id: 'created_at',
	desc: false,
}
const Groups = () => {
	useBarTitle('Groups')

	const [addGroupPopupVisible, setAddGroupPopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
	const { groupArray, groupsLoaded, totalPages, loadData } = useGroups(currentPage, pageSize, sorted)

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Groups'
					rightComponent={
						<TEPanelActionButton onClick={() => setAddGroupPopupVisible(true)}>
							Add Group
						</TEPanelActionButton>
					}
				>
					<TEReactTable
						data={groupArray}
						columns={tableColumns}
						defaultSorted={[defaultSort]}
						loading={!groupsLoaded}
                        manual
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
			<AddGroupPopup
				visible={addGroupPopupVisible}
				onSubmit={() => setAddGroupPopupVisible(false)}
				onClose={() => setAddGroupPopupVisible(false)}
				loadData={loadData}
			/>
		</>
	)
}

export default Groups
