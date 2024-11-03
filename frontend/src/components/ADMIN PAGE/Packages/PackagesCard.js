// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PackagesCard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const packageData = location.state.package; // Get package data from navigation state

//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(packageData.name);
//   const [description, setDescription] = useState(packageData.description);
//   const [features, setFeatures] = useState(packageData.features);
//   const [price, setPrice] = useState(packageData.price);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/packages/packages/${packageData._id}`);
//       alert('Package deleted successfully!');
//       navigate('/'); // Redirect to another page after deletion
//     } catch (error) {
//       console.error('Error deleting package:', error);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedPackage = {
//         name,
//         description,
//         features,
//         price,
//       };
//       await axios.put(`http://localhost:5000/api/packages/packages/${packageData._id}`, updatedPackage);
//       alert('Package updated successfully!');
//       setIsEditing(false); // Exit editing mode
//     } catch (error) {
//       console.error('Error updating package:', error);
//     }
//   };

//   return (
//     <div className="package-card" style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
//       {isEditing ? (
//         <form onSubmit={handleUpdate}>
//           <h3>Edit Package</h3>
//           <div>
//             <label>Package Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Features:</label>
//             <input
//               type="text"
//               value={features.join(', ')} // Join features for input
//               onChange={(e) => setFeatures(e.target.value.split(',').map(feature => feature.trim()))} // Split input into an array
//             />
//           </div>
//           <div>
//             <label>Price:</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Save Changes</button>
//           <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//         </form>
//       ) : (
//         <>
//           <h3>{packageData.name}</h3>
//           <p>{packageData.description}</p>
//           <ul>
//             {packageData.features.map((feature, index) => (
//               <li key={index}>{feature}</li>
//             ))}
//           </ul>
//           <p>Total Price: ${packageData.price}</p>
//           <button onClick={() => setIsEditing(true)}>Update</button>
//           <button onClick={handleDelete}>Delete</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default PackagesCard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackagesCard = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/packages/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/packages/${id}`);
      setPackages(packages.filter(pkg => pkg._id !== id));
      alert('Package deleted successfully!');
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleUpdate = (pkg) => {
    setSelectedPackage(pkg);
    setName(pkg.name);
    setDescription(pkg.description);
    setFeatures(pkg.features);
    setPrice(pkg.price);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPackage(null);
    setName('');
    setDescription('');
    setFeatures([]);
    setPrice('');
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/packages/packages/${selectedPackage._id}`, {
        name,
        description,
        features,
        price,
      });
      alert('Package updated successfully!');
      handleModalClose(); // Close the modal after saving
      // Refresh the packages list
      const updatedPackages = packages.map(pkg => (pkg._id === selectedPackage._id ? { ...pkg, name, description, features, price } : pkg));
      setPackages(updatedPackages);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Event Packages</h2>
      <ul className="list-group">
        {packages.map(pkg => (
          <li key={pkg._id} className="list-group-item">
            <h5>{pkg.name}</h5>
            <p>{pkg.description}</p>
            <p><strong>Price:</strong> ${pkg.price}</p>
            <p><strong>Features:</strong></p>
            <ul>
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => handleUpdate(pkg)} className="btn btn-primary">Update</button>
            <button onClick={() => handleDelete(pkg._id)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal for updating package */}
      {showModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Package</h5>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <label>Package Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Features</label>
                  <div>
                    <input
                      type="text"
                      value={features.join(', ')}
                      onChange={(e) => setFeatures(e.target.value.split(',').map(f => f.trim()))}
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesCard;
