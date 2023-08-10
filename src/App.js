import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Search from './components/search/Search'
import TheMovie from './components/section/movie/TheMovie'
import TheSerie from './components/section/serie/TheSerie'
import Favorites from './components/favorites/Favorites'

function App() {
  return (
    <Router basename='/TunisBest'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<TheMovie />} />
            <Route path="/series/:id/:s/:ep" element={<TheSerie />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </Router>
  )
}

export default App
