import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel, useTEPopups } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle, useAppContext } from 'hooks'
import { SortedData, FilteredData } from 'interfaces'

import AddMemberPopup from './AddMemberPopup'
import UploadMemberPopup from './UploadMemberPopup'

import { useMembers } from './hooks'
import { tableColumns } from './tableColumns'
import TEPanelActionWrapper from 'components/TEPanelActionWrapper'

import { createCase } from './requests'

const defaultSort = {
	id: 'created_at',
	desc: false,
}

const Members = () => {
	useBarTitle('Members')
	const { userToken } = useAppContext()
	const popupFunctions = useTEPopups()
	const [addMemberPopupVisible, setAddMemberPopupVisible] = useState(false)
	const [uploadMemberPopupVisible, setUploadMemberPopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
    const [filtered, setFiltered] = useState<FilteredData[]>([])

	const { memberArray, membersLoaded, totalPages, loadData } = useMembers(
		currentPage,
		pageSize,
		sorted,
        filtered,
	)

	const handleCreateCase = (target_uid: string) => {
		const data = {
			member_uid: target_uid,
			userToken,
			popupFunctions,
		}
		createCase(data)
		loadData()
	}

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Members'
					rightComponent={
						<TEPanelActionWrapper>
							<TEPanelActionButton onClick={() => setUploadMemberPopupVisible(true)}>
								Upload Member File
							</TEPanelActionButton>
							<TEPanelActionButton onClick={() => setAddMemberPopupVisible(true)}>
								Add Member
							</TEPanelActionButton>
						</TEPanelActionWrapper>
					}
				>
					<TEReactTable
						data={memberArray}
						columns={tableColumns(handleCreateCase)}
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
			<UploadMemberPopup
				visible={uploadMemberPopupVisible}
				onSubmit={() => setUploadMemberPopupVisible(false)}
				onClose={() => setUploadMemberPopupVisible(false)}
				loadData={loadData}
			/>
		</>
	)
}

export default Members
