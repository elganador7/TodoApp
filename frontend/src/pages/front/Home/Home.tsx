import React, { useState, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TEForm, useTEPopups } from 'react-tec'

import TELinkButton from 'components/TELinkButton'

import { useAppContext } from 'hooks'

import { PanelWrapper, Panel, Title, FormTitle, InputRow, Button } from './styledComponents'

import { signInUser } from './requests'

interface Props extends RouteComponentProps {}
const Home: React.FC<Props> = (props) => {
	const popupFunctions = useTEPopups()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const {
		setUserSignedIn,
		userSignedIn,
		setAndStoreUserToken,
		setUserModel,
		setUserModelLoaded,
	} = useAppContext()

	const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { history } = props

		const data = {
			username,
			password,
			history,
			popupFunctions,
			setUserSignedIn,
			setAndStoreUserToken,
			setUserModel,
			setUserModelLoaded,
		}

		signInUser(data)
	}

	const meta = {
		title: 'HoloNet',
		description: '',
	}

	return (
		<>
			<Helmet {...meta} />
			<PanelWrapper>
				<Panel>
					<Title>Welcome to HoloNet</Title>
					{userSignedIn ? (
						<TELinkButton to='/admin/persons'>Continue to Admin Pages</TELinkButton>
					) : (
						<>
							<FormTitle>Sign In</FormTitle>
							<TEForm onSubmit={handleSignInSubmit}>
								<InputRow
									labelForKey='username'
									title='Username'
									value={username}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setUsername(e.target.value)
									}
									required
								/>
								<InputRow
									labelForKey='password'
									type='password'
									title='Password'
									value={password}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setPassword(e.target.value)
									}
									required
								/>
								<Button type='submit'>Sign In</Button>
							</TEForm>
						</>
					)}
				</Panel>
			</PanelWrapper>
		</>
	)
}

export default Home
