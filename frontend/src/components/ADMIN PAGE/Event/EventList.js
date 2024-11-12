// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function EventList({ events, setEvents }) {
//   const [editMode, setEditMode] = useState(false); // To toggle between edit and list mode
//   const [currentEvent, setCurrentEvent] = useState(null); // Event currently being edited
//   const [formData, setFormData] = useState({ name: '', category: '', description: '' });

//   // Fetch events initially
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/events') // Use the correct port
//       .then((res) => {
//         setEvents(res.data); // Update state with fetched events
//       })
//       .catch((err) => {
//         console.error('Error fetching events:', err);
//       });
//   }, [setEvents]);

//   // Handle event deletion
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/api/admin/events/${id}`) // Correct URL
//       .then(() => {
//         setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id)); // Update events
//       })
//       .catch((err) => {
//         console.error('Error deleting event:', err);
//       });
//   };

//   // Handle Edit button click
//   const handleEdit = (event) => {
//     setEditMode(true);
//     setCurrentEvent(event);
//     setFormData({ name: event.name, category: event.category, description: event.description });
//   };

//   // Handle form change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission for updating event
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios.put(`http://localhost:5000/api/admin/events/${currentEvent._id}`, formData) // Correct URL
//       .then((res) => {
//         const updatedEvent = res.data;
//         setEvents((prevEvents) =>
//           prevEvents.map((event) =>
//             event._id === updatedEvent._id ? updatedEvent : event
//           )
//         ); // Update events list with the new event data
//         setEditMode(false); // Exit edit mode
//       })
//       .catch((err) => {
//         console.error('Error updating event:', err);
//       });
//   };

//   return (
//     <div>
//       <h2>Event List</h2>
//       {editMode ? (
//         // Edit form
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Category:</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
//         </form>
//       ) : (
//         // Event list
//         <ul>
//           {events.length === 0 ? (
//             <p>No events found</p>
//           ) : (
//             events.map((event) => (
//               <li key={event._id}>
//                 {event.name}
//                 {event.category}
//                 {event.description}
//                 <button onClick={() => handleEdit(event)}>Edit</button>
//                 <button onClick={() => handleDelete(event._id)}>Delete</button>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default EventList;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './eventCard.css';

function EventList({ events, setEvents }) {
  const [editMode, setEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  }, [setEvents]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/events/${id}`)
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      })
      .catch((err) => {
        console.error('Error deleting event:', err.response ? err.response.data : err.message);
      });
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setCurrentEvent(event);
    setFormData({
      name: event.name,
      category: event.category,
      description: event.description,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/admin/events/${currentEvent._id}`, formData)
      .then((res) => {
        const updatedEvent = res.data;
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          )
        );
        setEditMode(false);
      })
      .catch((err) => {
        console.error('Error updating event:', err.response ? err.response.data : err.message);
      });
  };

  return (
    <div className='eventManagerContainer'>
      <h2>Event List</h2>

      {/* Grid for events */}
      <div className="eventManager-grid">
        {events.map((event) => (
          <div className="eventManager-card" key={event._id}>
            <h3>{event.name}</h3>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <div>
              <Button variant="primary" onClick={() => handleEdit(event)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={editMode} onHide={() => setEditMode(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="mt-3">Save</Button>
            <Button variant="secondary" className="mt-3" onClick={() => setEditMode(false)}>Cancel</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventList;
