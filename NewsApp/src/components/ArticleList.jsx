import React, { use, useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import { useContext } from 'react'
import { ArticleContext } from '../context/ArticleContext'
import '../styles/ArticleList.css'

export default function ArticleList()
 { 
    const { Articles} = useContext(ArticleContext);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (Articles.length !== 0) {
            setLoading(false) 
        }
    }, [Articles])
    
    return (
        <div className='article-list'>
            {loading && <p>Loading articles...</p>}
            {!loading && Articles.length === 0 && <p>No articles found.</p>}
            {!loading && Articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
            ))}
        </div>
    )
}
