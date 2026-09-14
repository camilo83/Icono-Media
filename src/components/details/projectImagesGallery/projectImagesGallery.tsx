import { useEffect, useRef, useState } from 'react';
import './projectImagesGallery.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  images: string[];
};

export function ProjectImagesGallery({ images }: PropsType): JSX.Element {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const projectImagesGallery = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedImg) {
      const heightToScroll = projectImagesGallery.current?.offsetTop;
      window.scrollTo({ top: heightToScroll, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImg]);

  const openModal = (img: string): void => {
    setSelectedImg(img);
  };

  const closeModal = (): void => {
    setSelectedImg(null);
  };

  const nextImage = (): void => {
    if (!selectedImg) return;
    const currentIndex = images.indexOf(selectedImg);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImg(images[nextIndex]);
  };

  const prevImage = (): void => {
    if (!selectedImg) return;
    const currentIndex = images.indexOf(selectedImg);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImg(images[prevIndex]);
  };

  return (
    <>
      {selectedImg && (
        <div className="modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <span className="nav left" onClick={prevImage}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </span>
          <img
            src={selectedImg}
            alt="Gallery Modal"
            className="modal-content"
          />
          <span className="nav right" onClick={nextImage}>
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </span>
        </div>
      )}
      <div className="project-gallery" ref={projectImagesGallery}>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className="img-wrapper"
              onClick={() => openModal(image)}
            >
              <img src={image} alt={`Gallery item ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
