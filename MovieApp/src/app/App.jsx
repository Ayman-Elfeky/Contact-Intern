import { useState } from "react";
import "./App.css";
import Home from "../features/Home/Home";
import MovieProvider from "./MovieContent";
import NavBar from "../common/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router'
import MovieDetails from "../features/MovieDetails/MovieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <MovieProvider>
          <NavBar />
          <div className="app-main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </div>
        </MovieProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
