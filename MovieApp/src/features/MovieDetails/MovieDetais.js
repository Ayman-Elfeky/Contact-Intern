import axiosClient from "../../services/axiosClient";

async function getMovieDetails(id) {
    let res = await axiosClient.get(`/movie/${id}`);
    console.log(res.data)
    return res.data
}

export default getMovieDetails;