import { createContext, useState, useEffect } from 'react'
import { fetchDiscoverMedia } from '../features/Home/homeApi';

export const MovieContext = createContext(null);

export default function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem("favourites");
        return saved ? JSON.parse(saved) : []
    })


    useEffect(() => {
        async function getData() {
            try {
                let data = await fetchDiscoverMedia("movie");
                console.log(data);
                setMovies(data);
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
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }, [favourites]);

    const addToFavourites = (movie) => {
        if (!favourites.find((fav) => fav.id === movie.id)) {
            setFavourites([...favourites, movie])
        }
    }
    const removeFromFavourites = (id) => {

        setFavourites(favourites.filter((movie) => movie.id !== id))
    }

    return (
        <MovieContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, movies, loading, error }}>
            {children}
        </MovieContext.Provider>
    )
}