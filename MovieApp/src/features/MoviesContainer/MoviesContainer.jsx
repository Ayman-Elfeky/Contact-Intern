import React, { useContext } from 'react'
import { MovieContext } from '../../app/MovieContent'
import MovieCard from '../../common/MovieCard/MovieCard';
import "./MoviesContainer.css"

export default function MoviesContainer() {
  const { movies, loading, error } = useContext(MovieContext);
  
  function addToFav(id) {
    console.log(id)
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <h1>Something Went Wrong</h1>
  }

  return (
    <>
    <h1 style={{textAlign: 'center', color: '#ffd700'}}>Movies Section</h1>
    <div className='movie-container'>
      {movies.map(movie => {
        return (
          <MovieCard
            id={movie.id}
            title={movie.title}
            year={movie.release_date}
            rating={movie.vote_average}
            posterUrl={movie.backdrop_path}
            genres={movie.genre_ids}
            onClick={() => goToMovie(movie.id)}
            onFavourite={() => addToFav(movie.id)}
          />
        )
      }
      )}

    </div>
    </>
  )
}
