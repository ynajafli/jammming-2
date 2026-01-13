import './SearchBar.css';

export default function SearchBar({ onTermChange, searchTerm, onSearch }) {
    return(
        <div className="SearchBar">
            <input type="text" placeholder="Enter a Song Title" value={searchTerm} onChange={onTermChange} />
            <button onClick={onSearch}>SEARCH</button>
        </div>
    );
}