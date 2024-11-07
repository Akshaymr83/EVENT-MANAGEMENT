import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../Loader/Loader'; // Assuming you have a Loader component
import './CompanySignup.css'; // Updated CSS path
import img from '../../USER PAGE/images/evening-summer-sun-makes-halo-around-beautiful-wedding-couple.jpg'

const CompanySignup = () => {
const [company_name ,setCompanyName]=useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post("http://localhost:5000/api/company/companySignup", {
            company_name,
            email,
            password,
          
        });

        if (response.data.status === "PENDING") {
            setMessage(response.data.message);
            localStorage.setItem("company", JSON.stringify({ company_name, email }));
            navigate(`/verify-Companyotp/${response.data.data.companyId}`);
        } else {
            setMessage(response.data.message);
        }
    } catch (error) {
        setMessage(error.response?.data.message || "Signup failed. Please try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="signup-page">
          <div className="form-section">
            <div className="brand-logo">Your Company Name</div>
            <p className="welcome-text">Create Company Account</p>
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="input-field"
                name="company_name"
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <input
                type="email"
                className="input-field"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input-field"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="submit-btn" type="submit">Create Account</button>
            </form>
            {message && <p className="error-message">{message}</p>}
            <div className="login-link">
              <p>Already have an Company account?</p>
              <Link to="/companyLogin">Log in</Link>
            </div>
            <div className="login-link">
              <p>User account?</p>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>

          <div className="image-section">
            <img src={img} alt="Signup Visual" className="signup-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default CompanySignup;
