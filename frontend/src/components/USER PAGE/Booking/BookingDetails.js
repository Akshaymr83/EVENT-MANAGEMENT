
// import React, { useEffect, useState } from "react"; 
// import axios from "axios";
// import "./Booking.css"; // Ensure you have this CSS file for styling
// import Footer from "../Footer/Footer";
// import Top from "../NAVBAR/Nav";

// const BookingDetails = () => {
  
  
//   const [bookings, setBookings] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user")); // Parse the JSON object
//   const userId = user ? user.userId : null;

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/event/bookings/${userId}`);
//         setBookings(response.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
//       }
//     };

//     if (userId) {
//       fetchBookings(); // Fetch bookings only if userId is available
//     }
//   }, [userId]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/event/bookings/${id}`); // Ensure this matches your DELETE endpoint
//       setBookings(bookings.filter(booking => booking._id !== id));
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//     }
//   };

//   if (!userId) {
//     return <p>Please log in to view your bookings.</p>;
//   }

//   if (bookings.length === 0) {
//     return <p>No bookings found for this user.</p>;
//   }

//   return (
//     <>
//       <Top />
//       <div className="booking-details-container">
//         <div className="bookingBox">
//           <h2>Booking Details</h2>
//           <div className="booking-cards">
//             {bookings.map((booking) => (
//               <div className="booking-card" key={booking._id}>
//                 <h3>{booking.event?.name || "Event Name"}</h3>
//                 <p><strong>Name:</strong> {booking.name}</p>
//                 <p><strong>Email:</strong> {booking.email}</p>
//                 <p><strong>State:</strong> {booking.state}</p>
//                 <p><strong>District:</strong> {booking.district}</p>
//                 <p><strong>Mobile Number:</strong> {booking.mobileNumber}</p>
//                 <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
//                 <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
//                 <p><strong>Total Price:</strong> ${(booking.numberOfPeople * 50).toFixed(2)}</p>
//                 <button className="delete-button" onClick={() => handleDelete(booking._id)}>
//                   Delete Booking
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default BookingDetails;
import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "./Booking.css"; // Ensure you have this CSS file for styling
import Footer from "../Footer/Footer";
import Top from "../NAVBAR/Nav";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Parse the JSON object
  const userId = user ? user.userId : null;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/bookings/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
      }
    };

    if (userId) {
      fetchBookings(); // Fetch bookings only if userId is available
    }
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/bookings/${id}`); // Ensure this matches your DELETE endpoint
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Check for user login
  if (!userId) {
    return <p>Please log in to view your bookings.</p>;
  }

  return (
    <>
      <Top />
      <div className="booking-details-container">
        <div className="bookingBox">
          <h2>Booking Details</h2>
          <div className="booking-cards">
            {bookings.length === 0 ? (  // Conditional rendering for no bookings
              <div className="message-box">
                <span className="error-symbol">⚠️</span>
                <h6>No bookings found for this user.</h6>
              </div>
            ) : (
              bookings.map((booking) => (
                <div className="booking-card" key={booking._id}>
                  <h3>{booking.event?.name || "Event Name"}</h3>
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <p><strong>State:</strong> {booking.state}</p>
                  <p><strong>District:</strong> {booking.district}</p>
                  <p><strong>Mobile Number:</strong> {booking.mobileNumber}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                  <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
                  <p><strong>Total Price:</strong> ${(booking.numberOfPeople * 50).toFixed(2)}</p>
                  <button className="delete-button" onClick={() => handleDelete(booking._id)}>
                    Delete Booking
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingDetails;
