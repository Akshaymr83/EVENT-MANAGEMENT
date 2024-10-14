import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";
import "./Booking.css"; // Custom CSS file for advanced styling

const EventBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    bookingDate: new Date(),
    numberOfAttendees: 1,
    mealPreference: "Standard",
    discountCode: "",
    vipAccess: false,
    termsAccepted: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const ticketPrice = 50; // Price per ticket

  const events = [
    { name: "Music Concert", category: "Entertainment", description: "Live band concert", image: "/concert.jpg" },
    { name: "Art Exhibition", category: "Art", description: "Showcase of fine art", image: "/art.jpg" },
    { name: "Tech Conference", category: "Technology", description: "Latest in tech", image: "/tech.jpg" },
    { name: "Food Festival", category: "Culinary", description: "Gourmet food tasting", image: "/food.jpg" },
  ];

  const mealOptions = ["Standard", "Vegetarian", "Vegan", "Gluten-Free"];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({ ...formData, bookingDate: date });
  };

  // Calculate total price dynamically
  const calculateTotal = () => {
    const attendees = formData.numberOfAttendees;
    let total = attendees * ticketPrice;
    if (formData.discountCode === "DISCOUNT10") {
      total = total * 0.9; // Apply 10% discount
    }
    setTotalPrice(total);
  };

  // Open modal for confirmation
  const handleConfirm = () => {
    calculateTotal();
    setModalOpen(true);
  };

  // Final submit after confirmation
  const handleFinalSubmit = () => {
    if (formData.termsAccepted) {
      alert("Booking Confirmed!");
      setModalOpen(false);
      // Save the booking data or send it to the server
      console.log(formData);
    } else {
      alert("Please accept terms and conditions.");
    }
  };

  return (
    <div className="booking-container">
      <h2>Event Booking System</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image} alt={event.name} className="event-image" />
            <h3>{event.name}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      <form className="booking-form">
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

        {/* Phone Input */}
        <div className="form-group">
          <label><FaPhone /> Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
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
                {event.name} ({event.category})
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
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            required
          />
        </div>

        {/* Number of Attendees */}
        <div className="form-group">
          <label>Number of Attendees:</label>
          <input
            type="number"
            name="numberOfAttendees"
            value={formData.numberOfAttendees}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />
        </div>

        {/* Meal Preference */}
        <div className="form-group">
          <label>Meal Preference:</label>
          <select
            name="mealPreference"
            value={formData.mealPreference}
            onChange={handleInputChange}
            required
          >
            {mealOptions.map((meal, index) => (
              <option key={index} value={meal}>
                {meal}
              </option>
            ))}
          </select>
        </div>

        {/* Discount Code */}
        <div className="form-group">
          <label>Discount Code (Optional):</label>
          <input
            type="text"
            name="discountCode"
            value={formData.discountCode}
            onChange={handleInputChange}
            placeholder="Enter discount code"
          />
        </div>

        {/* VIP Access Checkbox */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="vipAccess"
              checked={formData.vipAccess}
              onChange={handleInputChange}
            />
            VIP Access (+ $20)
          </label>
        </div>

        {/* Terms and Conditions */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              required
            />
            I accept the terms and conditions
          </label>
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
        <p><strong>Event:</strong> {formData.event}</p>
        <p><strong>Date:</strong> {formData.bookingDate.toLocaleString()}</p>
        <p><strong>Number of Attendees:</strong> {formData.numberOfAttendees}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        <button onClick={handleFinalSubmit} className="submit-btn">
          <FaCheckCircle /> Confirm and Submit
        </button>
        <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
      </Modal>
    </div>
  );
};

export default EventBooking;
