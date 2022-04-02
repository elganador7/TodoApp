import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
	TEErrorLoadingAlert,
	TEPanelWrapper,
	TEPanel,
	TEForm,
	TEInputRow,
	TEButton,
	useTEPopups,
} from 'react-tec'

import TEPanelActionButton from 'components/TEPanelActionButton'
import TEPanelActionWrapper from 'components/TEPanelActionWrapper'
import TEReactTable from 'components/TEReactTable'

import { useBarTitle, useAppContext } from 'hooks'
import { convertToDateShort } from 'helpers'

import { useCase } from './hooks'
import { saveCase, advanceCase } from './requests'
import { CaseModel } from 'interfaces'

// TODO: Clean up all these unused things.

interface Props extends RouteComponentProps <{ uid: string }> {}
const Case = (props: Props) => {
	const { match } = props
	const { uid } = match.params
    const popupFunctions = useTEPopups()
	useBarTitle('Case')
	const { userToken } = useAppContext()
    const [editingActive, setEditingActive] = useState(false)
    const [openCase, setOpenCase] = useState<CaseModel>()

    const {
		openCaseOrig,
		openCaseOrigLoaded,
		loadCase,
	} = useCase(uid)

	useEffect(() => {
		if(openCaseOrig) {
			setOpenCase(openCaseOrig)
		}
    }, [openCaseOrig])
    

    const handleSaveCase = async () => {
        try {
            const data = {
                openCase,
                userToken,
                popupFunctions,
            }
            await saveCase(data)
            setEditingActive(false)
            loadCase()
        } catch (e) {
            console.log(e)
        }
    }

	if (!openCase) {
		if (openCaseOrigLoaded) {
			return (
				<TEErrorLoadingAlert
					title='Error Loading'
					message='Error occured while loading Case Data.'
				/>
			)
		} else {
			return null //Still Loading
		}
	}
    // if (!editingActive) {
        return (
            <TEPanelWrapper>
                <TEPanel
                    title='Summary'
                    rightComponent={
                        <TEPanelActionWrapper>
                            <TEPanelActionButton onClick={() => setEditingActive(true)}>
                                Edit Case
                            </TEPanelActionButton>
                        </TEPanelActionWrapper>
                    }
                >
    				<TEReactTable
    					data={[openCase]}
    					columns={[
    						{
    							id: 'given_name',
    							Header: 'Given Name',
    							accessor: 'given_name',
    						},
    						{
    							id: 'created_at',
    							Header: 'Date Created',
    							accessor: 'created_at',
    							Cell: (d: any) => convertToDateShort(d.value),
    						},
    						{
    							id: 'ana_id',
    							Header: 'ANA ID',
    							accessor: 'ana_id',
    						},
    						{
    							id: 'unit',
    							Header: 'Unit ',
    							accessor: 'unit',
    						},
    						{
    							id: 'cell_number_1',
    							Header: 'Cell Number',
    							accessor: 'cell_number_1',
    						},
    					]}
    					sortable={false}
    					filterable={false}
    					showPagination={false}
    					defaultPageSize={1}
    				/>
    			</TEPanel>
    		</TEPanelWrapper>
    	)
    //}
}

export default Case
