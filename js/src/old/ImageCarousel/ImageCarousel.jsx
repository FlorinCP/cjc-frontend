import React, { useEffect, useState } from "react";
import style from "./ImageCarousel.module.css";

const ImageCarousel = () => {
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

  const images = ["/judge_set1.jpg", "/Lawyer.jpg", "/imobiliar.jpg"];

  const interval = 12500;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images, interval]);

  const slides = [
    <div key={0} className={style.carouselSlide}>
      <section>
        <h2 className={style.why}>De ce sa aplelati la serviciile noastre?</h2>

        <h2 className={style.slideInfo}>
          Când vine vorba de probleme juridice, fie că sunteți un individ sau o
          întreprindere,
          <br />
          <span className={style.keyWord}>accesul rapid la sfaturi</span> și
          asistență de la experți în domeniu este esențial.
        </h2>
      </section>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
    </div>,

    <div key={1} className={style.carouselSlide}>
      <section>
        <h2 className={style.why}>Servicii Personalizate</h2>

        <h2 className={style.slideInfo}>
          Înțelegem că fiecare caz este unic, iar nevoile dumneavoastră pot
          varia. <br />
          De aceea, oferim{" "}
          <span className={style.keyWord}>
            consultanță juridică personalizată
          </span>
          , adaptată situației dumneavoastră specifice.
        </h2>
      </section>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
    </div>,

    <div key={2} className={style.carouselSlide}>
      <section>
        <h2 className={style.why}>Litigii Legate de Moșteniri</h2>
        <h2 className={style.slideInfo}>
          Litigiile legate de moșteniri pot deveni adesea un subiect sensibil și
          complex pentru familiile implicate. <br />
        </h2>
        <h2 className={style.slideInfo}>
          În astfel de situații, este crucial să aveți{" "}
          <span className={style.keyWord}>acces la informații și resurse</span>{" "}
          care vă pot ajuta să navigați cu încredere prin procesul de
          soluționare a disputei moștenirii.
        </h2>
      </section>
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

  const handleSwipe = (e) => {
    const threshold = 100;
    const deltaX = e.clientX - startX;

    if (deltaX > threshold) {
      setCurrentIndex((prevSlide) => Math.max(prevSlide - 1, 0));
    } else if (deltaX < -threshold) {
      setCurrentIndex((prevSlide) =>
        Math.min(prevSlide + 1, images.length - 1),
      );
    }
  };

  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleSwipe(e.touches[0]);
  };

  const handleTouchEnd = () => {
    startX = 0;
  };

  return (
    <div className={style.carousel}>
      <button onClick={goToPreviousSlide} className={style.prevButton}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <div
        className="carousel-slide-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides[currentIndex]}
      </div>
      <button onClick={goToNextSlide} className={style.nextButton}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
      <div className={style.navigation}>
        {slides.map((slide, index) => (
          <button
            aria-label="Navigate through slides button"
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
