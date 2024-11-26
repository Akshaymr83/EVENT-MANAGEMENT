// import React from 'react'

// import bgimg from '../images/festive-men-women-holding-balloons.jpg'
// import './Services.css'
// function Services() {
//   return (
//     <>
//     <div className="services" id='services' >
//         {/* <Top/> */}
//         <div  style={{marginTop:'4rem',marginBottom:'3rem'}}> 
//             <h1 className='About-head2' style={{textAlign:'center',fontWeight:'700'}} >OUR <span style={{color:'rgba(255, 214, 0, 1)'}} >SERVICES</span></h1>
//             <p className='service-text'>At Click Bytes, we offer a comprehensive range of services designed to make every event and project exceptional. Our dedicated team ensures that every detail is taken care of, 
//                 allowing you to enjoy a seamless and memorable experience. Discover what we can do for you:At Click Bytes, we offer a comprehensive range of services designed to make every event and project exceptional. Our dedicated team ensures that every detail is taken care of, 
//                 allowing you to enjoy a seamless and memorable experience. Discover what we can do for you:</p>
//         </div>
//         <h1 style={{fontWeight:'600'}}>Event Management</h1>

//         <div className="destination__grid">
//           <div className="destination__card">
//             <img src={bgimg} alt="destination" />
//             <div className="destination__details">
//               <p className="destination__title">Banff</p>
//               <p className="destination__subtitle">Canada</p>
//             </div>
//           </div>
//           <div className="destination__card">
//             <img src={bgimg} alt="destination" />
//             <div className="destination__details">
//               <p className="destination__title">Banff</p>
//               <p className="destination__subtitle">Canada</p>
//             </div>
//           </div>
//           <div className="destination__card">
//             <img src={bgimg} alt="destination" />
//             <div className="destination__details">
//               <p className="destination__title">Banff</p>
//               <p className="destination__subtitle">Canada</p>
//             </div>
//           </div>

//           <div className="destination__card">
//             <img src={bgimg} alt="destination" />
//             <div className="destination__details">
//               <p className="destination__title">Banff</p>
//               <p className="destination__subtitle">Canada</p>
//             </div>
//           </div>


//           </div>

               
      
//         </div>
//     </>
//   )
// }

// export default Services


import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Services.css';

function Services() {
  const [events, setEvents] = useState([]); // State to store events

  useEffect(() => {
    // Fetch events from the backend
    axios.get('http://localhost:5000/api/admin/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <div className="services" id="services">
        <div style={{ marginTop: '4rem', marginBottom: '3rem' }}>
          <h1 className="About-head2" style={{ textAlign: 'center', fontWeight: '700' }}>
            OUR <span style={{ color: 'rgba(255, 214, 0, 1)' }}>SERVICES</span>
          </h1>
          <p className="service-text">
            At Click Bytes, we offer a comprehensive range of services designed to make every event and project exceptional.
            Our dedicated team ensures that every detail is taken care of, allowing you to enjoy a seamless and memorable experience.
          </p>
        </div>
        <h1 style={{ fontWeight: '600' }}>Event Management</h1>

        <div className="destination__grid">
          {events.map(event => (
            <div className="destination__card" key={event._id}>
              <div className='headingBox'>
              <h4 className= "destination__heading">{event.category}</h4>
                </div>
              
              <div className="destination__details">
               
                <p className="destination__title"></p>
                <p className="destination__subtitle">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
