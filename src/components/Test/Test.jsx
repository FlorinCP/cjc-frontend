import React from 'react';
import style from "./Test.module.css"
import ImageCarousel from "../ImageCarousel/ImageCarousel";

function Test() {

    const images = [
        "/how.svg",
        '/how.svg',
        '/eroare.svg',
        // Add more image URLs here
    ];


    return (<div className={style.testWrapper}>
        <h1>Image Carousel Example</h1>
        <ImageCarousel images={images} />
    </div>);
}

export default Test;