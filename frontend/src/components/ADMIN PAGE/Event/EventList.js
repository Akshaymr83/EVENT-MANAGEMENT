import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EventList({ events, setEvents }) {
  const [editMode, setEditMode] = useState(false); // To toggle between edit and list mode
  const [currentEvent, setCurrentEvent] = useState(null); // Event currently being edited
  const [formData, setFormData] = useState({ name: '', category: '', description: '' });

  // Fetch events initially
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/events') // Use the correct port
      .then((res) => {
        setEvents(res.data); // Update state with fetched events
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  }, [setEvents]);

  // Handle event deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/events/${id}`) // Correct URL
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id)); // Update events
      })
      .catch((err) => {
        console.error('Error deleting event:', err);
      });
  };

  // Handle Edit button click
  const handleEdit = (event) => {
    setEditMode(true);
    setCurrentEvent(event);
    setFormData({ name: event.name, category: event.category, description: event.description });
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for updating event
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/admin/events/${currentEvent._id}`, formData) // Correct URL
      .then((res) => {
        const updatedEvent = res.data;
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          )
        ); // Update events list with the new event data
        setEditMode(false); // Exit edit mode
      })
      .catch((err) => {
        console.error('Error updating event:', err);
      });
  };

  return (
    <div>
      <h2>Event List</h2>
      {editMode ? (
        // Edit form
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        // Event list
        <ul>
          {events.length === 0 ? (
            <p>No events found</p>
          ) : (
            events.map((event) => (
              <li key={event._id}>
                {event.name}
                <button onClick={() => handleEdit(event)}>Edit</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default EventList;
