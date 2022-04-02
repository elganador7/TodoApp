import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const Front = lazy(() => import('layout/front/ContentWrapper'))
const Admin = lazy(() => import('layout/admin/ContentWrapper'))

const App: React.FC = () => {
	return (
		<>
			<Suspense fallback={<div />}>
				<Switch>
					<Route path='/admin/' component={Admin} />
					<Route path='/form' component={Front} />
					<Route path='/' component={Front} />
				</Switch>
			</Suspense>
		</>
	)
}

export default App
