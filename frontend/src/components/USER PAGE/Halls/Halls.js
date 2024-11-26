// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Import the icon
// import { useNavigate } from 'react-router-dom';
// import '../Halls/hallGallery.css';

// function Halls() {
//   const [eventHalls, setEventHalls] = useState([]);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [currentImages, setCurrentImages] = useState([]); // State to store current hall images
//   const [activeIndex, setActiveIndex] = useState(0); // Track active image index for the modal
//   const navigate = useNavigate();

//   // Fetch event halls from API
//   const fetchEventHalls = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/eventHall/eventhalls');
//       setEventHalls(response.data);
//     } catch (error) {
//       console.error("Error fetching event halls:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEventHalls();
//   }, []);

//   const handleView = (hall) => {
//     setCurrentImages(hall.images); // Set the images of the selected hall
//     setShowModal(true); // Show the modal
//   };

//   const closeModal = () => {
//     setShowModal(false); // Hide the modal
//   };

//   const handleThumbnailClick = (index) => {
//     setActiveIndex(index); // Update the active index when a thumbnail is clicked
//   };

//   return (
    
//     <div className="event-hall-grid">
      
//       {eventHalls.map((hall) => (
//         <div key={hall._id} className="event-hall-card">
//           <div className="card-body">
//             <h5 className="card-title">{hall.name}</h5>
//             <p className="card-text">Location: {hall.location}</p>
//             <p className="card-text">Description: {hall.description}</p>
//             <p className="card-text">Price: ${hall.price}</p>

//             {/* Display the first image of the hall */}
//             {hall.images && hall.images.length > 0 && (
//               <img
//                 className="d-block w-100"
//                 src={`http://localhost:5000/images/${hall.images[0].split('\\').pop()}`}
//                 alt={`${hall.name} - First image`}
//               />
//             )}

//             <div className="two-buttons">
//               <button className="btn btn-primary" style={{width:'100%'}} onClick={() => handleView(hall)}>View</button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Modal for gallery */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//           <button onClick={closeModal} className="close-btn">
//               <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#000000", fontSize: "30px" }} />
//             </button>
//             <div className="gallery-container">
//               {/* Main Image Display */}
//               <div className="main-image">
//                 <img src={`http://localhost:5000/images/${currentImages[activeIndex].split('\\').pop()}`} alt={`Image ${activeIndex + 1}`} />
//               </div>

//               {/* Thumbnails */}
//               <div className="thumbnails">
//                 {currentImages.map((image, index) => (
//                   <div
//                     key={index}
//                     className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
//                     onClick={() => handleThumbnailClick(index)}
//                   >
//                     <img src={`http://localhost:5000/images/${image.split('\\').pop()}`} alt={`Thumbnail ${index + 1}`} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
    
//   );
// }

// export default Halls;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import { useNavigate } from 'react-router-dom';
import '../Halls/hallGallery.css';

function Halls() {
  const [eventHalls, setEventHalls] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentImages, setCurrentImages] = useState([]); // State to store current hall images
  const [activeIndex, setActiveIndex] = useState(0); // Track active image index for the modal
  const navigate = useNavigate();
  const carouselRef = useRef(null); // Ref for the carousel container

const handleNext = () => {
  if (carouselRef.current) {
    const cardWidth = carouselRef.current.children[0].offsetWidth; // Width of a single card
    carouselRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth',
    });
  }
};

const handlePrev = () => {
  if (carouselRef.current) {
    const cardWidth = carouselRef.current.children[0].offsetWidth; // Width of a single card
    carouselRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth',
    });
  }
};

  // Fetch event halls from API
  const fetchEventHalls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/eventHall/eventhalls');
      setEventHalls(response.data);
    } catch (error) {
      console.error("Error fetching event halls:", error);
    }
  };

  useEffect(() => {
    fetchEventHalls();
  }, []);

  const handleView = (hall) => {
    setCurrentImages(hall.images); // Set the images of the selected hall
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index); // Update the active index when a thumbnail is clicked
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner-container" id="banner-background">
        <div className="banner-text">
          <h1>Welcome to Premium Event Halls</h1>
          <p>
            Discover the perfect venue for your special occasions. From weddings
            to corporate events, our carefully curated halls offer elegance,
            comfort, and state-of-the-art facilities.
          </p>
          <button className="btn btn-primary">Contact Us</button>
        </div>
      
      </div>

      {/* Advertisement Section */}
      <div className="advertisement">
        <h2>Special Offers This Month</h2>
        <h6>
          Book now and get up to <strong>30% OFF</strong> on select halls!
        </h6>
        <button className="offer-Button">View Offers</button>
      </div>

      <div className="carousel-container">
  <button className="carousel-btn prev" onClick={handlePrev}>
    &#8249;
  </button>
  <div className="event-hall-grid-user" ref={carouselRef}>
    {eventHalls.map((hall) => (
      <div key={hall._id} className="event-hall-card-user">
        <div className="card-body-user">
          <h5 className="card-title">{hall.name}</h5>
          <p className="card-text">Location: {hall.location}</p>
          {/* Display the first image of the hall */}
          {hall.images && hall.images.length > 0 && (
            <img
              className="d-block w-100"
              src={`http://localhost:5000/images/${hall.images[0].split('\\').pop()}`}
              alt={`${hall.name} - First image`}
            />
          )}
          <div className="two-buttons">
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleView(hall)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  <button className="carousel-btn next" onClick={handleNext}>
    &#8250;
  </button>
</div>


      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-item">
          <p>
            "The hall was stunning and the services exceeded our expectations. A
            big thanks to the team for making our day unforgettable!"
          </p>
          <h5>- John Doe</h5>
        </div>
        <div className="testimonial-item">
          <p>
            "Everything was perfect, from the decor to the facilities. I highly
            recommend these event halls!"
          </p>
          <h5>- Sarah Smith</h5>
        </div>
      </div>

      {/* Call-to-Action Section */}
    

      {/* Modal for Gallery */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button onClick={closeModal} className="close-btn">
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: '#000000', fontSize: '30px' }}
              />
            </button>
            <div className="gallery-container">
              {/* Main Image Display */}
              <div className="main-image">
                <img
                  src={`http://localhost:5000/images/${currentImages[
                    activeIndex
                  ].split('\\').pop()}`}
                  alt={`Image ${activeIndex + 1}`}
                />
              </div>

              {/* Thumbnails */}
              <div className="thumbnails">
                {currentImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      index === activeIndex ? 'active' : ''
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={`http://localhost:5000/images/${image
                        .split('\\')
                        .pop()}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hall-details">
        {/* Assuming the hall object is the first item in eventHalls matching the current images */}
        {eventHalls
          .filter(hall => hall.images && hall.images[0] === currentImages[0])
          .map(hall => (
            <div key={hall._id}>
              <h3>{hall.name}</h3>
              <p><strong>Location:</strong> {hall.location}</p>
              <p><strong>Description:</strong> {hall.description}</p>
              <p><strong>Price:</strong> ${hall.price}</p>
              <button> Book Now</button>
            </div>
          ))}
      </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Halls;
