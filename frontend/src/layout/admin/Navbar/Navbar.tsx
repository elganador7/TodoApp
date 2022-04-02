import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useAppContext } from 'hooks'

import {
	Container,
	Content,
	LeftWrapper,
	SlideNavButton,
	SlideNavIcon,
	Title,
	SignOutButton,
} from './styledComponents'

// interface Props extends <Partial<RouteComponentProps<any>> {}

const Navbar = (props: { history: RouteComponentProps['history'] }) => {
	const { history } = props
	const { setSideNavActive, barTitle, signOutUser } = useAppContext()

	const handleSignOut = () => {
		signOutUser()
		history.push('/')
	}

	return (
		<Container>
			<Content>
				<LeftWrapper>
					<SlideNavButton
						onClick={() => setSideNavActive && setSideNavActive((active) => !active)}
					>
						<SlideNavIcon />
					</SlideNavButton>
					<Title>{barTitle}</Title>
				</LeftWrapper>
				<SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
			</Content>
		</Container>
	)
}

export default Navbar
