import { useRef, useState } from 'react';
import { categories } from '../data/categories';
import "../styles/App.css";

const SearchBar = () => {
    const inputRef = useRef("");

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputText = e.target[0].value.trim().toLowerCase();
        if (categories.findIndex((category) => category === inputText) === -1) {
            console.log("cant find");
        }
        console.log(inputText)
    }

    const handleChange = (e) => {
        const inputText = e.target.value.trim().toLowerCase();
        if (inputText.length > 0) {
            let newSuggestions = [];

            // Store categories and the order in which the substring is found
            // We do this so that suggestions are returned alphabetically
            for (const category of categories) {
                // No need to offer more than 6 suggestions
                if (newSuggestions.length > 6) { break; }
                const idx = category.indexOf(inputText)
                if (idx > -1) { newSuggestions.push([idx, category ])};
            };
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
                <input className="search-input" type="text" placeholder="Enter a Category" onChange={handleChange} ref={inputRef}></input>
                <button className="search-btn">Search Events</button>
                {showSuggestions && 
                    <ul className="search-suggestion-dropdown">
                        {suggestions.map((suggestion) => <li className="search-suggestion" onClick={() => inputRef.current.value = suggestion}>{suggestion}</li>)}
                    </ul>
                }
            </form>
        </div>
    );
}

export default SearchBar;