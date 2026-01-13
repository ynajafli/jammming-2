import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'
import SearchResults from './components/SearchResults'
import Spotify from './util/Spotify'

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handlePlaylistNameChange = (e) => setPlaylistName(e.target.value);
  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const addTrack = (track) => {
    if (!playlistTracks.find((searchTrack) => searchTrack.id === track.id)) {
      setPlaylistTracks(prev => [...prev, track])
    }
  }

  const removeTrack = (track) => {
    setPlaylistTracks(prev => prev.filter((searchTrack) => searchTrack.id !== track.id))
  }


  const handleSearch = async () => {
    const results = await Spotify.search(searchTerm)
    setSearchResults(results);
  }

  const handleSaveToSpotify = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackUris);

    setPlaylistName('');
    setPlaylistTracks([]);
  }

  return (
    <main>
      <SearchBar onTermChange={handleSearchTermChange} searchTerm={searchTerm} onSearch={handleSearch} />
      <section className='App'>
        <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onPlaylistNameChange={handlePlaylistNameChange} onRemoveTrack={removeTrack} onSave={handleSaveToSpotify} />
      </section>
    </main>
  )
}

export default App
