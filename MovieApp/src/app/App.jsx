import { useState } from 'react'
import './App.css'
import Carousel from '../common/Carousel/Carousel'
import NavBar from '../common/NavBar/NavBar'
import Footer from '../common/Footer/Footer'
import MovieCard from '../common/MovieCard/MovieCard'

function App() {

  return (
    <>
    <NavBar />
    <Carousel />
    <MovieCard />
    <Footer />
    </>
  )
}

export default App
