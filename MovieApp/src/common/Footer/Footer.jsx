import React, { useContext, useMemo } from 'react'
import './Footer.css'
import { MovieContext } from '../../app/MovieContent'
import { Link } from 'react-router'


export default function Footer({ images, columns = 4, onPosterClick }) {
  const { movies } = useContext(MovieContext)

  const posters = movies.map(movie => {
    return {
      image: `${import.meta.env.VITE_IMAGE_PATH}${movie.backdrop_path}`,
      id: movie.id
    }
  })

  const duplicated = useMemo(() => [...posters, ...posters], [posters])
  const groupSize = Math.ceil(duplicated.length / columns)
  const groups = Array.from({ length: columns }, (_, i) => duplicated.slice(i * groupSize, (i + 1) * groupSize))
  const renderGrid = (copyKey) => (
    <div key={`grid-${copyKey}`} className="marquee-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {groups.map((col, idx) => (
        <div
          key={`col-${copyKey}-${idx}`}
          className="marquee-col"
          style={{
            animationDuration: `${idx % 2 === 0 ? 10 : 15}s`,
            animationDirection: idx % 2 === 0 ? 'normal' : 'reverse',
          }}
        >
          <div className="marquee-col-line" />
          {col.map((src, i) => (
            <Link to={`/movie/${src.id}`}>
              <div key={`img-${copyKey}-${idx}-${i}`} className="marquee-item">
                <div className="marquee-row-line" />
                <img
                  src={typeof src.image === 'string' ? src.image : src?.src.image}
                  alt="Movie poster"
                  className="marquee-img"
                  onClick={() => onPosterClick?.(src.image, (idx * groupSize) + i)}
                />
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <footer className="footer-marquee" aria-label="Movie posters marquee">
      <div className="marquee-stage">
        <div className="marquee-wrap">
          <div className="marquee-stack">
            <div className="marquee-strip">
              {renderGrid('top-left')}
              {renderGrid('top-center')}
              {renderGrid('top-right')}
            </div>
            <div className="marquee-strip">
              {renderGrid('center-left')}
              {renderGrid('center')}
              {renderGrid('center-right')}
            </div>
            <div className="marquee-strip">
              {renderGrid('bottom-left')}
              {renderGrid('bottom-center')}
              {renderGrid('bottom-right')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
