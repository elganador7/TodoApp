import React from 'react'
import { TEPanelWrapper, TEPanel } from 'react-tec'

import ChartistGraph from "react-chartist";

import { Panel } from './styledComponents'
import { useBarTitle } from 'hooks'

import {
	dailySalesChart,
	emailsSubscriptionChart,
  } from "./variables/charts";

const Dashboard = () => {
	useBarTitle('Dashboard')
	return (
		<TEPanelWrapper>
			<Panel 
				title='PT Average'>
				<ChartistGraph
					className="ct-chart"
					data={dailySalesChart.data}
					type="Line"
					options={dailySalesChart.options}
					listener={dailySalesChart.animation}
				/>
			</Panel>
			<Panel
				title='Test Bar Graph'>
				<ChartistGraph
					className="ct-chart"
					data={emailsSubscriptionChart.data}
					type="Bar"
					options={emailsSubscriptionChart.options}
					responsiveOptions={emailsSubscriptionChart.responsiveOptions}
					listener={emailsSubscriptionChart.animation}
              	/>
			</Panel>
		</TEPanelWrapper>
	)
}

export default Dashboard