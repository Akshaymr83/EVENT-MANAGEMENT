import React, { useState } from 'react';
import Signup from '../Login/SignUp'; // Import the Signup component
import CompanySignup from '../Company/ComLogin/ComSignup'; // Import the CompanySignup component
import '../Login/Login.css'; // For styling the slider (optional)

const AuthToggle = () => {
    const [isCompany, setIsCompany] = useState(false); // State to toggle between signup types

    const toggleSignup = () => {
        setIsCompany(!isCompany);
    };

    return (
        <div className="auth-container">
            <div className="slider-container">
                <label className="switch">
                    <input type="checkbox" onChange={toggleSignup} checked={isCompany} />
                    <span className="slider round"></span>
                </label>
                <p>{isCompany ? 'Company Signup' : 'User Signup'}</p>
                {isCompany ? <CompanySignup /> : <Signup />}
               
            </div>

            {/* Conditional rendering based on toggle state */}
         
        </div>
    );
};

export default AuthToggle;
