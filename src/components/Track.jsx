

export default function Track({ track, onAddTrack, onRemoveTrack, isRemoval }) {

    return(
        <div style={{marginBottom: 15}}>
            <h3 style={{margin: 0}} >{track.name}</h3>
            <p style={{margin: 0}} >{track.artist} | {track.album}</p>
            {isRemoval ? <button onClick={() => onRemoveTrack(track)}>Remove</button> : <button onClick={() => onAddTrack(track)} >Add</button>}
        </div>
    );
}