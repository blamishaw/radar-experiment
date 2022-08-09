import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

// Calls the Radar API to fetch events for given searchTerm
// Results are cached in sessionStorage so that we don't need to make extraneous calls for already searched categories
export const callRadarAPI = (searchTerm, stateSetters) => {
  const { setFetchingData, setErrorMessage, setEventPayload } = stateSetters;
  const cachedData = sessionStorage.getItem(searchTerm);

  setFetchingData(true);
  if (!cachedData) {
    fetch(`https://api.radar.io/v1/events?types=user.entered_place&placeCategories=${searchTerm}`, {
      headers: {
          'Authorization': process.env.REACT_APP_RADAR_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => {
        if (data.events.length === 0) {
            setErrorMessage("No locations found!");
            setEventPayload(data);
        } else {
          // Wait for all getAddress promises to resolve before setting the event payload
          Promise.all(data.events.map((event) => getStreetAddress(event)))
          .then(() => {
            setEventPayload(data);
            sessionStorage.setItem(searchTerm, JSON.stringify(data));
          })
        }
        setFetchingData(false);
    })
    .catch(err => console.log(err))
  } else {
    setEventPayload(JSON.parse(cachedData));
    setFetchingData(false);
  }
}

// Get address from latitude & longitude
const getStreetAddress = (event) => {
  const lng = event.location.coordinates[0];
  const lat = event.location.coordinates[1];
  return Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response ? response.results[0].formatted_address : "";
      event.location = {...event.location, streetAddress: address};
    },
    (error) => {
      console.error(error);
    }
  );
}
