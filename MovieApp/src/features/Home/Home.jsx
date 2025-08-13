import React, { use, useEffect, useState } from 'react'
import { fetchDiscoverMedia } from './homeApi'

export default function Home() {
  const [movies, setMovies] = useState([]);

  // image api : https://image.tmdb.org/t/p/w500/

  useEffect(() => {
    async function getData() {
      let data = await fetchDiscoverMedia('movie');
      console.log(data)
      setMovies(data)
    }
    getData();

  }, []);

  return (
    <>
      {/* {movies.map(movie => <h1>{movie.title}</h1>)} */}
    </>
  )
}


