import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { TEAppWrapper } from 'react-tec'

import { AppProvider } from './contexts'

import 'react-table/react-table.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './index.css'

import App from './App'

const element = (
	<TEAppWrapper theme={{ primary: '#000000'}}>
		<AppProvider>
			<App />
		</AppProvider>
	</TEAppWrapper>
)

ReactDOM.render(element, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
