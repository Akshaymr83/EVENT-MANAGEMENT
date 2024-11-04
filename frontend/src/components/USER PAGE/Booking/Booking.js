


// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Modal from "react-modal";
// import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
// import axios from "axios";
// import "./Booking.css";
// import { useNavigate } from "react-router-dom";
// import Top from "../NAVBAR/Nav";

// const Booking = () => {
//   const userData = localStorage.getItem('user');
//   const user = userData ? JSON.parse(userData) : null; // Parse the JSON string if it exists
//   const userId = user ? user.userId : null; // Extract userId if user is not null

//   console.log("User ID:", userId); // Log userId for debugging


//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     state: "",
//     district: "",
//     mobileNumber: "", // Changed from "mobile" to "mobileNumber" to match backend
//     event: "",
//     bookingDate: new Date(),
//     numberOfPeople: 1,
//   });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [events, setEvents] = useState([]);
//   const ticketPrice = 50; // Price per ticket
//   const navigate = useNavigate()

//   // Fetch events from the backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/admin/events");
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "event") {
//       const selectedEvent = events.find((event) => event._id === value);
//       setFormData({ ...formData, event: selectedEvent?._id });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle date change
//   const handleDateChange = (date) => {
//     setFormData({ ...formData, bookingDate: date });
//   };

//   // Open modal for confirmation
//   const handleConfirm = () => {
//     setTotalPrice(formData.numberOfPeople * ticketPrice);
//     setModalOpen(true);
//   };

//   // Final submit after confirmation
// // Final submit after confirmation
// const handleFinalSubmit = async () => {
//   // Prepare booking data
//   const bookingData = {
//     userId,
//     name: formData.name,
//     email: formData.email,
//     state: formData.state,
//     district: formData.district,
//     mobileNumber: formData.mobileNumber,
//     bookingDate: formData.bookingDate,
//     numberOfPeople: formData.numberOfPeople,
//     event: formData.event
//   };

//   // Log the booking data to the console
//   console.log('Booking data:', bookingData);

//   try {
//     const response = await axios.post("http://localhost:5000/api/event/bookings", bookingData);
//     console.log("Booking response:", response.data); // Log response
//     alert("Booking Confirmed!");
//     setModalOpen(false);
//     navigate("/bookingDetails");
//   } catch (error) {
//     if (error.response) {
//       console.error("Error submitting booking:", error.response.data);
//       alert(`Failed to confirm booking: ${error.response.data.message}`);
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//       alert("Failed to confirm booking. No response from server.");
//     } else {
//       console.error("Error in request setup:", error.message);
//       alert("Failed to confirm booking. Please try again.");
//     }
//   }
// };
  

//   return (
//     <>
//     <Top/>
//     <div className="booking-container">
     
//       <h2>Event Booking System</h2>

//       <form className="booking-form">
//   <div className="form-group">
//     <label> Name:</label>
//     <input
//       type="text"
//       name="name"
//       value={formData.name}
//       onChange={handleInputChange}
//       placeholder="Enter your name"
//       required
//     />
//   </div>

//   <div className="form-group">
//     <label> Email:</label>
//     <input
//       type="email"
//       name="email"
//       value={formData.email}
//       onChange={handleInputChange}
//       placeholder="Enter your email"
//       required
//     />
//   </div>

//   <div className="form-group">
//     <label>State:</label>
//     <input
//       type="text"
//       name="state"
//       value={formData.state}
//       onChange={handleInputChange}
//       placeholder="Enter your state"
//       required
//     />
//   </div>

//   <div className="form-group">
//     <label>District:</label>
//     <input
//       type="text"
//       name="district"
//       value={formData.district}
//       onChange={handleInputChange}
//       placeholder="Enter your district"
//       required
//     />
//   </div>

//   <div className="form-group">
//     <label> Mobile Number:</label>
//     <input
//       type="tel"
//       name="mobileNumber"
//       value={formData.mobileNumber}
//       onChange={handleInputChange}
//       placeholder="Enter your mobile number"
//       required
//     />
//   </div>

//   <div className="form-group">
//     <label>Select Event:</label>
//     <select
//       name="event"
//       value={formData.event}
//       onChange={handleInputChange}
//       required
//     >
//       <option value="">Choose an event</option>
//       {events.map((event) => (
//         <option key={event._id} value={event._id}>
//           {event.name}
//         </option>
//       ))}
//     </select>
//   </div>

//   <div className="form-group">
//     <label> Booking Date:</label>
//     <DatePicker
//       selected={formData.bookingDate}
//       onChange={handleDateChange}
//       dateFormat="Pp"
//       minDate={new Date()}
//       required
//     />
//   </div>

//   <div className="form-group">
//     <label>Number of People:</label>
//     <input
//       type="number"
//       name="numberOfPeople"
//       value={formData.numberOfPeople}
//       onChange={handleInputChange}
//       min="1"
//       max="10"
//       required
//     />
//   </div>

//   <button type="button" onClick={handleConfirm} className="confirm-btn full-width">
//     Confirm Booking
//   </button>
// </form>


//       <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal-content">
//         <h2>Confirm Your Booking</h2>
//         <p><strong>Name:</strong> {formData.name}</p>
//         <p><strong>Email:</strong> {formData.email}</p>
//         <p><strong>State:</strong> {formData.state}</p>
//         <p><strong>District:</strong> {formData.district}</p>
//         <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
//         <p><strong>Event:</strong> {events.find((event) => event._id === formData.event)?.name}</p>
//         <p><strong>Date:</strong> {formData.bookingDate.toLocaleString()}</p>
//         <p><strong>Number of People:</strong> {formData.numberOfPeople}</p>
//         <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
//         <button onClick={handleFinalSubmit} className="submit-btn">
//           Confirm and Submit
//         </button>
//         <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
//       </Modal>
//     </div>
//     </>
//   );
// };

// export default Booking;





import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";
import "./Booking.css";
import { useNavigate } from "react-router-dom";
import Top from "../NAVBAR/Nav";

const Booking = () => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null; // Parse the JSON string if it exists
  const userId = user ? user.userId : null; // Extract userId if user is not null

  console.log("User ID:", userId); // Log userId for debugging


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state: "",
    district: "",
    mobileNumber: "", // Changed from "mobile" to "mobileNumber" to match backend
    event: "",
    bookingDate: new Date(),
    numberOfPeople: 1,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [events, setEvents] = useState([]);
  const ticketPrice = 50; // Price per ticket
  const navigate = useNavigate()

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "event") {
      const selectedEvent = events.find((event) => event._id === value);
      setFormData({ ...formData, event: selectedEvent?._id });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({ ...formData, bookingDate: date });
  };

  // Open modal for confirmation
  const handleConfirm = () => {
    setTotalPrice(formData.numberOfPeople * ticketPrice);
    setModalOpen(true);
  };

  // Final submit after confirmation
// Final submit after confirmation
const handleFinalSubmit = async () => {
  // Prepare booking data
  const bookingData = {
 userId,  // Update this line
    name: formData.name,
    email: formData.email,
    state: formData.state,
    district: formData.district,
    mobileNumber: formData.mobileNumber,
    bookingDate: formData.bookingDate,
    numberOfPeople: formData.numberOfPeople,
    event: formData.event
  };

  // Log the booking data to the console
  console.log('Booking data:', bookingData);

  try {
    const response = await axios.post("http://localhost:5000/api/event/bookings", bookingData);
    console.log("Booking response:", response.data); // Log response
    alert("Booking Confirmed!");
    setModalOpen(false);
    navigate("/bookingDetails");
  } catch (error) {
    if (error.response) {
      console.error("Error submitting booking:", error.response.data);
      alert(`Failed to confirm booking: ${error.response.data.message}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("Failed to confirm booking. No response from server.");
    } else {
      console.error("Error in request setup:", error.message);
      alert("Failed to confirm booking. Please try again.");
    }
  }
};

  

  return (
    <>
    <Top/>
    <div className="booking-container">
     
      <h2>Event Booking System</h2>

      <form className="booking-form">
  <div className="form-group">
    <label> Name:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      placeholder="Enter your name"
      required
    />
  </div>

  <div className="form-group">
    <label> Email:</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Enter your email"
      required
    />
  </div>

  <div className="form-group">
    <label>State:</label>
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleInputChange}
      placeholder="Enter your state"
      required
    />
  </div>

  <div className="form-group">
    <label>District:</label>
    <input
      type="text"
      name="district"
      value={formData.district}
      onChange={handleInputChange}
      placeholder="Enter your district"
      required
    />
  </div>

  <div className="form-group">
    <label> Mobile Number:</label>
    <input
      type="tel"
      name="mobileNumber"
      value={formData.mobileNumber}
      onChange={handleInputChange}
      placeholder="Enter your mobile number"
      required
    />
  </div>

  <div className="form-group">
    <label>Select Event:</label>
    <select
      name="event"
      value={formData.event}
      onChange={handleInputChange}
      required
    >
      <option value="">Choose an event</option>
      {events.map((event) => (
        <option key={event._id} value={event._id}>
          {event.name}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label> Booking Date:</label>
    <DatePicker
      selected={formData.bookingDate}
      onChange={handleDateChange}
      dateFormat="Pp"
      minDate={new Date()}
      required
    />
  </div>

  <div className="form-group">
    <label>Number of People:</label>
    <input
      type="number"
      name="numberOfPeople"
      value={formData.numberOfPeople}
      onChange={handleInputChange}
      min="1"
      max="10"
      required
    />
  </div>

  <button type="button" onClick={handleConfirm} className="confirm-btn full-width">
    Confirm Booking
  </button>
</form>


      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal-content">
        <h2>Confirm Your Booking</h2>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>State:</strong> {formData.state}</p>
        <p><strong>District:</strong> {formData.district}</p>
        <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
        <p><strong>Event:</strong> {events.find((event) => event._id === formData.event)?.name}</p>
        <p><strong>Date:</strong> {formData.bookingDate.toLocaleString()}</p>
        <p><strong>Number of People:</strong> {formData.numberOfPeople}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        <button onClick={handleFinalSubmit} className="submit-btn">
          Confirm and Submit
        </button>
        <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
      </Modal>
    </div>
    </>
  );
};

export default Booking;


