import { useEffect, useRef, useState } from 'react';
import { categories } from '../data/categories';
import { ThreeDots } from 'react-loader-spinner';
import "../styles/App.css";

const SearchBar = ({ setEventPayload }) => {
    const inputRef = useRef("");

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchCategory, setSearchCategory] = useState(null);
    const [fetchingData, setFetchingData] = useState(false);

    // Call Radar API to fetch events with the user specified category
    useEffect(() => {
        if (searchCategory) {
            setFetchingData(true);
            fetch(`https://api.radar.io/v1/events?types=user.entered_place&placeCategories=restaurant`, {
                headers: {
                    'Authorization': process.env.REACT_APP_RADAR_API_KEY
                }
            })
            .then(res => res.json())
            .then(data => {
                setEventPayload(data);
                setFetchingData(false);
            })
            .catch(err => console.log(err))
        }
        
    }, [searchCategory]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputText = e.target[0].value.trim().toLowerCase();
        if (inputText && categories.findIndex((category) => category === inputText) === -1) {
            setErrorMessage(`Can't find category "${inputText}"`);
        } else {
            // Replace spaces with hyphen
            setSearchCategory(inputText.replace(/ /g, "-"));
        }
    }

    const handleClickCategory = (suggestion) => {
        inputRef.current.value = suggestion
        setShowSuggestions(false);
    }

    const handleChange = (e) => {
        setErrorMessage("");
        const inputText = e.target.value.trim().toLowerCase();
        if (inputText.length > 0) {
            let newSuggestions = [];

            // Store categories and the order in which the substring is found
            // We do this so that suggestions are returned alphabetically
            categories.forEach((category) =>  {
                const idx = category.indexOf(inputText)
                if (idx > -1) { newSuggestions.push([idx, category ])};
            });
            newSuggestions.sort((a, b) => a[0] > b[0]);
            setSuggestions(newSuggestions.map((suggestion) => suggestion[1]));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    return (
        <div className="searchbar-area">
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" disabled={fetchingData} type="text" placeholder="Enter a Category" onChange={handleChange} ref={inputRef}></input>
                <button disabled={fetchingData} className="search-btn">Search Events</button>
                {showSuggestions && 
                    <ul className="search-suggestion-dropdown">
                        {suggestions.map((suggestion, idx) => <li key={idx} className="search-suggestion" onClick={() => handleClickCategory(suggestion)}>{suggestion}</li>)}
                    </ul>
                }
            </form>
            {errorMessage && <h3 className="search-error">{errorMessage}</h3>}
            {fetchingData && <ThreeDots color="#347FF6" width={80} height={80}/>}
        </div>
    );
}

export default SearchBar;