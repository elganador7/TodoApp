const DEV = {
	API_BASE_URL: 'https://localhost:44319',
	API_DEBUGGING: true,

	MAP_ATTRIBUTION: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
	MAP_TILES_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}
const PROD = {
	API_BASE_URL: '',
	API_DEBUGGING: false,

	MAP_ATTRIBUTION: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
	MAP_TILES_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}

export default {
	...(process.env.NODE_ENV === 'development' ? DEV : PROD),
}
