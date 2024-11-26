import React from 'react';
import '../Halls/hallGallery.css';
import { Link } from 'react-router-dom';
import img from '../images/decorated-banquet-hall-with-flowers.jpg';
import '../Halls/hallGallery.css';

function HallBanner() {
  return (
    <div className="hall-banner">
      <div className='Contact-Title'>
        <h1>BOOK <span>US</span></h1>
      </div>

      <div className='banner-container'>
        <div className='banner-image'>
          <img src={img} alt="Decorated Banquet Hall" />
        </div>
        <div className='banner-text'>
          <h3>Get Your Booking Done</h3>
          <p>Save 50% cash, by ordering through us</p>
          <Link to={'/halls'}>
            <button>Bookings</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HallBanner;
