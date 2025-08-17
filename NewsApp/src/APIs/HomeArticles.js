import axiosClient from "../services";

async function fetchArticles(){
    try {
        let response = await axiosClient.get("/everything", {
            params: {
                q: "keyword"
            }
        });
        return response.data.articles || [];        
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}
export default fetchArticles;