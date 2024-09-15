import "./crousel.css"
import React from 'react';

const Carousel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide custom-carousel" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://wallpapers.com/images/high/chevrolet-car-green-5120x1440-m9ipziozir9x5sl8.webp" className="d-block w-75 mx-auto" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                    <img src="https://wallpapers.com/images/high/4k-ultra-hd-mustang-geiger-ford-gt-820-0h56eze8watrdr5u.webp" className="d-block w-75 mx-auto" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-75 mx-auto" alt="Slide 3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
