import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'
import Tracklist from './components/Tracklist'

function App() {

  const [searchResults, setSearchResults] = useState([
  { name: 'Nightcrawler', artist: 'Travis Scott', album: 'Rodeo', id: 1 },
  { name: 'test2', artist: 'don toliver', album: 'test2', id: 2 },
  { name: 'Song A', artist: 'Artist A', album: 'Album A', id: 3 },
  { name: 'Song B', artist: 'Artist B', album: 'Album B', id: 4 }
]);

  return (
    <main>
      <SearchBar />
      <section className='App'>
        <Tracklist searchResult={searchResults} />
        <Playlist />
      </section>
    </main>
  )
}

export default App
