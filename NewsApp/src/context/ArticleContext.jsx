import React, {createContext, useEffect, useMemo, useState} from 'react';
import fetchArticles from '../APIs/HomeArticles';

const ArticleContext = createContext(null);
function ArticleProvider({children}) {
    const [Articles, SetArticles] = useState([]);


      async function getData() {
            console.log("Fetching articles...");
            const data = await fetchArticles();
            SetArticles(data);
        }

    useEffect(() => {
        getData();
        console.log("Articles fetched:", Articles);
    }, []); 
// console.log("End..")

return (
    <ArticleContext.Provider value={{Articles, SetArticles}}>
        {children}
    </ArticleContext.Provider>)
}
export {ArticleContext, ArticleProvider};
