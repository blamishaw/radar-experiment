import { useState } from 'react';
import Banner from "./components/Banner";
import MapWrapper from "./components/Map";
import SearchBar from "./components/SearchBar";
import "./styles/App.css";

const App = () => {

  const [eventPayload, setEventPayload] = useState({});


  return (
    <div className="container">
      <Banner />
      <SearchBar setEventPayload={setEventPayload}/>
      <MapWrapper eventPayload={eventPayload}/>
    </div>
  )
};

export default App;
