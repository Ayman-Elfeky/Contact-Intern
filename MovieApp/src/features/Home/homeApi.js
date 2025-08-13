import axiosClient from "../../services/axiosClient";

export const fetchDiscoverMedia = async (media) => {
    const res = await axiosClient.get(`/discover/${media}`, {
        params: {
            sort_by: "popularity.desc"
        }
    });
    return res.data.results;
};

