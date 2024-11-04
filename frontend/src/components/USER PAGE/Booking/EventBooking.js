// import React from 'react'
// import Booking from './Booking'
// import './Booking.css'
// import Footer from '../Footer/Footer'

// function EventBooking() {
//   const userId = localStorage.getItem('user'); 
//   console.log(userId)
//   return (
//     <>
//     <div className="parallax-background">
//       <div className="booking-overlay">
//         <Booking userId={userId}/>
//       </div>
   
      
//     </div>
//     <Footer />
    
//     </>
   
//   )
// }

// export default EventBooking
import React from 'react';
import Booking from './Booking';
import './Booking.css';
import Footer from '../Footer/Footer';

function EventBooking() {
  // Get the user data from local storage and parse it
  
  return (
    <>
      <div className="parallax-background">
        <div className="booking-overlay">
          {/* Pass the userId to the Booking component */}
          <Booking  />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventBooking;
