import React, { useContext, useMemo, useRef } from 'react'
import './Carousel.css'
import CarouselCard from '../CarouselCard/CarouselCard'
import ThreeDHoverGallery from '../../components/lightswind/3d-hover-gallery'
import { MovieContext } from '../../app/MovieContent'

const DEFAULT_IMAGES = [
  "", "", "", "", ""
]

export default function Carousel({
  onSelect,
  // Variant: '3d' hover gallery (default) or 'scroll' simple carousel
  variant = '3d',
  // Shared-ish props
  itemWidth = 220,
  itemGap = 16,
  className,
  ariaLabel = 'carousel',
  // 3D props
  itemHeightVW = 20,
  perspective = 50,
  hoverScale = 1,
  transitionDuration = 1.25,
  backgroundColor,
  grayscaleStrength = 1,
  brightnessLevel = 0.5,
  activeWidth = 45,
  rotationAngle = 35,
  zDepth = 10,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
}) {
  const { movies } = useContext(MovieContext);

  const viewportRef = useRef(null)

  const normalizedItems = useMemo(() => {
    const source = movies && movies.length ? movies : DEFAULT_IMAGES
    return source.map((it, idx) => {
      // if (typeof it === 'string') {
      //   return { id: idx, image: it, title: '' }
      // }
      return {
        id: it.id ?? idx,
        image: `${import.meta.env.VITE_IMAGE_PATH}${it.image ?? it.poster_path ?? it.backdrop_path ?? ''}`,
        title: it.title ?? it.name ?? '',
        meta: it,
      }
    })
  }, [movies])

  if (variant === '3d') {
    const images = normalizedItems.map((x) => x.image || '').filter(Boolean)
    return (
      <ThreeDHoverGallery
        images={images.length ? images : DEFAULT_IMAGES}
        itemWidth={12}
        itemHeight={itemHeightVW}
        gap={Math.max(0.6, itemGap / 16)}
        perspective={perspective}
        hoverScale={hoverScale}
        transitionDuration={transitionDuration}
        backgroundColor={backgroundColor}
        grayscaleStrength={grayscaleStrength}
        brightnessLevel={brightnessLevel}
        activeWidth={activeWidth}
        rotationAngle={rotationAngle}
        zDepth={zDepth}
        enableKeyboardNavigation={enableKeyboardNavigation}
        autoPlay={autoPlay}
        autoPlayDelay={autoPlayDelay}
        className={className}
        onImageClick={(index, _img) => {
          const item = normalizedItems[index]
          if (item) onSelect?.(item, index)
        }}
      />
    )
  }

  const handlePrev = () => {
    const el = viewportRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.9, itemWidth + itemGap)
    el.scrollBy({ left: -amount, behavior: 'smooth' })
  }
  const handleNext = () => {
    const el = viewportRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.9, itemWidth + itemGap)
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className={`ci-carousel ${className ?? ''}`.trim()} aria-label={ariaLabel}>
      <button className="ci-arrow ci-arrow--left" aria-label="Previous" onClick={handlePrev}>
        ‹
      </button>

      <div
        ref={viewportRef}
        className="ci-viewport"
        style={{ gap: `${itemGap}px` }}
        role="region"
      >
        <div className="ci-track" style={{ gap: `${itemGap}px` }}>
          {normalizedItems.map((item, index) => (
            <div
              key={item.id ?? index}
              className="ci-item"
              style={{ minWidth: `${itemWidth}px` }}
            >
              <CarouselCard
                movieId={item.id}
                image={item.image}
                title={item.title}
                onClick={() => onSelect?.(item, index)}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="ci-arrow ci-arrow--right" aria-label="Next" onClick={handleNext}>
        ›
      </button>
    </div>
  )
}
