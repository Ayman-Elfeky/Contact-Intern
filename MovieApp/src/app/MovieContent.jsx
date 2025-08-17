import { createContext, useState, useEffect } from 'react'
import { fetchDiscoverMedia } from '../features/Home/homeApi';

export const MovieContext = createContext(null);

export default function MovieProvider({ children }) {
    // const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [movies, setMovies] = useState(() => {
        const saved = localStorage.getItem("movies");
        return saved ? JSON.parse(saved) : []
    })


    useEffect(() => {
        async function getData() {
            try {
                let res = await fetchDiscoverMedia("movie");
                let data = res.map((movie) => {
                    return {
                        ...movie,
                        isFavourite: false
                    }
                })
                console.log("Fetched Movies: ", data[0]);
                setMovies((prev) => prev.length === 0 ? data : prev);
            } catch (error) {
                setError(true)
                console.log("Error From Movie Context: ", error.message)
            } finally {
                setLoading(false)
            }
        }
        getData();
    }, []);

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies))
    }, [movies]);

    const addToFavourites = (movie) => {
        console.log("Adding to favourites: ", movie);
        if (!movies.find((fav) => {fav.id === movie.id && movie.isFavourite})) {
            movie.isFavourite = true;
            setMovies([...movies, movie]);
        }
    }
    const removeFromFavourites = (id) => {
        console.log("Removing from favourites: ", id);
        setMovies((prev) => prev.map((prev.id === id? {...prev, isFavourite: false} : prev)));
    }

    return (
        <MovieContext.Provider value={{ movies, addToFavourites, removeFromFavourites, loading, error }}>
            {children}
        </MovieContext.Provider>
    )
}