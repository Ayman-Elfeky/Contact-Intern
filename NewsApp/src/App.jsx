import { useState } from 'react'
import './App.css'
import { ArticleProvider } from './context/ArticleContext'
import Home from './pages/Home'
function App() {
  console.log("YARAAAAAAAAAAAAB")
  return (
    <>
    <ArticleProvider>
      <Home />
    </ArticleProvider>

    </>
  )
}

export default App
