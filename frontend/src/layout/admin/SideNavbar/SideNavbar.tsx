import React from 'react'

import { useAppContext } from 'hooks'
// import { brandmark } from 'config/images'

import {
	SideNavbar,
	LogoWrapper,
	LogoLink,
	// Logo
	LogoText,
} from './styledComponents'

const SideBar = () => {
	const { sideNavActive, userModel } = useAppContext()

    if(userModel && userModel.uuid){
    	return (
    		<SideNavbar
    			sideNavActive={sideNavActive}
    			Header={
    				<LogoWrapper>
    					<LogoLink to='/'>
    						<LogoText>HoloNet</LogoText>
    					</LogoLink>
    				</LogoWrapper>
    			}
    			links={[
                    // { title: 'Dashboard', to: '/admin/dashboard' },
                    { title: 'Reports', to: '/admin/persons' },
                    // { title: 'My Tasked Members', to: '/admin/MembersAssigned' },
                    // { title: 'My Cases', to: 'admin/mycases'},
    				// { title: 'Untasked Members', to : '/admin/members'},
    				// { title: 'Tasked Units', to: '/admin/units' },
                    { title: 'Manage Groups', to: '/admin/groups' },
                    { title: 'Manage Users', to: '/admin/users' },
                    { title: 'Export Data', to: '/admin/export'},
                    { title: 'My Account', to: `/admin/user/${userModel.uuid}` },
    			]}
    		/>
    	)
    }
    return (
        <SideNavbar
            sideNavActive={sideNavActive}
            Header={
                <LogoWrapper>
                    <LogoLink to='/'>
                        <LogoText>HoloNet</LogoText>
                    </LogoLink>
                </LogoWrapper>
            }
            links={[
                { title: 'My Tasked Members', to: '/admin/MembersAssigned' },
                { title: 'Untasked Members', to : '/admin/members'},
                { title: 'Tasked Units', to: '/admin/units' },
                { title: 'Manage Groups', to: '/admin/groups' },
                { title: 'Manage Users', to: '/admin/users' },

            ]}
        />
    )

}

export default SideBar
