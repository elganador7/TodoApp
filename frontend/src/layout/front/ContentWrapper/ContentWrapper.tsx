import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import NotFound from 'pages/NotFound'

import Navbar from 'layout/front/Navbar'

import Home from 'pages/front/Home'
import PublicForm from 'pages/front/PublicForm'

import { MainPanel, FrontContentWrapper } from './styledComponents'

interface Props extends RouteComponentProps<any> {}

const ContentWrapper = (props: Props) => {
	const { history } = props
	return (
		<MainPanel>
			<Navbar history={history} />
			<FrontContentWrapper>
				<Switch>
					<Route path='/form' component={PublicForm} />
					<Route exact path='/' component={Home} />
					<Route component={NotFound} />
				</Switch>
			</FrontContentWrapper>
		</MainPanel>
	)
}

export default ContentWrapper
