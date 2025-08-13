import { useState } from "react";
import "./App.css";
import Home from "../features/Home/Home";
import MovieProvider from "./MovieContent";

function App() {
  return (
    <>
    <MovieProvider>
      <Home />
    </MovieProvider>
    </>
  );
}

export default App;
