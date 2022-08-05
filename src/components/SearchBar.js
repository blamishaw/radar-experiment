import "../styles/App.css";

const SearchBar = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
    }

    return (
        <div className="searchbar-area">
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" placeholder="Enter a Category"></input>
                <button className="search-btn">Search Events</button>
            </form>
        </div>
    );
}

export default SearchBar;