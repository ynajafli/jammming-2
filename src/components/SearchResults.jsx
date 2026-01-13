import Tracklist from "./Tracklist";
import './SearchResults.css';

export default function SearchResults({ searchResults, onAddTrack }) {
    return(
        <section className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={searchResults} onAddTrack={onAddTrack} isRemoval={false}/>
        </section>
    );
}