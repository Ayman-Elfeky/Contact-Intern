import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://newsapi.org/v2",
    params: {
        apiKey: import.meta.env.VITE_API_KEY
    }
});
export default axiosClient;