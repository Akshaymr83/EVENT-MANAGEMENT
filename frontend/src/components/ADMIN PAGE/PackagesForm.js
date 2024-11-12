// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Packages/packagesForm.css'

// const PackagesForm = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [features, setFeatures] = useState([]);
//   const [price, setPrice] = useState('');
//   const [featureInput, setFeatureInput] = useState('');
//   const navigate = useNavigate()

//   const handleAddFeature = () => {
//     if (featureInput) {
//       setFeatures([...features, featureInput]);
//       setFeatureInput('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/packages/packages', { name, description, features, price });
//       alert('Event package added successfully!');
//       navigate('/packagesCard')
//       setName('');
//       setDescription('');
//       setFeatures([]);
//       setPrice('');
      
//     } catch (error) {
//       console.error('Error adding event package:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2>Add Event Package</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Package Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Features</label>
//           <div>
//             <input
//               type="text"
//               value={featureInput}
//               onChange={(e) => setFeatureInput(e.target.value)}
//             />
//             <button type="button" onClick={handleAddFeature}>Add Feature</button>
//           </div>
//           <ul>
//             {features.map((feature, index) => (
//               <li key={index}>{feature}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <label>Price</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add Package</button>
//       </form>
//     </div>
//   );
// };

// export default PackagesForm;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Packages/packagesForm.css';

const PackagesForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const navigate = useNavigate();

  const handleAddFeature = () => {
    if (featureInput) {
      setFeatures([...features, featureInput]);
      setFeatureInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/packages/packages', { name, description, features, price });
      alert('Event package added successfully!');
      navigate('/packagesCard');
      setName('');
      setDescription('');
      setFeatures([]);
      setPrice('');
    } catch (error) {
      console.error('Error adding event package:', error);
    }
  };

  return (
  
    <div className="package-container">
      <div className="package-left-section">
        <h2>We are Hiring</h2>
        <p>Tation argumentum et usu, dicit viderer evertitur te has.</p>
        <a href="#" className="package-button">Purchase this template</a>
      </div>
      <div className="package-form-section">
        <div className="package-form-container">
          <h2>Add Event Package</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Package Name"
                required
              />
            </div>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
            <div>
              <div className="feature-input-container">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Feature"
                />
                <button type="button" onClick={handleAddFeature}>Add Feature</button>
              </div>
              <ul className="package-feature-list">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <button type="submit">Add Package</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackagesForm;

