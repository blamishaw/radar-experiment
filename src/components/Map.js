import React, { useEffect, useState, useRef } from "react"; 
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapMarker from "./MapMarker";
import "../styles/App.css";

const MapWrapper = () => {
    const render = (status) => {
        return <h1>{status}</h1>
    }
    
    return (
        <div className="map-area">
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
                <Map zoom={5} center={{ lat: -25, lng: 131 }}> 
                    <MapMarker position={{ lat: -24.8, lng: 130.95 }} />
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
