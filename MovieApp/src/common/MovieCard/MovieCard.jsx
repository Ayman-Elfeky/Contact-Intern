import React from 'react'
import './MovieCard.css'
import { Link } from 'react-router'

export default function MovieCard({
	id,
	title,
	year,
	rating,
	posterUrl,
	genres,
	onClick,
	onFavourite,
	onRemoveFavourite,
	type = 'movies',
}) {
	return (
		<article className="mc-card" aria-label={`${title} (${year})`}>
			<Link to={`/movie/${id}`}>
				<button className="mc-posterBtn" onClick={() => onClick?.(id)} aria-label={`Open ${title}`}>
					<div className="mc-poster" style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_PATH}${posterUrl})` }} />
				</button>
			</Link>
			<div className="mc-meta">
			<Link to={`/movie/${id}`}>
				<h3 className="mc-title" title={title}>{title}</h3>
			</Link>
				<div className="mc-sub">
					<span className="mc-year">{year}</span>
					<span className="mc-dot">•</span>
					<span className="mc-genres">{Array.isArray(genres) ? genres.join(', ') : genres}</span>
				</div>
				<div className="mc-row">
					<div className="mc-rating" aria-label={`Rating ${rating}/10`}>
						<span className="mc-star">★</span>
						<span>{Number(rating).toFixed(1)}</span>
					</div>
					{type === 'movies' && (
						<button className="mc-favBtn" onClick={(e) => onFavourite?.(e)} aria-label="Add to favourites">♥</button>
					)}
					{type === 'favourites' && (
						<button className="mc-deleteBtn" onClick={() => onRemoveFavourite?.()} aria-label="Remove from favourites">❌</button>
					)}
				</div>
			</div>
		</article>
	)
}
