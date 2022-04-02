import React from 'react'
import { TEPanelWrapper, TEPanel, useTEPopups } from 'react-tec'
import TEPanelActionButtonFull from 'components/TEPanelActionButtonFull'

import { useAppContext } from 'hooks'

import { getCSV } from './requests'

const Export = () => {
    const popupFunctions = useTEPopups()
	const { userToken } = useAppContext()


    const handleCSVExport = () => {
        const data = {
            userToken,
            popupFunctions,
        }
        getCSV(data)
    }

    const handleS3Backup = () => {
        console.log("test")
    }

    const handleSIPRExport = () => {
        console.log("test")
    }

    const handleJWICSExport = () => {
        console.log("test")
    }

	return (
			<TEPanelWrapper>
				<TEPanel title="Export Data to CSV" subtitle="File Download" size ='half'>
					<p>This option allows you to export the members table to an excel
                    sheet for local use. As long as the column headers remain the same, you
                    can upload the sheet when you are finished editing and the database will
                    make the necessary modifications</p>
                    <TEPanelActionButtonFull
    					onClick={() => {
    						handleCSVExport()
    					}}
                        >
                        Download CSV
    				</TEPanelActionButtonFull>
				</TEPanel>
                <TEPanel title="Backup Data to S3" subtitle="Export Backup Files to AWS" size ='half'>
                    <p>This option allows you to export the members table to an excel
                    sheet for local use. As long as the column headers remain the same, you
                    can upload the sheet when you are finished editing and the database will
                    make the necessary modifications</p>
                    <TEPanelActionButtonFull
    					onClick={() => {
    						handleS3Backup()
    					}}
                        >
                        Backup to S3
    				</TEPanelActionButtonFull>
                </TEPanel>
                <TEPanel title="Sync With SIPR" subtitle="Automated CDS" size ='half'>
                    <p>This option allows you to export the members table to an excel
                    sheet for local use. As long as the column headers remain the same, you
                    can upload the sheet when you are finished editing and the database will
                    make the necessary modifications</p>
                    <TEPanelActionButtonFull
                        onClick={() => {
                            handleSIPRExport()
                        }}
                        >
                        Export to SIPR
                    </TEPanelActionButtonFull>
                </TEPanel>
                <TEPanel title="Sync With JWICS" subtitle="Automated CDS" size ='half'>
                    <p>This option allows you to export the members table to an excel
                    sheet for local use. As long as the column headers remain the same, you
                    can upload the sheet when you are finished editing and the database will
                    make the necessary modifications</p>
                    <TEPanelActionButtonFull
    					onClick={() => {
    						handleJWICSExport()
    					}}
                        >
                        Export to JWICS
    				</TEPanelActionButtonFull>
                </TEPanel>
			</TEPanelWrapper>
	)
}

export default Export
