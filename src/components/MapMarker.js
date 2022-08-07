import { useEffect, useState } from "react";

const MapMarker = (options) => {
    const [marker, setMarker] = useState();

    const contentString = `
      <div>
        <img src='/assets/restaurant.png' />
        <h1>${options.name}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius imperdiet nunc eget maximus. Fusce mollis, ligula vitae tincidunt vulputate, metus quam bibendum turpis, sit amet consectetur neque massa eget justo. Maecenas volutpat nunc at erat laoreet rutrum. Phasellus luctus orci vel ipsum consectetur efficitur.</p>
      </div>
    
    `;
    const infoWindow = new window.google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300,
    })
    
  
    useEffect(() => {
      if (!marker) {
        setMarker(new window.google.maps.Marker());
      }
  
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