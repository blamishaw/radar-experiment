/**
 * Code developed with help from https://developers.google.com/maps/documentation/javascript/react-map
 */

import React, { useEffect, useState, useRef } from "react"; 
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapMarker from "./MapMarker";
import "../styles/App.css";

const MANHATTAN_COORDS = { lat: 40.741895, lng: -73.989308 };
const INITIAL_ZOOM = 13;

const MapWrapper = ({ eventPayload }) => {

    const render = (status) => {
        return <h1>{status}</h1>
    }
    
    return (
        <div className="map-area">
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
                <Map zoom={INITIAL_ZOOM} center={MANHATTAN_COORDS}>
                    {eventPayload?.events && eventPayload.events.map((payload, idx) => {
                        if (payload.place && payload.place.name) {
                            return <MapMarker 
                                        key={idx} 
                                        position={{ lng: payload.location.coordinates[0], lat: payload.location.coordinates[1] }}
                                        animation={window.google.maps.Animation.DROP}
                                        name={payload.place.name}
                                        streetAddress={payload.location.streetAddress}
                                    />
                            }
                        } 
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
