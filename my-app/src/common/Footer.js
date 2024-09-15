import React from 'react';
import './Footer.css'; // Create a CSS file for custom styles

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-white">
                        <h5>Contact Us</h5>
                        <p>
                            <strong>Address:</strong><br />
                            123 Main Street,<br />
                            Anytown, USA
                        </p>
                        <p>
                            <strong>Phone:</strong><br />
                            (123) 456-7890
                        </p>
                        <p>
                            <strong>Email:</strong><br />
                            info@cardealership.com
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5>Follow Us</h5>
                        <ul className="social-links list-unstyled">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>&copy; 2024 [Car Dealership Name]. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
