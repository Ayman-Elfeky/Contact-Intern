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
}) {
	return (
		<Link to={`/movie/${id}`}>
			<article className="mc-card" aria-label={`${title} (${year})`}>
				<button className="mc-posterBtn" onClick={() => onClick?.(id)} aria-label={`Open ${title}`}>
					<div className="mc-poster" style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_PATH}${posterUrl})` }} />
				</button>
				<div className="mc-meta">
					<h3 className="mc-title" title={title}>{title}</h3>
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
						<button className="mc-favBtn" onClick={() => onFavourite?.(id)} aria-label="Add to favourites">♥</button>
					</div>
				</div>
			</article>
		</Link>
	)
}
