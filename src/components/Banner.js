import "../styles/App.css";

const Banner = () => {
    return (
        <div className="banner-area">
            <img className="banner-icon" src="/assets/radar.png" />
            <span className="banner-text">Radar API Test</span>
            <span className="fa fa-github fa-2x" onClick={() => window.location.href = "https://github.com/blamishaw/radar-experiment"}></span>
        </div>
        
    );
};

export default Banner;
