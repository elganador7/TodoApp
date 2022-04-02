import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel, useTEPopups } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle, useAppContext } from 'hooks'
import { SortedData } from 'interfaces'

import AddUserPopup from './AddUserPopup'

import { useUsers } from './hooks'
import { tableColumns } from './tableColumns'
import { deactivateUser } from './requests'

const defaultSort = {
	id: 'created_at',
	desc: false,
}
const Users = () => {
	useBarTitle('Users')
	const { userToken } = useAppContext()
	const popupFunctions = useTEPopups()
	const [addUserPopupVisible, setAddUserPopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
	const { userArray, usersLoaded, groupArray, totalPages, loadData } = useUsers(
		currentPage,
		pageSize,
		sorted
	)

	const handleDeactivateUser = (target_uid: string) => {
		const data = {
			uid: target_uid,
			userToken,
			popupFunctions,
		}
		deactivateUser(data)
		loadData()
	}

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Users'
					rightComponent={
						<TEPanelActionButton onClick={() => setAddUserPopupVisible(true)}>
							Add User
						</TEPanelActionButton>
					}
				>
					<TEReactTable
						data={userArray}
						columns={tableColumns(handleDeactivateUser)}
						defaultSorted={[defaultSort]}
						loading={!usersLoaded}
						loadData={loadData}
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
			<AddUserPopup
				visible={addUserPopupVisible}
				onSubmit={() => setAddUserPopupVisible(false)}
				onClose={() => setAddUserPopupVisible(false)}
				loadData={loadData}
				groupArray={groupArray}
			/>
		</>
	)
}

export default Users
