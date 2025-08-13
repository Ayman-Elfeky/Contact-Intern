import React, { useMemo } from 'react'
import './Footer.css'

const DEFAULT_POSTERS = [
  'https://images.pexels.com/photos/26797335/pexels-photo-26797335/free-photo-of-scenic-view-of-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/12194487/pexels-photo-12194487.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/32423809/pexels-photo-32423809/free-photo-of-aerial-view-of-kayaking-at-robberg-south-africa.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/32296519/pexels-photo-32296519/free-photo-of-rocky-coastline-of-cape-point-with-turquoise-waters.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/32396739/pexels-photo-32396739/free-photo-of-serene-motorcycle-ride-through-bamboo-grove.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/32304900/pexels-photo-32304900/free-photo-of-scenic-view-of-cape-town-s-twelve-apostles.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/32437034/pexels-photo-32437034/free-photo-of-fisherman-holding-freshly-caught-red-drum-fish.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2',
  'https://images.pexels.com/photos/32469847/pexels-photo-32469847/free-photo-of-deer-drinking-from-natural-water-source-in-wilderness.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&dpr=2'
]

export default function Footer({ images, columns = 4, onPosterClick }) {
  const posters = Array.isArray(images) && images.length ? images : DEFAULT_POSTERS
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
            <div key={`img-${copyKey}-${idx}-${i}`} className="marquee-item">
              <div className="marquee-row-line" />
              <img
                src={typeof src === 'string' ? src : src?.src}
                alt="Movie poster"
                className="marquee-img"
                onClick={() => onPosterClick?.(src, (idx * groupSize) + i)}
              />
            </div>
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
