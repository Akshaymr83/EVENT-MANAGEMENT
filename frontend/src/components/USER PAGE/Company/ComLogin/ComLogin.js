// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CompanyLogin = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate =useNavigate();


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/company/companyLogin', formData);
//       setMessage(response.data.message);
//       if (response.data.success) {
//         // Store JWT token in localStorage
//         localStorage.setItem('token', response.data.token);
//         alert("sucess login")
//         // Navigate to company home after successful login
//         navigate('/companyHome');
//       }

//       // Store JWT token in localStorage
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       setMessage(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Company Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CompanyLogin;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ComSignup.css'; // External CSS file for styling

const CompanyLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/company/companyLogin', formData);
      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        alert("Login successful");
        navigate('/companyHome');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='login'>
    <div className="form-container">
      <p className="title">Company Login</p>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="input" 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="input" 
          onChange={handleChange} 
        />
        <button className="form-btn" type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="sign-up-label">
        Don't have an account?<span className="sign-up-link">Sign up</span>
      </p>
      
    </div>
    </div>
  );
};

export default CompanyLogin;
