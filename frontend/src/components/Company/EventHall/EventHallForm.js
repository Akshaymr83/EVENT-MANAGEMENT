
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EventHallForm.css';

function EventHallForm() {
  const { id } = useParams(); // For editing an existing event hall
  const companyData = localStorage.getItem('company');
  const company = companyData ? JSON.parse(companyData) : null;
  const companyId = company ? company.companyId : null;

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    images: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch event hall details to pre-fill the form for editing
      axios.get(`http://localhost:5000/api/eventHall/eventHalls/${id}`)
        .then((response) => {
          const { name, location, description, price, images } = response.data;
          setFormData({
            name,
            location,
            description,
            price,
            images: images || [],
          });
        })
        .catch((error) => {
          console.error('Error fetching event hall data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length !== 5) {
      alert('Please upload exactly 5 images.');
      return;
    }

    const eventHallData = new FormData();
    eventHallData.append('name', formData.name);
    eventHallData.append('location', formData.location);
    eventHallData.append('description', formData.description);
    eventHallData.append('price', formData.price);
    eventHallData.append('companyId', String(companyId));

    formData.images.forEach((file) => {
      eventHallData.append('images', file);
    });

    try {
      let response;
      if (id) {
        response = await axios.put(`http://localhost:5000/api/eventHall/eventHalls/${id}`, eventHallData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post("http://localhost:5000/api/eventHall/eventHalls", eventHallData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.status === 201 || response.status === 200) {
        alert("Event hall saved successfully!");
        navigate("/eventHallCard");
      }
    } catch (error) {
      if (error.response) {
        alert(`Failed to save event hall: ${error.response.data.message}`);
      } else {
        alert("Failed to save event hall. Please try again.");
      }
    }
  };

  return (
    <div className="event-hall-container">
      <div className="event-hall-content">
        <h1>BE INSURED & <span>SECURE</span> YOUR EVENT HALL BOOKINGS</h1>
        <p>Experience a hassle-free booking process with our secure and reliable platform.</p>
      </div>
      <form className="event-hall-form" onSubmit={handleFinalSubmit} encType="multipart/form-data">
        <h2>{id ? "Edit Event Hall" : "Create Event Hall"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="images">Upload Images (Max 5):</label>
        <input
          type="file"
          name="images"
          onChange={handleImageChange}
          multiple
          accept="image/*"
        />
        <ul>
          {formData.images.map((image, index) => (
            <li key={index}>{image.name}</li>
          ))}
        </ul>

        <button type="submit">{id ? "Update" : "Create"} Event Hall</button>
      </form>
    </div>
  );
}

export default EventHallForm;
