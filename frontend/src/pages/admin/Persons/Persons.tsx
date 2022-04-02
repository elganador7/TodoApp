import React, { useState } from 'react'
import { TEPanelWrapper, TEPanel } from 'react-tec'

import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'

import { useBarTitle } from 'hooks'
import { SortedData } from 'interfaces'

//import AddPersonPopup from './AddPersonPopup'

import { usePersons } from './hooks'
import { tableColumns } from './tableColumns'

const defaultSort = {
	id: 'created_at',
	desc: false,
}
const Persons = () => {
	useBarTitle('Persons')

	const [addPersonPopupVisible, setAddPersonPopupVisible] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sorted, setSorted] = useState<SortedData | null>(defaultSort)
	const { personArray, personsLoaded, totalPages, loadData } = usePersons(currentPage, pageSize, sorted)

	return (
		<>
			<TEPanelWrapper>
				<TEPanel
					title='Persons'
					// rightComponent={
					// 	<TEPanelActionButton onClick={() => setAddPersonPopupVisible(true)}>
					// 		Add Person
					// 	</TEPanelActionButton>
					// }
				>
					<TEReactTable
						data={personArray}
						columns={tableColumns}
						defaultSorted={[defaultSort]}
						loading={!personsLoaded}
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
			{/* <AddPersonPopup
				visible={addPersonPopupVisible}
				onSubmit={() => setAddPersonPopupVisible(false)}
				onClose={() => setAddPersonPopupVisible(false)}
				loadData={loadData}
			/> */}
		</>
	)
}

export default Persons
