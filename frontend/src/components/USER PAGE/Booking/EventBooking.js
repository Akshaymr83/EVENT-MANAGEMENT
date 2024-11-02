import React from 'react'
import Booking from './Booking'
import './Booking.css'
import Footer from '../Footer/Footer'

function EventBooking() {
  return (
    <>
    <div className="parallax-background">
      <div className="booking-overlay">
        <Booking />
      </div>
   
      
    </div>
    <Footer />
    
    </>
   
  )
}

export default EventBooking
