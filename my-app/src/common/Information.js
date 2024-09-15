import React from 'react'
import "./information.css"

const Information = () => {
    return (
        <div className="car-info-container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img
                        src="https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Car Image"
                        className="car-image"
                    />
                </div>
                <div className="col-md-6">
                    <h2>Welcome to First Car Dealership</h2>
                    <p>
                        At First Car Dealership, we are committed to providing you with the highest quality vehicles at competitive prices. Our expert team is here to assist you in finding the perfect car that suits your needs and budget.
                    </p>
                    <p>
                        Whether you are looking for a brand-new car or a certified pre-owned vehicle, we have a wide selection to choose from. Our goal is to ensure a smooth and enjoyable buying experience, from browsing to financing and beyond.
                    </p>
                    <p>
                        Visit us today and discover why we are the preferred choice for car buyers in [City/Region]. Our friendly staff is ready to help you find your next car!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Information
