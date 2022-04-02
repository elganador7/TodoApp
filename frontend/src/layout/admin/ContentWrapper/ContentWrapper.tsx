import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

import Navbar from 'layout/admin/Navbar'
import SideNavbar from 'layout/admin/SideNavbar'

import PrivateRoute from 'components/PrivateRoute'
import NotFound from 'pages/NotFound'
import PermissionDenied from 'pages/PermissionDenied'

import Users from 'pages/admin/Users'
import User from 'pages/admin/User'
import Groups from 'pages/admin/Groups'
import Group from 'pages/admin/Group'
import Units from 'pages/admin/Units'
import Unit from 'pages/admin/Unit'
import Members from 'pages/admin/Members'
import Member from 'pages/admin/Member'
import MembersAssigned from 'pages/admin/MembersAssigned'
import MemberView from 'pages/admin/MemberView'
import Export from 'pages/admin/Export'
import Dashboard from 'pages/admin/Dashboard'
import Case from 'pages/admin/Case'
import Cases from 'pages/admin/Cases'
import Persons from 'pages/admin/Persons'


import { useAppContext } from 'hooks'

import { BodyContainer, Content } from './styledComponents'


interface Props extends RouteComponentProps<any> {}

const ContentWrapper = (props: Props) => {
	const { history } = props
	const {
		userSignedIn,
		userSignedInCheckComplete,
		userModelLoaded,
		sideNavActive,
	} = useAppContext()

	//If User Loaded with No User => Kick them out
	if (!userSignedInCheckComplete) {
		return null //Still Loading
	}
	if (!userSignedIn) {
		return <Redirect to='/' />
	}
	//If User Loaded with User => Wait for userModelLoaded
	if (!userModelLoaded) {
		return null //Still Loading
	}

	return (
		<>
			<SideNavbar />
			<BodyContainer sideNavActive={sideNavActive}>
				<Navbar history={history} />
				<Content>
					<Switch>
						<PrivateRoute path='/admin/mycases' component={Cases} />
						<PrivateRoute path='/admin/case/:uid' component={Case} />
						<PrivateRoute path='/admin/user/:uid' component={User} />
						<PrivateRoute path='/admin/users' component={Users} />
						<PrivateRoute path='/admin/person/:uid' component={User} />
						<PrivateRoute path='/admin/persons' component={Persons} />
                       	<PrivateRoute path='/admin/group/:uid' component={Group} />
                        <PrivateRoute path='/admin/groups' component={Groups} />
                         {/* <PrivateRoute path='/admin/unit/:uid' component={Unit} />
                        <PrivateRoute path='/admin/units' component={Units} />
                        <PrivateRoute path='/admin/member/:uid' component={Member} />
                        <PrivateRoute path='/admin/members' component={Members} />
						<PrivateRoute path='/admin/MembersAssigned' component={MembersAssigned} />
                        <PrivateRoute path='/admin/member_view/:uid' component={MemberView} /> */}
                        <PrivateRoute path='/admin/export' component={Export} />
						<PrivateRoute path='/admin/dashboard' component={Dashboard} />
						<Route path='/admin/403' component={PermissionDenied} />
						<Route component={NotFound} />
					</Switch>
				</Content>
			</BodyContainer>
		</>
	)
}

export default ContentWrapper
