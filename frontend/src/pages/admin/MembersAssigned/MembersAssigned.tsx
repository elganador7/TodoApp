import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle } from 'hooks'
import { SortedData, FilteredData } from 'interfaces'

import AddMemberPopup from './AddMemberPopup'

import { useMembers } from './hooks'
import { tableColumns } from './tableColumns'

const defaultSort = {
	id: 'created_at',
	desc: false,
}
const MembersAssigned = () => {
	useBarTitle('Members')

	const [addMemberPopupVisible, setAddMemberPopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
    const [filtered, setFiltered] = useState<FilteredData[]>([])
    const { memberArray, membersLoaded, totalPages, loadData } = useMembers(currentPage, pageSize, sorted, filtered)

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Members'
					rightComponent={
						<TEPanelActionButton onClick={() => setAddMemberPopupVisible(true)}>
							Add Member
						</TEPanelActionButton>
					}
				>
					<TEReactTable
						data={memberArray}
						columns={tableColumns}
						defaultSorted={[defaultSort]}
						loading={!membersLoaded}
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
			<AddMemberPopup
				visible={addMemberPopupVisible}
				onSubmit={() => setAddMemberPopupVisible(false)}
				onClose={() => setAddMemberPopupVisible(false)}
				loadData={loadData}
			/>
		</>
	)
}

export default MembersAssigned
