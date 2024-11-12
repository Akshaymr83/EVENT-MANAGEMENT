
// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminEvent = ({ setEvents }) => {
//     const [eventData, setEventData] = useState({
//         name: '',
//         category: '',
//         description: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/admin/events', eventData);
//             console.log("Event added successfully:", response.data);

//             // Update the event list by adding the new event to the existing events
//             setEvents((prevEvents) => [...prevEvents, response.data]);

//             // Reset form fields after successful submission
//             setEventData({
//                 name: '',
//                 category: '',
//                 description: ''
//             });
//         } catch (error) {
//             console.error("Error saving event:", error);
//         }
//     };

//     return (
//         <>
//         <h2>ADD EVENT</h2>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Name:</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={eventData.name}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Category:</label>
//                 <input
//                     type="text"
//                     name="category"
//                     value={eventData.category}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Description:</label>
//                 <textarea
//                     name="description"
//                     value={eventData.description}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <button type="submit">Add Event</button>
//         </form>
//         </>
//     );
// };

// export default AdminEvent;
import React, { useState } from 'react';
import axios from 'axios';
import './eventForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const AdminEvent = ({ setEvents }) => {
    const [eventData, setEventData] = useState({
        name: '',
        category: '',
        description: ''
    });
    const navigate =useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/events', eventData);
            console.log("Event added successfully:", response.data);
            navigate("/eventList")

            // Update the event list by adding the new event to the existing events
            setEvents((prevEvents) => [...prevEvents, response.data]);

            // Reset form fields after successful submission
            setEventData({
                name: '',
                category: '',
                description: ''
            });
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    return (
        
        <div className="AddEventcontainer">
            <div className='formDiv'>
           
            <form className="eventform" onSubmit={handleSubmit}>
            <h2 className="title">ADD EVENT</h2>
                <div className="inputGroup">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={eventData.category}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        className="textarea"
                        required
                    />
                </div>
                <button type="submit" className="button">Add Event</button>
            </form>
            </div>
        </div>
        
    );
};

export default AdminEvent;
