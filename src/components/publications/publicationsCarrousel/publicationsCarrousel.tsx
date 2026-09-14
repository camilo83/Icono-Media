import { useEffect, useState } from 'react';
import './publicationsCarrousel.scss';
import { CustomButton } from '../../shared/button/button';
import { RepoPublications } from '../../../api/publications';
import { Publication } from '../../../model/entity';

const publicationCtrl = new RepoPublications();

export function PublicationsCarrousel() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const publicationsList = await publicationCtrl.getPublications();

        const sortedPublications = publicationsList.sort(
          (a, b) => a.acf.order - b.acf.order
        );

        setPublications(sortedPublications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching publications List:', error);
      }
    };
    fetchPublications();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setVisibleImages(1);
      } else if (window.innerWidth < 700) {
        setVisibleImages(2);
      } else {
        setVisibleImages(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial render

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? publications.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= publications.length - visibleImages;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return null;
  }

  if (publications.length === 0) {
    return null;
  }

  return (
    <div className="publications-carousel-container">
      <div className="carousel-slide-container">
        <div
          className="carousel-slide"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
          }}
        >
          {publications.map((publication, index) => (
            <div
              className="image-wrapper"
              key={index}
              style={{ minWidth: `calc(100% / ${visibleImages})` }}
            >
              <div key={publication.id} className="publication-item">
                <div className="image-container">
                  <img
                    src={publication.acf.image}
                    alt={publication.acf.title}
                  />
                </div>
                <h3>{publication.acf.title}</h3>
                <p>{publication.acf.year}</p>
                <CustomButton
                  title="Descargar"
                  path={publication.acf.document}
                ></CustomButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-arrows">
        <button onClick={goToPrevious} className="left-arrow">
          &#10094;
        </button>
        <div className="carousel-dots">
          {publications.map((_, index) => (
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
