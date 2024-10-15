import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import "./Booking.css";

const EventBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state: "",
    district: "",
    mobile: "",
    event: "",
    bookingDate: new Date(),
    numberOfPeople: 1,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [events, setEvents] = useState([]); // State to hold events added by admin
  const ticketPrice = 50; // Price per ticket

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/events');// Adjust API URL as needed
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
    setFormData({ ...formData, [name]: value });
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
  const handleFinalSubmit = async () => {
    try {
      await axios.post("/api/bookings", formData); // Adjust API URL as needed
      alert("Booking Confirmed!");
      setModalOpen(false);
      console.log(formData);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  return (
    <div className="booking-container">
      <h2>Event Booking System</h2>

      <form className="booking-form">
        {/* User Input Fields */}
        {/* Name Input */}
        <div className="form-group">
          <label><FaUser /> Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label><FaEnvelope /> Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* State Input */}
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

        {/* District Input */}
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

        {/* Mobile Input */}
        <div className="form-group">
          <label><FaPhone /> Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Select Event */}
        <div className="form-group">
          <label>Select Event:</label>
          <select
            name="event"
            value={formData.event}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose an event</option>
            {events.map((event, index) => (
              <option key={index} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="form-group">
          <label><FaCalendarAlt /> Booking Date:</label>
          <DatePicker
            selected={formData.bookingDate}
            onChange={handleDateChange}
            dateFormat="Pp"
            minDate={new Date()}
            required
          />
        </div>

        {/* Number of People */}
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

        {/* Confirm Booking Button */}
        <button type="button" onClick={handleConfirm} className="confirm-btn">
          Confirm Booking
        </button>
      </form>

      {/* Modal for Final Confirmation */}
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal-content">
        <h2>Confirm Your Booking</h2>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>State:</strong> {formData.state}</p>
        <p><strong>District:</strong> {formData.district}</p>
        <p><strong>Mobile:</strong> {formData.mobile}</p>
        <p><strong>Event:</strong> {formData.event}</p>
        <p><strong>Date:</strong> {formData.bookingDate.toLocaleString()}</p>
        <p><strong>Number of People:</strong> {formData.numberOfPeople}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        <button onClick={handleFinalSubmit} className="submit-btn">
          Confirm and Submit
        </button>
        <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
      </Modal>
    </div>
  );
};

export default EventBooking;
