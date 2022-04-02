import React from 'react'
import { TEPrivateRoute, TEPrivateRouteProps } from 'react-tec'

import { useAppContext } from 'hooks'

interface Props extends TEPrivateRouteProps {}
const PrivateRoute: React.FC<Props> = (props) => {
	const { userSignedIn } = useAppContext()
	const authChecks = [{ check: () => userSignedIn, path: '/' }]

	return <TEPrivateRoute {...props} authChecks={authChecks} />
}

export default PrivateRoute
