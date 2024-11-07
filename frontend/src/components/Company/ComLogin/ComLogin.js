


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './CompanyLogin.css'; // External CSS file for styling

// const CompanyLogin = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/company/companyLogin', formData);
//       setMessage(response.data.message);
//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token);
//         alert("Login successful");
//         navigate('/companyHome');
//       }
//     } catch (error) {
//       setMessage(error.response.data.message);
//     }
//   };

//   return (
//     <div className='login'>
//     <div className="form-container">
//       <p className="title">Company Login</p>
//       <form className="form" onSubmit={handleSubmit}>
//         <input 
//           type="email" 
//           name="email" 
//           placeholder="Email" 
//           className="input" 
//           onChange={handleChange} 
//         />
//         <input 
//           type="password" 
//           name="password" 
//           placeholder="Password" 
//           className="input" 
//           onChange={handleChange} 
//         />
//         <button className="form-btn" type="submit">Login</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//       <p className="sign-up-label">
//         Don't have an account?<span className="sign-up-link">Sign up</span>
//       </p>
      
//     </div>
//     </div>
//   );
// };

// export default CompanyLogin;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CompanyLogin.css'; // External CSS file for styling
import img from '../../USER PAGE/images/new-year-celebration-with-disco-girls.jpg';
import Loader from '../../Loader/Loader';


const CompanyLogin = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      console.log("Login attempt initiated");

      try {
          const response = await axios.post("http://localhost:5000/api/company/companyLogin", {
              email,
              password,
          });

          console.log("Login Response:", response);

          if (response.data.status === "Success") {
              const companyData = response.data.data;
              console.log("company Data:", companyData);
              localStorage.setItem("company", JSON.stringify(companyData));
              localStorage.setItem("companyId", companyData._id);
              setLoading(false);
              navigate('/companyHome')
              setLoading(false);
            
              

             
          } else {
              setMessage(response.data.message);
              console.log("Login failed message:", response.data.message);
          }
      } catch (error) {
          console.error("Login error:", error);
          if (error.response && error.response.data.message) {
              setMessage(error.response.data.message);
          } else {
              setMessage("Login failed. Please try again.");
          }
      } finally {
          setLoading(false);
          console.log("Loading state:", loading);
      }
  };

  return (
    <>
     {loading ? (
                <Loader />
            ) : (
    <div className='login-page'>
      <div className='image-section' style={{ borderRadius: "0 3rem 3rem 0"}}>
        <img src={img} alt='Company Logo' className='login-image' />
      </div>
      <div className='form-section'>
        <div className='form-container'>
          <p className='login-title'>Company Login</p>
          <form className='login-form' onSubmit={handleLogin}>
            <input 
              type='email' 
              name='email' 
              placeholder='Email' 
              className='login-input' 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type='password' 
              name='password' 
              placeholder='Password' 
              className='login-input' 
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='login-btn' type='submit'>Login</button>
          </form>
          {message && <p className='login-error'>{message}</p>}
          <div className='signup-link'>
            <p>Don't have an account?</p>
            <Link to='/companySignup'>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
            )}
    </>
  );
};

export default CompanyLogin;

