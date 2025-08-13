import React, { useContext, useEffect, useState } from "react";
import { fetchDiscoverMedia } from "./homeApi";
import Carousel from "../../common/Carousel/Carousel";
import MovieCard from "../../common/MovieCard/MovieCard";
import NavBar from "../../common/NavBar/NavBar";
import Footer from "../../common/Footer/Footer";
import { MovieContext } from "../../app/MovieContent";

export default function Home() {
  
  let {movies} = useContext(MovieContext);

  console.log(movies)

  return (
    <>
      {/* <NavBar /> */}
      <Carousel />

      
      {/* <Footer /> */}
    </>
  );
}
