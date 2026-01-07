import './Tracklist.css';
import Track from './Track';

export default function Tracklist({ searchResults }) {

    return(
        <section className='Tracklist'>
            <h2>Results</h2>
            {
                searchResults.map((track) => {
                    <Track track={track} />
                })
            }
        </section>
    );
}