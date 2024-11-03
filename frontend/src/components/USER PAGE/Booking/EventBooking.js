import React from 'react'
import Booking from './Booking'
import './Booking.css'
import Footer from '../Footer/Footer'

function EventBooking() {
  const userId = localStorage.getItem('userId'); 
  return (
    <>
    <div className="parallax-background">
      <div className="booking-overlay">
        <Booking userId={userId}/>
      </div>
   
      
    </div>
    <Footer />
    
    </>
   
  )
}

export default EventBooking
