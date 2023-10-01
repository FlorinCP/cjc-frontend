import React, { useState } from "react";
import style from "./ImageCarousel.module.css";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return slides.map((slide, index) => (
      <span
        key={index}
        className={style.carouselDot}
        onClick={() => goToSlide(index)}
      ></span>
    ));
  };

  const slides = [
    <div key={0} className={style.carouselSlide}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
    </div>,
    <div key={1} className={style.carouselSlide}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
    </div>,
    <div key={2} className={style.carouselSlide}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
    </div>,
  ];

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <div className={style.carousel}>
      <button onClick={goToPreviousSlide} className={style.prevButton}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <div className="carousel-slide-container">{slides[currentIndex]}</div>
      <button onClick={goToNextSlide} className={style.nextButton}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
      <div className={style.navigation}>
        {slides.map((slide, index) => (
          <button
            key={index}
            className={
              currentIndex === index
                ? style.carouselDot
                : style.carouselDotInactive
            }
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
