import { useState } from 'react';
import './projectImagesCarrousel.scss';

type PropsType = {
  images: string[];
};

export function ProjectImagesCarrousel({ images }: PropsType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleImages = 3;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - visibleImages + 2;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide-container">
        <div
          className="carousel-slide"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div className="image-wrapper" key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-arrows">
        <button onClick={goToPrevious} className="left-arrow">
          &#10094;
        </button>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
        <button onClick={goToNext} className="right-arrow">
          &#10095;
        </button>
      </div>
    </div>
  );
}
