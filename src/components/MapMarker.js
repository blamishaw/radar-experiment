import { useEffect, useState } from "react";

const MapMarker = (options) => {
    const [marker, setMarker] = useState();

    const infoWindow = new window.google.maps.InfoWindow({
      content: "",
      maxWidth: 300,
    })
  
    useEffect(() => {
      if (!marker) {
        setMarker(new window.google.maps.Marker());
      }
      // HTML to be displayed when user hovers over marker
      const contentString = `
          <div>
            <img src='/assets/restaurant.png' className="map-card-img"/>
            <h1>${options.name}</h1>
            <h4>${options.streetAddress}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius imperdiet nunc eget maximus. Fusce mollis, ligula vitae tincidunt vulputate, metus quam bibendum turpis, sit amet consectetur neque massa eget justo. Maecenas volutpat nunc at erat laoreet rutrum. Phasellus luctus orci vel ipsum consectetur efficitur.</p>
          </div>
        `;
      infoWindow.setContent(contentString);
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);

    useEffect(() => {  
      if (marker) {
        marker.setOptions(options);
        marker.addListener('mouseover', () => {
          infoWindow.open({
            anchor: marker,
            shouldFoucs: false,
          })
        })
        marker.addListener('mouseout', () => {
          infoWindow.close();
        })
      }
    }, [marker, options]);
    return null;
  };

export default MapMarker;