import React from 'react'

//This is the example embed code. This is being left here for future reference
/* 
<script type='text/javascript'>
    embed_module_id="jYvwce8ij15xWnMOXtNVmoNbDWTiP9Tv"; embed_module_width="500";
    embed_module_height="350"; embed_module_readonlyChart="false";
    embed_module_readOnlyDateRange="false"; embed_module_datePeriod="18";
    embed_module_detailedError="false";
</script>
<script
    type='text/javascript'
    src='https://dashboard.monitis.com/sharedModule/shareModule.js'
></script>
<noscript>
    <a href='//www.monitis.com'>
        Monitoring by Monitis. Please enable JavaScript to see the report!
    </a>{' '}
</noscript> 
*/
interface Props
	extends React.DetailedHTMLProps<
		React.IframeHTMLAttributes<HTMLIFrameElement>,
		HTMLIFrameElement
	> {
	width?: number
	height?: number
	preview?: boolean
	id: string
	readOnly?: boolean
	readOnlyDateRange?: boolean
	datePeriod: number
	detailedError?: boolean
	baseURL?: string
	title: string
	// These were not provided in embed code. Not confident on type
	monitorIds?: any
	showGroupFilter?: boolean
	detailedMsg?: any
	selLegend?: any
}
export const MonitisChart: React.FC<Props> = (props) => {
	const {
		width = 500,
		height = 300,
		preview,
		id,
		readOnly,
		readOnlyDateRange,
		datePeriod,
		detailedError,
		baseURL = 'https://dashboard.monitis.com/',
		// These were not provided in embed code. Not confident on type
		monitorIds,
		showGroupFilter,
		detailedMsg,
		selLegend,
		title,
		...rest
	} = props

	// The forcing to 300 and 500 was done by previous script. Don't know if it is required
	let params = `height=${height < 300 ? 300 : height}&width=${
		width < 500 ? 500 : width
	}&publicKey=${id}`
	if (readOnly !== undefined) {
		params += `&readonlyChart=${readOnly}`
	}
	if (readOnlyDateRange !== undefined) {
		params += `&readOnlyDateRange=${readOnlyDateRange}`
	}
	if (datePeriod !== undefined) {
		params += `&datePeriod=${datePeriod}`
	}
	if (detailedError !== undefined) {
		params += `&detailedError=${detailedError}`
	}

	// These were not provided in embed code. Not confident on type
	if (monitorIds !== undefined) {
		params += `&monitorIds=${monitorIds}`
	}
	if (showGroupFilter !== undefined) {
		params += `&showGroupFilter=${showGroupFilter}&preview=${preview}`
	}
	if (detailedMsg !== undefined) {
		params += `&detailedMsg=${detailedMsg}`
	} else {
		params += `&detailedMsg=`
	}
	if (selLegend !== undefined) {
		params += `&selLegend=${selLegend}`
	} else {
		params += `&selLegend=`
	}

	return (
		<iframe
			frameBorder={0}
			width={`${width}px`}
			height={`${height}px`}
			src={`${baseURL}shareModule.jsp?v=18&${params}`}
			title={title}
			{...rest}
		/>
	)
}
