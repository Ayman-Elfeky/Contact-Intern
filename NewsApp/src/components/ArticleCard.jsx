import React, { useEffect } from 'react'
import '../styles/ArticleCard.css'; 
export default function ArticleCard({ article }) {
    return (

<>
        <div className="article-card">
            <img width={200} src={article.urlToImage || null} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>By {article.author} | {new Date(article.publishedAt).toLocaleDateString()}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
           <p>Source: {article.source.name}</p>
        </div>
</>    )
}
