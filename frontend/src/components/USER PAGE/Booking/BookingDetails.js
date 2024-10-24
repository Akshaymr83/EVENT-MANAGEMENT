import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Booking.css"; // Ensure you have this CSS file for styling

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/event/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/bookings/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="booking-details-container">
      <h2>Booking Details</h2>
      <div className="booking-cards">
        {bookings.map((booking) => (
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
        ))}
      </div>
    </div>
  );
};

export default BookingDetails;
