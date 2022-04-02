import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
	TEErrorLoadingAlert,
	TEPanelWrapper,
	TEPanel,
	// TEForm,
	// TEInputRow,
	// TEButton,
	// useTEPopups,
} from 'react-tec'

// import TEPanelActionButton from 'components/TEPanelActionButton'
// import TEPanelActionWrapper from 'components/TEPanelActionWrapper'
import TEReactTable from 'components/TEReactTable'

import { useBarTitle } from 'hooks'
import { convertToDateShort } from 'helpers'

import { useMember } from './hooks'
// import { saveMember, advanceMember } from './requests'

// TODO: Clean up all these unused things.

interface Props extends RouteComponentProps<{ uid: string }> {}
const MemberView = (props: Props) => {
	const { match } = props
	const { uid } = match.params
	useBarTitle('Member')
	// const { userToken } = useAppContext()
	// const [roster_num, setRosterNum] = useState('')
	const [given_name, setGivenName] = useState('')
	const [status, setStatus] = useState('')
	const [duty_status, setDutyStatus] = useState('')
	// const [date_of_birth, setDateOfBirth] = useState('')
	const [rank, setRank] = useState('')
	const [duty_position, setDutyPosition] = useState('')
	// const [coy, setCoy] = useState('')
	const [ana_id, setANAID] = useState('')
	const [taskera, setTaskera] = useState('')
	const [bid, setBid] = useState('')
	// const [fathers_name, setFathersName] = useState('')
	// const [ethnicity, setEthnicity] = useState('')
	// const [home_province, setHomeProvince] = useState('')
	// const [home_district, setHomeDistrict] = useState('')
	// const [home_village, setHomeVillage] = useState('')
	// const [birth_province, setBirthProvince] = useState('')
	// const [birth_district, setBirthDistrict] = useState('')
	// const [birth_village, setBirthVillage] = useState('')
	const [cell_number_1, setCellNumber1] = useState('')
	// const [cn1_date_reported, setCN1DateReported] = useState('')
	const [cell_number_2, setCellNumber2] = useState('')
	// const [cn2_date_reported, setCN2DateReported] = useState('')
	const [social_media_account1, setSocialMediaAccount1] = useState('')
	const [social_media_account2, setSocialMediaAccount2] = useState('')
	const [ahmrs, setAHMRS] = useState('')
	const [sofex_case_number, setSOFEXCaseNumber] = useState('')
	const [date_last_enrolled, setDateLastEnrolled] = useState('')
	// const [date_screened, setDateScreened] = useState('')
	const [recommend, setRecommend] = useState('')
	// const [actions_taken, setActionsTaken] = useState('')
	const [revetting_date, setRevettingDate] = useState('')
	const [unit, setUnit] = useState('')
    // const [editingActive, setEditingActive] = useState(false)
	const { member, memberLoaded } = useMember(uid)

	useEffect(() => {
		if (member) {
			const {
				// roster_num = '',
				given_name = '',
				status = '',
				duty_status = '',
				// date_of_birth = '',
				rank = '',
				duty_position = '',
				// coy = '',
				ana_id = '',
				taskera = '',
				bid = '',
				// fathers_name = '',
				// ethnicity = '',
				// home_province = '',
				// home_district = '',
				// home_village = '',
				// birth_province = '',
				// birth_district = '',
				// birth_village = '',
				cell_number_1 = '',
				// cn1_date_reported = '',
				cell_number_2 = '',
				// cn2_date_reported = '',
				social_media_account1 = '',
				social_media_account2 = '',
				ahmrs = '',
				sofex_case_number = '',
				date_last_enrolled = '',
				// date_screened = '',
				recommend = '',
				revetting_date = '',
				// actions_taken = '',
				unit = '',
			} = member

			//setRosterNum(roster_num.toString())
			setGivenName(given_name)
			setStatus(status)
			setDutyStatus(duty_status)
			//setDateOfBirth(date_of_birth)
			setRank(rank)
			setDutyPosition(duty_position)
			//setCoy(coy)
			setANAID(ana_id)
			setTaskera(taskera)
			setBid(bid)
			// setFathersName(fathers_name)
			// setEthnicity(ethnicity)
			// setHomeProvince(home_province)
			// setHomeDistrict(home_district)
			// setHomeVillage(home_village)
			// setBirthProvince(birth_province)
			// setBirthDistrict(birth_district)
			// setBirthVillage(birth_village)
			setCellNumber1(cell_number_1)
			// setCN1DateReported(cn1_date_reported)
			setCellNumber2(cell_number_2)
			// setCN2DateReported(cn2_date_reported)
			setSocialMediaAccount1(social_media_account1)
			setSocialMediaAccount2(social_media_account2)
			setSOFEXCaseNumber(sofex_case_number)
			setDateLastEnrolled(date_last_enrolled)
			//setDateScreened(date_screened)
			setRecommend(recommend)
			setAHMRS(ahmrs)
			//setActionsTaken(actions_taken)
			setRevettingDate(revetting_date)
			setUnit(unit)
		}
	}, [member])

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
    return (
        <TEPanelWrapper>
            <TEPanel
                title='Summary'
                // rightComponent={
                //     <TEPanelActionWrapper>
                //         <TEPanelActionButton onClick={() => setEditingActive(true)}>
                //             Edit Member
                //         </TEPanelActionButton>
                //     </TEPanelActionWrapper>
                // }
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
				<p>Name: {given_name}</p>
				<p>Rank: {rank}</p>
				<p>Status: {status}</p>
				<p>Duty Status: {duty_status}</p>
				<p>Duty Position: {duty_position}</p>
			</TEPanel>
			<TEPanel title='Identifiers' subtitle='Cross-referencing Info' size='half'>
				<p>ANA ID Number: {ana_id}</p>
				<p>Taskera Number: {taskera}</p>
				<p>SOFEX Case Number: {sofex_case_number}</p>
				<p>BID: {bid}</p>
				<p>AHMRS: {ahmrs}</p>
			</TEPanel>
			<TEPanel title='Admin Info' subtitle='Personnel Tracking' size='half'>
				<p>Date Last Enrolled: {date_last_enrolled}</p>
				<p>Unit: {unit}</p>
				<p>Revetting Date: {revetting_date}</p>
				<p>Date Last Enrolled: {date_last_enrolled}</p>
			</TEPanel>
			<TEPanel title='Digital Footprint' subtitle='Intel Correlation' size='half'>
				<p>Primary Cell Number: {cell_number_1}</p>
				<p>Secondary Cell Number: {cell_number_2}</p>
				<p>Primary Social Media Account: {social_media_account1}</p>
				<p>Secondary Social Media Account: {social_media_account2}</p>
			</TEPanel>
			<TEPanel title='Notes and Recommendations' subtitle='Cross-referencing Info'>
				<p>Actions Taken: </p>
				<p>Recommendations: {recommend}</p>
			</TEPanel>
			<TEPanel title='Derogatory Reporting' subtitle='Cross-referencing Info'>
				<p>Tier 1 Connections:</p>
				<p>Tier 2 Connections:</p>
				<p>Familial Connections:</p>
			</TEPanel>
		</TEPanelWrapper>
	)
}

export default MemberView
