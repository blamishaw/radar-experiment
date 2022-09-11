# Testing Geolocation Services using the Radar API

API Docs [here](https://radar.com/documentation/api).

This site was built using React and interfaces with the Google Maps API using the npm package `@googlemaps/react-wrapper`. You can create a GCP project and get a Google Maps API key [here](https://developers.google.com/maps).

For all functionality to work, you must create a `.env` file in the top-level directory with the following lines:

```
REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
REACT_APP_RADAR_API_KEY=<your_radar_api_key>
```

The site can then be spun up by running the following commands:

```
git clone https://github.com/blamishaw/radar-interview.git
cd radar-experiment
npm install
npm start
```
## Todo:
- [x] Add geocoding interface to map lat/long to street address

- [x] Cache API responses in `sessionStorage` to avoid making extraneous calls


