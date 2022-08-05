/**
 * Code developed with help from https://developers.google.com/maps/documentation/javascript/react-map
 */

import React, { useEffect, useState, useRef } from "react"; 
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapMarker from "./MapMarker";
import "../styles/App.css";

const MapWrapper = ({ eventPayload }) => {
    const render = (status) => {
        return <h1>{status}</h1>
    }
    
    return (
        <div className="map-area">
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
                <Map zoom={13} center={{ lat: 40.741895, lng: -73.989308 }}>
                    {eventPayload?.events && eventPayload.events.map((payload) => 
                        <MapMarker position={{ lng: payload.location.coordinates[0], lat: payload.location.coordinates[1] }} />
                    )} 
                </Map>
            </Wrapper>
        </div>
        
    );
};

const Map = ({ children, ...options }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, options));
        }
    }, [ref, map]);

    return (
        <>
            <div id="map" ref={ref} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );  
};

export default MapWrapper;
