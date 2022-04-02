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
import Dictionary from 'components/TETranslation'

// interface Props extends <Partial<RouteComponentProps<any>> {}

const Navbar = (props: { history: RouteComponentProps['history'] }) => {
	const { setSideNavActive, barTitle, userLang,setUserLang } = useAppContext()
	const localDict : any = Dictionary.generalDictionary.homePage


	const handleLangSwitch = () => {
		if(userLang !== "en") {
			setUserLang("en")
		}
		else {
			setUserLang("fa-AF")
		}
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
				<SignOutButton onClick={handleLangSwitch}>{`${userLang === 'en' ? localDict.switchLanguage[userLang] : localDict.switchLanguage["fa-AF"]}`}</SignOutButton>
			</Content>
		</Container>
	)
}

export default Navbar
