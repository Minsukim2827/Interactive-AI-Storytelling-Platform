import React, { useState, useEffect } from 'react';
import './../../css/carouselstyle.css';

// Importing images
import image0 from './../../assets/carouselImages/image0.jpg';
import image1 from './../../assets/carouselImages/image1.jpg';
import image2 from './../../assets/carouselImages/image2.jpg';
import image3 from './../../assets/carouselImages/image3.jpg';
import image4 from './../../assets/carouselImages/image4.jpg';
import image5 from './../../assets/carouselImages/image5.jpg';
import image6 from './../../assets/carouselImages/image6.jpg';
import image7 from './../../assets/carouselImages/image7.jpg';

const Carousel = () => {
    const images = [image0, image1, image2, image3, image4, image5, image6, image7];
    const [carouselImages, setCarouselImages] = useState([]);

    useEffect(() => {
        // Duplicate the images array for seamless looping
        setCarouselImages([...images, ...images]);
    }, []);

    return (
        <div className="carousel">
            <div className="carousel-images">
                <div className="carousel-images-slide">
                    {carouselImages.map((src, index) => (
                        <img key={index} className="carousel-img" src={src} alt={`Carousel image ${index % images.length}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
