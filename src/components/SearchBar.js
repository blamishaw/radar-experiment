import { useRef, useState } from 'react';
import { categories } from '../data/categories';
import "../styles/App.css";

const SearchBar = () => {
    const inputRef = useRef("");

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputText = e.target[0].value.trim().toLowerCase();
        if (inputText && categories.findIndex((category) => category === inputText) === -1) {
            setErrorMessage(`Can't find category "${inputText}"`);
        }

        // TODO: Call axios with API 
        console.log(inputText);
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
                <input className="search-input" type="text" placeholder="Enter a Category" onChange={handleChange} ref={inputRef}></input>
                <button className="search-btn">Search Events</button>
                {showSuggestions && 
                    <ul className="search-suggestion-dropdown">
                        {suggestions.map((suggestion) => <li className="search-suggestion" onClick={() => handleClickCategory(suggestion)}>{suggestion}</li>)}
                    </ul>
                }
            </form>
            {errorMessage && <h3 className="search-error">{errorMessage}</h3>}
        </div>
    );
}

export default SearchBar;