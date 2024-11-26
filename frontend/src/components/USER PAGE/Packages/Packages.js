// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Packages/Packages.css';
// import Top from '../NAVBAR/Nav';
// import Footer from '../Footer/Footer';

// const EventPackages = () => {
//   const [packages, setPackages] = useState([]);
//   const [selectedPackage, setSelectedPackage] = useState(null);

//   useEffect(() => {
//     // Fetch event packages from API
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

//   return (
//     <div className="event-packages">
//         <Top/>

//       <div className="package-container">
//         <div className="package-options">
//           {packages.map((pkg) => (
//             <div
//               key={pkg._id}
//               className={`package-option ${selectedPackage?._id === pkg._id ? 'selected' : ''}`}
//               onClick={() => setSelectedPackage(pkg)}
//             >
//               <label>{pkg.name}</label>
//             </div>
//           ))}
//         </div>
//         <div className="package-details">
//           {selectedPackage ? (
//             <>
//               <h3>{selectedPackage.name}</h3>
//               <p>{selectedPackage.description}</p>
//               <ul className="features">
//                 {selectedPackage.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//               <div className="order-total">
//                 <p>Total: <span className="price">${selectedPackage.price}</span></p>
//               </div>
//             </>
//           ) : (
//             <p>Select a package to view details</p>
//           )}
//         </div>
        
//       </div>
//      <Footer/>
//     </div>
//   );
// };

// export default EventPackages;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Packages/Packages.css';
import Top from '../NAVBAR/Nav';
import Footer from '../Footer/Footer';

const EventPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    // Fetch event packages from API
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

  return (
    <div className="event-packages">
      <Top />
      
      <div className="main-content">
        <div className="package-container-card">
          <div className="package-options">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className={`package-option ${selectedPackage?._id === pkg._id ? 'selected' : ''}`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <label>{pkg.name}</label>
              </div>
            ))}
          </div>
          <div className="package-details">
            {selectedPackage ? (
              <>
                <h3>{selectedPackage.name}</h3>
                <p>{selectedPackage.description}</p>
                <ul className="features">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="order-total">
                  <p>Total: <span className="price">${selectedPackage.price}</span></p>
                </div>
              </>
            ) : (
              <p>Select a package to view details</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventPackages;
