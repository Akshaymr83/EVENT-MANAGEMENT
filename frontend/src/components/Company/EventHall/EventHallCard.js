

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './EventHallCard.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faLock } from '@fortawesome/free-solid-svg-icons';

function EventHallCard() {
  const { id } = useParams();
  const [eventHalls, setEventHalls] = useState([]);
  const company = JSON.parse(localStorage.getItem("company"));
  const companyId = company ? company.companyId : null;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
   // To store new files selected in modal

  const fetchEventHalls = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/eventHall/eventHalls/${companyId}`);
      setEventHalls(response.data);
    } catch (error) {
      console.error("Error fetching EventHalls:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchEventHalls();
    }
  }, [companyId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/eventHall/eventHalls/${id}`);
      setEventHalls(eventHalls.filter(eventHall => eventHall._id !== id));
    } catch (error) {
      console.error("Error deleting eventHall:", error);
    }
  };

  const openModal = (hall) => {
    setSelectedHall(hall);
    setNewFiles([]); // Reset new files when opening the modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedHall(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Create FormData to handle both text data and image files
    const formData = new FormData();
    formData.append('name', selectedHall.name);
    formData.append('location', selectedHall.location);
    formData.append('description', selectedHall.description);
    formData.append('price', selectedHall.price);

    // Append each new file individually to FormData
    newFiles.forEach((file) => {
      formData.append('images', file);
    });

    // Ensure existing images are sent correctly by appending them one by one
    if (selectedHall.images && selectedHall.images.length > 0) {
      selectedHall.images.forEach((img) => {
        formData.append('existingImages', img);  // Using a different key for clarity
      });
    }

    try {
      // PUT request to update the event hall with FormData
      await axios.put(`http://localhost:5000/api/eventHall/eventHalls/${selectedHall._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh event halls list
      await fetchEventHalls();
      alert('Event hall updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Error updating event hall:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedHall((prevHall) => ({
      ...prevHall,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + selectedHall.images.length <= 3) {
      setNewFiles(selectedFiles); // Update new files selected
    } else {
      alert("You can only have a maximum of 3 images.");
    }
  };

  return (
    <div className="event-hall-container">
      <div className="event-hall-grid">
        {eventHalls.map((hall) => (
          <div key={hall._id} className="event-hall-card">
            <div className="card-body">
              <h5 className="card-title">{hall.name}</h5>
              <p className="card-text">Location: {hall.location}</p>
              <p className="card-text">Description: {hall.description}</p>
              <p className="card-text">Price: ${hall.price}</p>

              {/* Carousel for Images */}
              {hall.images && hall.images.length > 0 && (
                <Carousel>
                  {hall.images.map((img, index) => {
                    const imageUrl = `http://localhost:5000/images/${img.split('\\').pop()}`;
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={imageUrl}
                          alt={`Slide ${index + 1}`}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              )}

              <div className="twio-buttons">
                <button className="btn-eventHallCard" onClick={() => openModal(hall)}>Edit</button>
                <button className="btn-eventHallCard" onClick={() => handleDelete(hall._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedHall && (
        <div className="modal-overlay-eventHallCard" style={{ display: modalIsOpen ? 'block' : 'none' }}>
          <div className="modal fade show" style={{ display: modalIsOpen ? 'block' : 'none' }} id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden={!modalIsOpen}>
            <div className="modal-dialog-eventHallCard">
              <div className="modal-content-eventHallCard">
                <div className="modal-header-eventHallCard">
                  <h5 className="modal-title-eventHallCard" id="updateModalLabel">Update Event Hall</h5>
                  <button type="button" className="close-eventHallCard" onClick={closeModal} > <FontAwesomeIcon icon={faCircleXmark} size="lg"  /></button>
                
                 
                </div>
                <div className="modal-body-eventHallCard">
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label-eventHallCard">Name:</label>
                      <input type="text" className="form-control" name="name" value={selectedHall.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label-eventHallCard">Location:</label>
                      <input type="text" className="form-control" name="location" value={selectedHall.location} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label-eventHallCard">Description:</label>
                      <textarea className="form-control" name="description" value={selectedHall.description} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label-eventHallCard">Price:</label>
                      <input type="number" className="form-control" name="price" value={selectedHall.price} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="images" className="form-label-eventHallCard">Upload Images (Max 5):</label>
                      <input
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                      />
                      <ul>
    {/* Show names of existing images */}
    {selectedHall.images.map((img, index) => (
      <li key={`existing-${index}`}>{img.split('\\').pop()}</li> // Show only the filename
    ))}
    {/* Show names of new files */}
    {newFiles.map((file, index) => (
      <li key={`new-${index}`}>{file.name}</li> // Show only the filename of new files
    ))}
  </ul>
                    </div>
                    <div className="modal-footer-eventHallCard">
                      <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventHallCard;
