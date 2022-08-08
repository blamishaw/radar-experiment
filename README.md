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

For all functionality to work, you must create a `.env` file in the `src` directory with the following lines:

```
REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
REACT_APP_RADAR_API_KEY=<your_radar_api_key>
```

## Example
<img width="1680" alt="Screen Shot 2022-08-08 at 2 06 50 PM" src="https://user-images.githubusercontent.com/52175208/183494908-0a6b47b1-9118-4656-9007-bb4ff2012f79.png">


## Todo:
[x] Add geocoding interface to map lat/long to street address


