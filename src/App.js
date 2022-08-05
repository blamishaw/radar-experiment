import Banner from "./components/Banner";
import MapWrapper from "./components/Map";
import SearchBar from "./components/SearchBar";
import "./styles/App.css";

const App = () => {
  return (
    <div className="container">
      <Banner />
      <SearchBar />
      <MapWrapper />
    </div>
  )
};

export default App;
