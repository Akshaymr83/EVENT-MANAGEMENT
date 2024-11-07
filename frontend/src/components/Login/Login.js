// // src/components/Login/Login.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Loader from "../Loader/Loader"; // Import the Loader component
// import '../Login/Login.css';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
    
//         console.log("Login attempt initiated"); // Check if function is called
    
//         try {
//             const response = await axios.post("http://localhost:5000/api/user/login", {
//                 email,
//                 password,
//             });
    
//             console.log("Login Response:", response); // Log response
    
//             if (response.data.status === "Success") {
//                 const userData = response.data.data; // Access user data correctly
//                 console.log("User Data:", userData); // Log user data
//                 localStorage.setItem("user", JSON.stringify(userData));
//                 localStorage.setItem("userId", userData._id); // Store user data in localStorage

//                 if(userData.isAdmin){
//                     navigate("/adminHome");
//                 }
//                 else{
//                     navigate("/"); // Navigate to home page

//                 }
               
//             } else {
//                 setMessage(response.data.message);
//                 console.log("Login failed message:", response.data.message); // Log failure message
//             }
            
//         } catch (error) {
//             console.error("Login error:", error); // Log error
//             if (error.response && error.response.data.message) {
//                 setMessage(error.response.data.message);
//             } else {
//                 setMessage("Login failed. Please try again.");
//             }
//         } finally {
//             setLoading(false);
//             console.log("Loading state:", loading); // Check loading state
//         }
//     };
    
//     return (
//         <>
//             {loading ? (
//                 <Loader /> // Show loader when loading state is true
//             ) : (
//                 <div className='login'>
//                     <div className="form-container">
//                         <p className="title">Login to <b>CLICK BYTES</b></p>
//                         <form className="form" onSubmit={handleLogin}>
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
//                             <button className="form-btn" type="submit">Login</button>
//                         </form>
//                         {message && <p>{message}</p>}
//                         <div className="signup-link">
//                             <p>Don't have an account?</p>
//                             <Link to="/signup">Sign Up</Link>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component
import './Login.css'; // Updated CSS path
import img from "../USER PAGE/images/full-shot-young-people-partying-outdoors.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
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
            const response = await axios.post("http://localhost:5000/api/user/login", {
                email,
                password,
            });

            console.log("Login Response:", response);

            if (response.data.status === "Success") {
                const userData = response.data.data;
                console.log("User Data:", userData);
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userId", userData._id);

                if (userData.isAdmin) {
                    navigate("/adminHome");
                } else {
                    navigate("/");
                }
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
                <div className="login-page">
                    

                    <div className="image-section" style={{borderRadius: "0 3rem 3rem 0"}}>
                        <img src={img} alt="Login Visual" className="login-image" />
                    </div>

                    <div className="form-section">
                        <div className="form-container">
                            <p className="login-title">Login to <b>CLICK BYTES</b></p>
                            <form className="login-form" onSubmit={handleLogin}>
                                <input
                                    type="email"
                                    className="login-input"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button className="login-btn" type="submit">Login</button>
                            </form>
                            {message && <p className="login-error">{message}</p>}
                            <div className="signup-link">
                                <p>Don't have an account?</p>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
