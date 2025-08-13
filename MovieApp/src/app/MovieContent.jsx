import {createContext, useState, useEffect} from 'react'
import { fetchDiscoverMedia } from '../features/Home/homeApi';

export const MovieContext = createContext(null);

export default function MovieProvider ({children}) {
    const [movies, setMovies] = useState([]);

    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem("favourites");
        return saved ? JSON.parse(saved) : []
    })

    
      useEffect(() => {
        async function getData() {
          let data = await fetchDiscoverMedia("movie");
          console.log(data);
          setMovies(data);
        }
        getData();
      }, []);

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }, [favourites]);

    const addToFavourites = (movie) => {
        if(!favourites.find((fav) => fav.id === movie.id)) {
            setFavourites([...favourites, movie])
        }
    }
    const removeFromFavourites = (id) => {

        setFavourites(favourites.filter((movie) => movie.id !== id))
    }

    return (
        <MovieContext.Provider value={{favourites, addToFavourites, removeFromFavourites, movies}}>
            {children}
        </MovieContext.Provider>
    )
}