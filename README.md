# Product Engineer Interview @ Radar

Prompt for interview [here](https://www.notion.so/radarlabs/Event-map-Product-Engineer-homework-acbe78fe7a0e46fc9893d58896636a82).

This site was built using React and interfaces with the Google Maps API using the npm package `@googlemaps/react-wrapper`.

The site can be run by running the following commands:

```
git clone https://github.com/blamishaw/radar-interview.git
cd radar-interview
npm install
npm start
```

For all functionality to work, you must create a `.env` file in the top-level directory with the following lines:

```
REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
REACT_APP_RADAR_API_KEY=<your_radar_api_key>
```

## Example

https://user-images.githubusercontent.com/52175208/183508255-2ffeef48-5007-4732-8fe0-16568a74f21c.mov





## Todo:
[x] Add geocoding interface to map lat/long to street address


