import { useEffect, useRef, useState } from 'react';
import { getFlattenedCategories } from '../data/categories';
import { ThreeDots } from 'react-loader-spinner';
import { callRadarAPI } from '../utils/utils';
import "../styles/App.css";

const MAX_SUGGESTIONS = 10;

const SearchBar = ({ setEventPayload }) => {
    const inputRef = useRef("");

    const [categories, setCategories] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchCategory, setSearchCategory] = useState(null);
    const [fetchingData, setFetchingData] = useState(false);

    useEffect(() => {
        console.log("fetching categories");
        setCategories(getFlattenedCategories());
    }, []);

    // Call Radar API to fetch events with the user specified category
    useEffect(() => {
        if (searchCategory) {
            callRadarAPI(searchCategory, { setFetchingData, setErrorMessage, setEventPayload });
        }
    }, [searchCategory]);

    // Set searchTerm on submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        // Clean input
        const inputText = e.target[0].value.trim().toLowerCase().replace(/ /g, "-");
        if (inputText && categories.findIndex((category) => category === inputText) === -1) {
            setErrorMessage(`Can't find category "${inputText}"`);
        } else {
            // Replace spaces with hyphen
            setSearchCategory(inputText);
        }
    }

    // Set input text field when clicking a suggested category
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
            for (let category of categories) {
                const idx = category.indexOf(inputText)
                if (idx > -1) { newSuggestions.push([idx, category])};
            };
            // Sort the suggestions so that they are intuitively in alphabetical order
            // This is fine since we only have a limited number of categories, but would want to find a more efficient way
            // to do this in the future as category count grows
            newSuggestions.sort((a, b) => a[0] > b[0]);
            const sortedSuggestions = newSuggestions.map((suggestion) => suggestion[1].replace(/-/g, ' '));

            // Only display MAX_SUGGESTIONS suggestions
            setSuggestions(sortedSuggestions.slice(0, MAX_SUGGESTIONS));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }

    return (
        <div className="searchbar-area">
            <form className="search-form" onSubmit={handleSubmit}>
                <span className="fa fa-search"></span>
                <input className="search-input" disabled={fetchingData} type="text" placeholder="Enter a Category" onChange={handleChange} ref={inputRef}></input>
                <button disabled={fetchingData} className="search-btn">
                    <span className="fa fa-home"></span>
                    <span className='search-btn-long-text'>Search Places</span>
                    <span className='search-btn-short-text'>Search</span>
                </button>
                {showSuggestions && 
                    <ul className="search-suggestion-dropdown">
                        {suggestions.map((suggestion, idx) => <li key={idx} className="search-suggestion" onClick={() => handleClickCategory(suggestion)}>{suggestion}</li>)}
                    </ul>
                }
            </form>
            {errorMessage && <h3 className="search-error">{errorMessage}</h3>}
            {fetchingData && <ThreeDots className="search-loading" color="#347FF6" width={80} height={80}/>}
        </div>
    );
}

export default SearchBar;