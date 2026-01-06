import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'
import Tracklist from './components/Tracklist'

function App() {

  return (
    <main>
      <SearchBar />
      <section className='App'>
        <Tracklist />
        <Playlist />
      </section>
    </main>
  )
}

export default App
