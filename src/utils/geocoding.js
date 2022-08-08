import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

// Get address from latitude & longitude
export const getStreetAddress = (lat, lng, setStreetAddress) => {
    Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setStreetAddress(address);
        },
        (error) => {
          console.error(error);
        }
      );
}
