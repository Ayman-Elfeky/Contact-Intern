import axiosClient from "../../services/axiosClient";

export const fetchPopularMovies = async () => {
    const res = await axiosClient.get("/discover/movie", {
        params: {
            sort_by: "popularity.desc"
        }
    });
    return res.data.results;
};
