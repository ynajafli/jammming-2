import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'
import SearchResults from './components/SearchResults'

function App() {

  const [searchResults, setSearchResults] = useState([
    { name: 'Nightcrawler', artist: 'Travis Scott', album: 'Rodeo', id: 1, uri: 'spotify:track:xxxx' },
    { name: 'Bogus', artist: 'Don toliver', album: 'Red', id: 2, uri: 'spotify:track:xxxx' },
    { name: 'Song A', artist: 'Artist A', album: 'Album A', id: 3, uri: 'spotify:track:xxxx' },
    { name: 'Song B', artist: 'Artist B', album: 'Album B', id: 4, uri: 'spotify:track:xxxx' }
  ]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handlePlaylistNameChange = (e) => setPlaylistName(e.target.value);

  const addTrack = (track) => {
    if (!playlistTracks.find((searchTrack) => searchTrack.id === track.id)) {
      setPlaylistTracks(prev => [...prev, track])
    }
  }

  const removeTrack = (track) => {
    setPlaylistTracks(prev => prev.filter((searchTrack) => searchTrack.id !== track.id))
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(t => t.uri)
    console.log(playlistName, trackUris)

    setPlaylistName('');
    setPlaylistTracks([]);
  }

  return (
    <main>
      <SearchBar />
      <section className='App'>
        <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onPlaylistNameChange={handlePlaylistNameChange} onRemoveTrack={removeTrack} onSave={savePlaylist} />
      </section>
    </main>
  )
}

export default App
