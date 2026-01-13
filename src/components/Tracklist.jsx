import './Tracklist.css';
import Track from './Track';

export default function Tracklist({ tracks, onAddTrack, onRemoveTrack, isRemoval }) {

    return(
        <div>
            {
                tracks.map((track) => (
                    <Track key={track.id} track={track} onAddTrack={onAddTrack} onRemoveTrack={onRemoveTrack} isRemoval={isRemoval} />
                ))
            }
        </div>
    );
}