import React from 'react';
import '../../assets/css/Newsletter.css';

const Newsletter = () => {
    return (
        <div className="container">
            <div className="newsletter-wrapper d-flex justify-content-center my-5">
                <form className="newsletter-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="newsletter-input"
                        required
                    />
                    <button type="submit" className="newsletter-btn">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
