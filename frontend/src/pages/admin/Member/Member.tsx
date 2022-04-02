import React, { useState, useEffect, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
	TEErrorLoadingAlert,
	TEPanelWrapper,
	TEPanel,
	TEInputRow,
	useTEPopups,
} from 'react-tec'

import TEPanelActionButton from 'components/TEPanelActionButton'
import TEPanelActionWrapper from 'components/TEPanelActionWrapper'
import TEReactTable from 'components/TEReactTable'

import { useBarTitle, useAppContext } from 'hooks'
import { convertToDateShort } from 'helpers'

import { useMember } from './hooks'
import { saveMember, advanceMember } from './requests'
import { MemberModel } from 'interfaces'

// TODO: Clean up all these unused things.

interface Props extends RouteComponentProps<{ uid: string }> {}
const Member = (props: Props) => {
	const { match } = props
	const { uid } = match.params
    const popupFunctions = useTEPopups()
	useBarTitle('Member')
	const { userToken } = useAppContext()
    const [editingActive, setEditingActive] = useState(false)
    const [member, setMember] = useState<MemberModel>()

    const {
		memberOrig,
		memberLoaded,
		loadMember,
	} = useMember(uid)

	useEffect(() => {
		if(memberOrig) {
			setMember(memberOrig)
		}
    }, [memberOrig])
    
    const handleSaveMember = async () => {
        try {
            const data = {
                uid,
                member,
                userToken,
                popupFunctions,
            }
            await saveMember(data)
            setEditingActive(false)
            loadMember()
        } catch (e) {
            console.log(e)
        }
    }

    const handleAdvanceMember = async () => {
        try {
            const data = {
                uid,
                member,
                userToken,
                popupFunctions,
            }
            await saveMember(data)
            setEditingActive(false)
            await advanceMember(uid, userToken, popupFunctions)
            loadMember()
        } catch (e) {
            console.log(e)
        }
    }

	if (!member) {
		if (memberLoaded) {
			return (
				<TEErrorLoadingAlert
					title='Error Loading'
					message='Error occured while loading Member Data.'
				/>
			)
		} else {
			return null //Still Loading
		}
	}
    if (!editingActive) {
        return (
            <TEPanelWrapper>
                <TEPanel
                    title='Summary'
                    rightComponent={
                        <TEPanelActionWrapper>
                            <TEPanelActionButton onClick={() => setEditingActive(true)}>
                                Edit Member
                            </TEPanelActionButton>
                        </TEPanelActionWrapper>
                    }
                >
    				<TEReactTable
    					data={[member]}
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
    			<TEPanel title='Basic Information' subtitle='Current Status' size='half'>
    				<p>Name: {member.given_name}</p>
    				<p>Rank: {member.rank}</p>
    				<p>Status: {member.status}</p>
    				<p>Duty Status: {member.duty_status}</p>
    				<p>Duty Position: {member.duty_position}</p>
    			</TEPanel>
    			<TEPanel title='Identifiers' subtitle='Cross-referencing Info' size='half'>
    				<p>ANA ID Number: {member.ana_id}</p>
    				<p>Taskera Number: {member.taskera}</p>
    				<p>SOFEX Case Number: {member.sofex_case_number}</p>
    				<p>BID: {member.bid}</p>
    				<p>AHMRS: {member.ahmrs}</p>
    			</TEPanel>
    			<TEPanel title='Admin Info' subtitle='Personnel Tracking' size='half'>
    				<p>Date Last Enrolled: {member.date_last_enrolled}</p>
    				<p>Unit: {member.unit}</p>
    				<p>Revetting Date: {member.revetting_date}</p>
    				<p>Date Last Enrolled: {member.date_last_enrolled}</p>
    			</TEPanel>
    			<TEPanel title='Digital Footprint' subtitle='Intel Correlation' size='half'>
    				<p>Primary Cell Number: {member.cell_number_1}</p>
    				<p>Secondary Cell Number: {member.cell_number_2}</p>
    				<p>Primary Social Media Account: {member.social_media_account1}</p>
    				<p>Secondary Social Media Account: {member.social_media_account2}</p>
    			</TEPanel>
    			<TEPanel title='Notes and Recommendations' subtitle='Cross-referencing Info'>
    				<p>Actions Taken: </p>
    				<p>Recommendations: {member.recommend}</p>
    			</TEPanel>
    			<TEPanel title='Derogatory Reporting' subtitle='Cross-referencing Info'>
    				<p>Tier 1 Connections:</p>
    				<p>Tier 2 Connections:</p>
    				<p>Familial Connections:</p>
    			</TEPanel>
    		</TEPanelWrapper>
    	)
    }
    else {
    	return (
    		<TEPanelWrapper>
                <TEPanel
                    title='Summary'
                    rightComponent={
                        <TEPanelActionWrapper>
                            <TEPanelActionButton onClick={() => handleAdvanceMember()}>
                                Advance Member to Next Step
                            </TEPanelActionButton>
                            <TEPanelActionButton onClick={() => handleSaveMember()}>
                                Save Member
                            </TEPanelActionButton>
                        </TEPanelActionWrapper>
                    }
                >
    				<TEReactTable
    					data={[member]}
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
    			<TEPanel title='Basic Information' subtitle='Current Status' size='half'>
                    <TEInputRow
                        labelForKey='given_name'
                        title='Given Name'
                        value={member.given_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, given_name: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='rank'
                        title='Rank'
                        value={member.rank}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, rank: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='status'
                        title='Status'
                        value={member.status}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, status: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='duty_status'
                        title='Duty Status'
                        value={member.duty_status}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, duty_status: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='duty_position'
                        title='Duty Position'
                        value={member.duty_position}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, duty_position: e.target.value })
								}}
                    />
    			</TEPanel>
    			<TEPanel title='Identifiers' subtitle='Cross-referencing Info' size='half'>
                    <TEInputRow
                        labelForKey='ana_id'
                        title='ANA ID'
                        value={member.ana_id}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, ana_id: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='taskera'
                        title='Taskera'
                        value={member.taskera}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, taskera: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='sofex_case_number'
                        title='SOFEX Case Number'
                        value={member.sofex_case_number}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, sofex_case_number: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='bid'
                        title='BID'
                        value={member.bid}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, bid: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='ahmrs'
                        title='AHMRS'
                        value={member.ahmrs}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, ahmrs: e.target.value })
								}}
                    />
    			</TEPanel>
    			<TEPanel title='Admin Info' subtitle='Personnel Tracking' size='half'>
                    <TEInputRow
                        labelForKey='date_last_enrolled'
                        title='Date Last Enrolled'
                        value={member.date_last_enrolled}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, date_last_enrolled: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='unit'
                        title='Unit'
                        value={member.unit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, unit: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='revetting_date'
                        title='Revetting Date'
                        value={member.revetting_date}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, revetting_date: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='date_last_enrolled'
                        title='Date Last Enrolled'
                        value={member.date_last_enrolled}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, date_last_enrolled: e.target.value })
								}}
                    />
    			</TEPanel>
    			<TEPanel title='Digital Footprint' subtitle='Intel Correlation' size='half'>
                    <TEInputRow
                        labelForKey='cell_number_1'
                        title='Cell Number 1'
                        value={member.cell_number_1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, cell_number_1: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='cell_number_2'
                        title='Cell Number 2'
                        value={member.cell_number_2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, cell_number_2: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='social_media_account1'
                        title='Social Media Account 1'
                        value={member.social_media_account1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, social_media_account1: e.target.value })
								}}
                    />
                    <TEInputRow
                        labelForKey='social_media_account2'
                        title='Social Media Account 2'
                        value={member.social_media_account2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, social_media_account2: e.target.value })
								}}
                    />
    			</TEPanel>
    			<TEPanel title='Notes and Recommendations' subtitle='Cross-referencing Info'>
    				<p>Actions Taken: </p>
                    <TEInputRow
                        labelForKey='recommend'
                        title='Recommendation'
                        value={member.recommend}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setMember({ ...member, recommend: e.target.value })
								}}
                    />
    			</TEPanel>
    			<TEPanel title='Derogatory Reporting' subtitle='Cross-referencing Info'>
    				<p>Tier 1 Connections:</p>
    				<p>Tier 2 Connections:</p>
    				<p>Familial Connections:</p>
    			</TEPanel>
    		</TEPanelWrapper>
    	)
    }
}

export default Member
