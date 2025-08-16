import { useContext } from "react"
import { MovieContext } from "../../app/MovieContent"
import MovieCard from "../../common/MovieCard/MovieCard"
import '../MoviesContainer/MoviesContainer.css'

export default function Favourites() {
  const { favourites, removeFromFavourites } = useContext(MovieContext)

  return (
    <div style={{ marginTop: '20px', padding: '20px'}}>
      <h1 style={{ textAlign: 'center', color: '#ffd700' }}>My Favourites</h1>
      <div className='movie-container'>
        {favourites && favourites.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.release_date}
            rating={movie.vote_average}
            posterUrl={movie.backdrop_path}
            genres={movie.genre_ids}
            onClick={() => goToMovie(movie.id)}
            onRemoveFavourite={() => removeFromFavourites(movie.id)}
            type='favourites'
          />
        ))}
      </div>
    </div>
  )
}
  