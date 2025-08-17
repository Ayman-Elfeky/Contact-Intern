import React, { useContext, useMemo, useRef } from "react";
import "./Carousel.css";
import CarouselCard from "../CarouselCard/CarouselCard";
import ThreeDHoverGallery from "../../components/lightswind/3d-hover-gallery";
import { MovieContext } from "../../app/MovieContent";
import { Link, useNavigate } from "react-router";

const DEFAULT_IMAGES = ["", "", "", "", ""];

export default function Carousel({
  onSelect,
  variant = "3d",
  itemWidth = 150,
  itemGap = 16,
  className,
  ariaLabel = "carousel",
  itemHeightVW = 20,
  perspective = 800,
  hoverScale = 0.5,
  transitionDuration = 1.25,
  backgroundColor,
  grayscaleStrength = 1,
  brightnessLevel = 0.5,
  activeWidth = 20,
  rotationAngle = 35,
  zDepth = 10,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
}) {
  const { movies, loading, error } = useContext(MovieContext);
  const navigate = useNavigate();
  const viewportRef = useRef(null);

  const normalizedItems = useMemo(() => {
    const source = movies && movies.length ? movies : DEFAULT_IMAGES;
    return source.map((it, idx) => ({
      id: it.id ?? idx,
      image: `${import.meta.env.VITE_IMAGE_PATH}${
        it.image ?? it.poster_path ?? it.backdrop_path ?? ""
      }`,
      title: it.title ?? it.name ?? "",
      meta: it,
    }));
  }, [movies]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something Went Wrong</h1>;

  // 3D Variant
  const render3D = () => {
    normalizedItems.length = 6
    const images = normalizedItems
      .map((x) => x.image || "")
      .filter(Boolean)
      .slice(0, 20);

    return (

      <div style={{ padding: "0 20px", textAlign: 'center' }}>
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
          onImageClick={(index) => {
            const item = normalizedItems[index];
            if (item) navigate(`/movie/${item.id}`);
          }}
        />
      </div>
    );
  };

  // Scroll Variant
  const renderScroll = () => {
    const handlePrev = () => {
      const el = viewportRef.current;
      if (!el) return;
      const amount = Math.max(el.clientWidth * 0.9, itemWidth + itemGap);
      el.scrollBy({ left: -amount, behavior: "smooth" });
    };

    const handleNext = () => {
      const el = viewportRef.current;
      if (!el) return;
      const amount = Math.max(el.clientWidth * 0.9, itemWidth + itemGap);
      el.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
      <div
        className={`ci-carousel ${className ?? ""}`.trim()}
        aria-label={ariaLabel}
      >
        <button
          className="ci-arrow ci-arrow--left"
          aria-label="Previous"
          onClick={handlePrev}
        >
          ‹
        </button>

        <div
          ref={viewportRef}
          className="ci-viewport ci-viewport--scrollx"
          style={{
            gap: `${itemGap}px`,
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
          }}
          role="region"
        >
          <div
            className="ci-track"
            style={{
              gap: `${itemGap}px`,
              display: "flex",
              flexDirection: "row",
              minWidth: 0,
            }}
          >
            {normalizedItems.map((item, index) => (
              <div
                key={item.id ?? index}
                className="ci-item"
                style={{ minWidth: `${itemWidth}px` }}
              >
                <Link
                  to={`/movie/${item.id}`}
                  style={{ display: "block", width: "100%", height: "100%" }}
                >
                  <CarouselCard
                    image={item.image}
                    title={item.title}
                    onClick={() => onSelect?.(item, index)}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          className="ci-arrow ci-arrow--right"
          aria-label="Next"
          onClick={handleNext}
        >
          ›
        </button>
      </div>
    );
  };

  return variant === "3d" ? render3D() : renderScroll();
}
