import React, { useContext } from 'react'
import { MovieContext } from '../../app/MovieContent'
import MovieCard from '../../common/MovieCard/MovieCard';
import "./MoviesContainer.css"

export default function MoviesContainer() {
  const { movies } = useContext(MovieContext);
  function goToMovie(id){
    console.log(id)
  }
  function addToFav(id){
    console.log(id)
  }
  return (
    <div className='movie-container'>
   {movies.map(movie=> {
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
 )
}
