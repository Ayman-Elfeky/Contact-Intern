import React from 'react'
import './CarouselCard.css'

export default function CarouselCard({ image, title, onClick }) {
  return (
    <button className="ci-card" onClick={onClick} aria-label={title || 'Open'}>
      <div className="ci-card__media" style={{ backgroundImage: `url(${image})` }} />
      {(title ?? '').length > 0 && (
        <div className="ci-card__overlay">
          <span className="ci-card__title">{title}</span>
        </div>
      )}
    </button>
  )
}
