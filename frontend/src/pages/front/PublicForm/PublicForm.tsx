import React, { useEffect, useState, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { TEForm, useTEPopups } from 'react-tec'
import { TEPanelWrapper, TEPanel, TESearchSelectInput} from 'react-tec'
import TEReactTable from 'components/TEReactTable'
import TEPanelActionButton from 'components/TEPanelActionButton'
import TEPanelActionWrapper from 'components/TEPanelActionWrapper'
import settings from 'config/settings'


import { geolocated, GeolocatedProps } from "react-geolocated";

import { Map, TileLayer } from 'react-leaflet'

import { useAppContext } from 'hooks'

import Reaptcha from '@panalbish/reaptcha-enterprise';

import { PanelWrapper, Panel, Title, FormTitle, InputRow, Button } from './styledComponents'

import { addPerson } from './requests'
import { toNumber } from 'lodash'

interface Props extends RouteComponentProps{} 
const PublicForm: React.FC<Props & GeolocatedProps> = (props) => {
	const popupFunctions = useTEPopups()
	const [name, setName] = useState('')
	const [phone_number, setPhoneNumber] = useState('')
	const [latitude, setLatitude] = useState('')
	const [longitude, setLongitude] = useState('')
	const [mapDisplay, setMapDisplay] = useState('Satellite')

	// const [heading, setHeading] = useState('')
	// const [speed, setSpeed] = useState('')

	let maps : any = {'Satellite' : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
					'Topographic' : 'https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}',
					'Nat Geo' : 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
					'Street Map' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
	
	useEffect(() => {
		if (props.coords) {
			const coords = props.coords
			setLatitude(coords.latitude.toString())
			setLongitude(coords.longitude.toString())
			// setHeading(coords.heading.toString())
			// setSpeed(coords.speed.toString())
		}
	})
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const data = {
			name,
			phone_number,
			latitude,
			longitude,
			// heading,
			// speed,
			popupFunctions,
		}

		addPerson(data)
	}

	const meta = {
		title: 'HoloNet',
		description: '',
	}


	return (
		<>
			<Helmet {...meta} />
			<TEPanelWrapper>
				<TEPanel
					size='half'
				>
					<Title>Welcome to HoloNet</Title>
						<FormTitle>Submit Your Information</FormTitle>
							<TEForm onSubmit={handleSubmit}>
								<InputRow
									labelForKey='name'
									title='Name'
									value={name}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setName(e.target.value)
									}
									required
								/>
								<InputRow
									labelForKey='phone_number'
									type='phone_number'
									title='Phone Number'
									value={phone_number}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setPhoneNumber(e.target.value)
									}
									required
								/>
								<InputRow
									labelForKey='latitude'
									title='Latitude'
									value={latitude}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setLatitude(e.target.value)
									}
									required
								/>
								<InputRow
									labelForKey='longitude'
									type='longitude'
									title='Longitude'
									value={longitude}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setLongitude(e.target.value)
									}
									required
								/>
								{/* <Reaptcha sitekey="YOUR_API_KEY" onVerify={this.onVerify} />
       							<button type="submit" >
          								Submit
       							 </button> */}


								<Button type='submit'>Submit Response </Button>
						</TEForm>				
				</TEPanel>
				<TEPanel
						title='Map'
						size='half'
						rightComponent= {
							<TEPanelActionWrapper>
								<TESearchSelectInput
									labelForKey="viewSelector"
									title="View Selector"
									onChange={(options: {option : string}) => {
										setMapDisplay(options.option)
									}}
									options={["Satellite", "Topographic", "Nat Geo", "Street Map"]}
									value={mapDisplay}
		
								/>
							</TEPanelActionWrapper>
							}
					>
						<Map
							center={[toNumber(latitude), toNumber(longitude)]} 
							zoom={7}
							style={{ height: 480 }}
						>
							<TileLayer
								attribution={settings.MAP_ATTRIBUTION}
								url={maps[mapDisplay]}
							/>
							{(mapDisplay === 'Satellite') && (
								<TileLayer
									attribution={settings.MAP_ATTRIBUTION}
									url={'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png'}
								/>
							)}	
							{/* baselayer.on('load', function (event) {
								let track = new L.KML("/files/1/Layer/Administrasi/Administrasi Kota Jayapura.kml", {async: true});
								mymap.addLayer(track);
        					}); 		 */}
						</Map>
					</TEPanel>
			</TEPanelWrapper>
		</>
	)
}

export default geolocated()(PublicForm)
