import './SearchBar.css';

export default function SearchBar() {
    return(
        <div className="SearchBar">
            <input type="text" placeholder="Enter a Song Title" />
            <button>SEARCH</button>
        </div>
    );
}