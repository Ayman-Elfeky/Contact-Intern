import React from 'react'
import './CarouselCard.css'
import { Link } from 'react-router'

export default function CarouselCard({ movieId, image, title, onClick }) {
  return (
    <Link to={`/movie/${movieId}`}>
      <button className="ci-card" onClick={onClick} aria-label={title || 'Open'}>
        <div className="ci-card__media" style={{ backgroundImage: `url(${image})` }} />
        {(title ?? '').length > 0 && (
          <div className="ci-card__overlay">
            <span className="ci-card__title">{title}</span>
          </div>
        )}  
      </button>
    </Link>
  )
}
