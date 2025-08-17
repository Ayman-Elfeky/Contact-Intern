import React, { useContext } from 'react'
import { MovieContext } from '../../app/MovieContent'
import MovieCard from '../../common/MovieCard/MovieCard';
import "./MoviesContainer.css"

export default function MoviesContainer({ movieType }) {
  const { movies, favourites, loading, error, addToFavourites, removeFromFavourites } = useContext(MovieContext);
  // Choose which list to show based on movieType prop
  const list = movieType === 'favourites' ? favourites : movies;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  function goToMovie() {
    console.log("WOW")
  }

  if (error) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#ffd700' }}>
        {movieType === 'favourites' ? 'Favourites' : 'Movies'} Section
      </h1>
      <div className='movie-container'>
        {list && list.map((movie, idx) => (
          <MovieCard
            key={idx}
            id={movie.id}
            title={movie.title}
            year={movie.release_date}
            rating={movie.vote_average}
            posterUrl={movie.backdrop_path}
            genres={movie.genre_ids}
            onClick={() => goToMovie(movie.id)}
            onFavourite={(e) => {
              e.stopPropagation();
              console.log("sambosa:", e.target.style.color === 'rgb(248, 113, 113)')
              if(e.target.style.color === 'rgb(248, 113, 113)') {
                removeFromFavourites(movie.id);
                e.target.style.color = 'rgb(238, 219, 219)'
              } else {
                e.target.style.color = '#f87171ff'
                addToFavourites(movie);
              }
            }}
            onRemoveFavourite={() => removeFromFavourites(movie.id)}
            type={movieType}
            isFavourite={movie.isFavourite}
          />
        ))}
      </div>
    </>
  );
}
