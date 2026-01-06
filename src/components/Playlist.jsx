import './Playlist.css';

export default function Playlist() {
    return(
        <section className="Playlist">
            <input type='text' placeholder='Playlist Name'/>
            <button>SAVE TO SPOTIFY</button>
        </section>
    );
}