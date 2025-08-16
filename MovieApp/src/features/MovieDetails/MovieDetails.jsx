
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import getMovieDetails from './MovieDetais';
import './MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function getData() {
        try {
            let res = await getMovieDetails(id);
            setMovie(res);
        } catch (error) {
            setError(true);
            console.error('Error: ', error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <h1 className="movie-details-loading">Loading...</h1>;
    }

    if (error || !movie) {
        return <h1 className="movie-details-error">Something Went Wrong</h1>;
    }

    const imageBase = import.meta.env.VITE_IMAGE_PATH;
    const backdropUrl = movie.backdrop_path ? `${imageBase}${movie.backdrop_path}` : '';
    const posterUrl = movie.poster_path ? `${imageBase}${movie.poster_path}` : '';

    return (
        <div
            className="movie-details-container"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${backdropUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="movie-details-blur">
                <div className="movie-details-content">
                    <img className="movie-details-poster" src={posterUrl} alt={movie.title} />
                    <div className="movie-details-info">
                        <h1 className="movie-details-title">{movie.title}</h1>
                        {movie.tagline && <h2 className="movie-details-tagline">{movie.tagline}</h2>}
                        <div className="movie-details-genres">
                            {movie.genres && movie.genres.map((g) => (
                                <span key={g.id} className="movie-details-genre">{g.name}</span>
                            ))}
                        </div>
                        <p className="movie-details-overview">{movie.overview}</p>
                        <div className="movie-details-meta">
                            <span><strong>Release Date:</strong> {movie.release_date}</span>
                            <span><strong>Runtime:</strong> {movie.runtime} min</span>
                            <span><strong>Rating:</strong> {movie.vote_average} / 10</span>
                            <span><strong>Status:</strong> {movie.status}</span>
                        </div>
                        <div className="movie-details-production">
                            <strong>Production Companies:</strong>
                            <div className="movie-details-companies">
                                {movie.production_companies && movie.production_companies.map((c) => (
                                    <div key={c.id} className="movie-details-company">
                                        {c.logo_path && <img src={`${imageBase}${c.logo_path}`} alt={c.name} className="movie-details-company-logo" />}
                                        <span>{c.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {movie.homepage && (
                            <a href={movie.homepage} className="movie-details-homepage" target="_blank" rel="noopener noreferrer">
                                Official Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;