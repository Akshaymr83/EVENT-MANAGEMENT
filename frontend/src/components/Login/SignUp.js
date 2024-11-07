


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Loader from "../Loader/Loader"; // Import the Loader component
// import '../Login/signup.css';
// import img from "../USER PAGE/images/female-friends-sitting-field-with-american-decorations.jpg"

// const Signup = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false); // For loading state
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setLoading(true); // Show loader on submit

//         try {
//             const response = await axios.post("http://localhost:5000/api/user/signup", {
//                 name,
//                 email,
//                 password,
//                 dateOfBirth,
//             });

//             if (response.data.status === "PENDING") {
//                 setMessage(response.data.message);
                
//                 // Storing preliminary user data in localStorage before OTP verification
//                 localStorage.setItem("user", JSON.stringify({ name, email }));

//                 // Navigate to OTP verification page with userId
//                 navigate(`/verify-otp/${response.data.data.userId}`);
//             } else {
//                 setMessage(response.data.message);
//             }
//         } catch (error) {
//             if (error.response && error.response.data.message) {
//                 setMessage(error.response.data.message);
//             } else {
//                 setMessage("Signup failed. Please try again.");
//             }
//         } finally {
//             setLoading(false); // Hide loader after submission
//         }
//     };

//     return (
//         <>
//             {loading ? (
//                 <Loader /> // Show loader when loading state is true
//             ) : (
//                 <div className='login'>
//                     <div className="form-container">
//                         <div className="form-conatiner-child">
//                         <p className="title">Welcome To <b>CLICK BYTES</b></p>
//                         <form className="form" onSubmit={handleSignup}>
//                             <input
//                                 type="text"
//                                 className="input"
//                                 placeholder="Name"
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="email"
//                                 className="input"
//                                 placeholder="Email"
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="password"
//                                 className="input"
//                                 placeholder="Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="date"
//                                 onChange={(e) => setDateOfBirth(e.target.value)}
//                                 required
//                                 className="input"
//                             />
//                             <button className="form-btn" type="submit">Sign Up</button>
//                         </form>
//                         {message && <p>{message}</p>}
//                         <div className="signup-link">
//                             <p>Already have an account?</p>
//                             <Link to="/login">Login</Link>
//                         </div>
//                         </div>

//                         <div className="signupImage">
//                             <img src={img}/>
//                         </div>
                     
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Signup;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component
import '../Login/signup.css'; // Updated CSS path
import img from "../USER PAGE/images/female-friends-sitting-field-with-american-decorations.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/user/signup", {
                name,
                email,
                password,
                dateOfBirth,
            });

            if (response.data.status === "PENDING") {
                setMessage(response.data.message);
                localStorage.setItem("user", JSON.stringify({ name, email }));
                navigate(`/verify-otp/${response.data.data.userId}`);
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
                       <Link to={'/'} style={{textDecoration:'none',}}><FontAwesomeIcon icon={faHome} size="2x" color="black" style={{padding:'5px'}}/></Link>
                 
                    <div className="form-section">
                        <div className="brand-logo">Click Bytes</div>
                        <p className="welcome-text">Welcome Back!</p>
                        <p className="description">The faster you fill up, the faster you get a ticket</p>
                        <form className="signup-form" onSubmit={handleSignup}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                                className="input-field"
                            />
                            <button className="submit-btn" type="submit">Sign Up</button>
                        </form>
                        {message && <p className="error-message">{message}</p>}
                        <div className="login-link">
                            <p>Already have an User account?</p>
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="login-link">
                            <p>Company account?</p>
                            <Link to="/companySignup">Login</Link>
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

export default Signup;
