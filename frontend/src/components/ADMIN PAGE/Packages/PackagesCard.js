
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PackagesCard = () => {
//   const [packages, setPackages] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [features, setFeatures] = useState([]);
//   const [price, setPrice] = useState('');

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/packages/packages');
//         setPackages(response.data);
//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/packages/packages/${id}`);
//       setPackages(packages.filter(pkg => pkg._id !== id));
//       alert('Package deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting package:', error);
//     }
//   };

//   const handleUpdate = (pkg) => {
//     setSelectedPackage(pkg);
//     setName(pkg.name);
//     setDescription(pkg.description);
//     setFeatures(pkg.features);
//     setPrice(pkg.price);
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setSelectedPackage(null);
//     setName('');
//     setDescription('');
//     setFeatures([]);
//     setPrice('');
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/packages/packages/${selectedPackage._id}`, {
//         name,
//         description,
//         features,
//         price,
//       });
//       alert('Package updated successfully!');
//       handleModalClose(); // Close the modal after saving
//       // Refresh the packages list
//       const updatedPackages = packages.map(pkg => (pkg._id === selectedPackage._id ? { ...pkg, name, description, features, price } : pkg));
//       setPackages(updatedPackages);
//     } catch (error) {
//       console.error('Error updating package:', error);
//     }
//   };

//   return (
//     <div className='packages-card-container' >
//       <h2>Event Packages</h2>
//       <ul className="list-group">
//         {packages.map(pkg => (
//           <li key={pkg._id} className="list-group-item">
//             <h5>{pkg.name}</h5>
//             <p>{pkg.description}</p>
//             <p><strong>Price:</strong> ${pkg.price}</p>
//             <p><strong>Features:</strong></p>
//             <ul>
//               {pkg.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//             <button onClick={() => handleUpdate(pkg)} className="btn btn-primary">Update</button>
//             <button onClick={() => handleDelete(pkg._id)} className="btn btn-danger">Delete</button>
//           </li>
//         ))}
//       </ul>

//       {/* Modal for updating package */}
//       {showModal && (
//         <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Update Package</h5>
//                 <button type="button" className="close" onClick={handleModalClose}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <div>
//                   <label>Package Name</label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="form-control"
//                   />
//                 </div>
//                 <div>
//                   <label>Description</label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                     className="form-control"
//                   />
//                 </div>
//                 <div>
//                   <label>Features</label>
//                   <div>
//                     <input
//                       type="text"
//                       value={features.join(', ')}
//                       onChange={(e) => setFeatures(e.target.value.split(',').map(f => f.trim()))}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label>Price</label>
//                   <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
//                 <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PackagesCard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Packages/packagesCard.css'; // Import the separate CSS file



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
      handleModalClose();
      const updatedPackages = packages.map(pkg => (pkg._id === selectedPackage._id ? { ...pkg, name, description, features, price } : pkg));
      setPackages(updatedPackages);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  return (
    <div className="packages-card-container">
      <h2>Event Packages</h2>
      <ul className="packages-list-group">
        {packages.map(pkg => (
          <li key={pkg._id} className="packages-list-group-item">
            <h5>{pkg.name}</h5>
            <p>{pkg.description}</p>
            <p><strong>Price:</strong> ${pkg.price}</p>
            <p><strong>Features:</strong></p>
            <ul>
              {pkg.features.map((feature, index) => (
                <li key={index}><p>{feature}</p></li>
              ))}
            </ul>
            <button onClick={() => handleUpdate(pkg)} className="packages-btn packages-btn-primary">Update</button>
            <button onClick={() => handleDelete(pkg._id)} className="packages-btn packages-btn-danger">Delete</button>
          </li>
        ))}
      </ul>

      {/* Custom Modal for updating package */}
      {showModal && (
        <div className="packages-modal-overlay">
          <div className="packages-modal">
            <div className="packages-modal-header">
              <h5 className="packages-modal-title">Update Package</h5>
              <button type="button" className="close" onClick={handleModalClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="packages-modal-body">
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
            <div className="packages-modal-footer">
              <button type="button" className="btn packages-btn-secondary" onClick={handleModalClose}>Close</button>
              <button type="button" className="btn packages-btn-primary" onClick={handleSave}>Save changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesCard;
