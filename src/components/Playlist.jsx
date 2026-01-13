import './Playlist.css';
import Tracklist from './Tracklist';

export default function Playlist({ playlistName, playlistTracks, onPlaylistNameChange, onRemoveTrack, onSave }) {

    return(
        <section className="Playlist">
            <input type='text' placeholder='Playlist Name' value={playlistName} onChange={onPlaylistNameChange} />
            <Tracklist  tracks={playlistTracks} isRemoval={true} onRemoveTrack={onRemoveTrack} />
            <button onClick={onSave}>SAVE TO SPOTIFY</button>
        </section>
    );
}