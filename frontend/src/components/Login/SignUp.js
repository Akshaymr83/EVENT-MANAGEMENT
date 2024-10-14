// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import '../Login/Login.css'

// const Signup = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/api/user/signup", {
//                 name,
//                 email,
//                 password,
//                 dateOfBirth,
//             });

//             // Check if OTP was successfully sent
//             if (response.data.status === "PENDING") {
//                 setMessage(response.data.message);

//                 // Navigate to the OTP verification page with userId
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
//         }
//     };

//     return (
      
      
//         <div>
            // <form onSubmit={handleSignup}>
            //     <input
            //         type="text"
            //         placeholder="Name"
            //         onChange={(e) => setName(e.target.value)}
            //         required
            //     />
            //     <input
            //         type="email"
            //         placeholder="Email"
            //         onChange={(e) => setEmail(e.target.value)}
            //         required
            //     />
            //     <input
            //         type="password"
            //         placeholder="Password"
            //         onChange={(e) => setPassword(e.target.value)}
            //         required
            //     />
            //     <input
            //         type="date"
            //         onChange={(e) => setDateOfBirth(e.target.value)}
            //         required
            //     />
            //     <button type="submit">Sign Up</button>
            // </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Signup;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Loader from "../Loader/Loader"; // Import the Loader component
// import '../Login/Login.css';
// import { Link } from 'react-router-dom';

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

//         setTimeout(async () => {
//             try {
//                 const response = await axios.post("http://localhost:5000/api/user/signup", {
//                     name,
//                     email,
//                     password,
//                     dateOfBirth,
//                 });

//                 if (response.data.status === "PENDING") {
//                     setMessage(response.data.message);
//                     navigate(`/verify-otp/${response.data.data.userId}`);
//                 } else {
//                     setMessage(response.data.message);
//                 }
//             } catch (error) {
//                 if (error.response && error.response.data.message) {
//                     setMessage(error.response.data.message);
//                 } else {
//                     setMessage("Signup failed. Please try again.");
//                 }
//             } finally {
//                 setLoading(false); // Hide loader after submission
//             }
//         }, 3000); // Simulate a 3-second loading time
//     };

//     return (
//         <>
//             {loading ? (
//                 <Loader /> // Show loader when loading state is true
//             ) : (
//                 <div className='login'>
//                     <div class="form-container">
//                         <p class="title">Welcome To <b>CLICK BYTES</b></p>
//                         <form className="form" onSubmit={handleSignup}>
//                             <input
//                                 type="text"
//                                 class="input"
//                                 placeholder="Name"
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="email"
//                                 class="input"
//                                 placeholder="Email"
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="password"
//                                 class="input"
//                                 placeholder="Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="date"
//                                 onChange={(e) => setDateOfBirth(e.target.value)}
//                                 required
//                                 class="input"
//                             />
//                             <button class="form-btn" type="submit">Sign Up</button>
//                         </form>
//                         {message && <p>{message}</p>}
//                         {/* <div class="buttons-container">
//                             <div class="apple-login-button">
//                                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" class="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
//                                 </svg>
//                                 <span>Log in with Apple</span>
//                             </div>
//                             <div class="google-login-button">
//                                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" class="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
//                                     <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
//                                     c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
//                                     c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
//                                     <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
//                                     C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
//                                     <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C28.755,34.954,26.478,36,24,36
//                                     c-5.201,0-9.631-3.338-11.285-8H6.09l-6.596,5.054C5.012,39.873,13.722,44,24,44z"></path>
//                                     <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.783,2.211-2.109,4.09-3.834,5.572
//                                     c0.002-0.002,0.004-0.003,0.006-0.005l6.19,5.238C36.903,39.864,44,32.504,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
//                                 </svg>
//                                 <span>Log in with Google</span>
//                             </div>
//                         </div> */}
//                         <div class="signup-link">
//                             <p>Already have an account?</p>
                           
//                             <p>Company Login?</p>
//                             </div>
//                             <div class="signup-link">
//                             <Link to="/login">Login</Link>
//                             <Link to="/companySignup">Company Login</Link>
//                         </div>
                       
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// };

// export default Signup;

// *******************first*****************

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Loader from "../Loader/Loader"; // Import the Loader component
// import '../Login/Login.css';

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
//                         <div className="signup-link">
//                             <p>Company Login?</p>
//                             <Link to="/companySignup">Company Login</Link>
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
import '../Login/Login.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // For loading state
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader on submit

        try {
            const response = await axios.post("http://localhost:5000/api/user/signup", {
                name,
                email,
                password,
                dateOfBirth,
            });

            if (response.data.status === "PENDING") {
                setMessage(response.data.message);
                
                // Storing preliminary user data in localStorage before OTP verification
                localStorage.setItem("user", JSON.stringify({ name, email }));

                // Navigate to OTP verification page with userId
                navigate(`/verify-otp/${response.data.data.userId}`);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Signup failed. Please try again.");
            }
        } finally {
            setLoading(false); // Hide loader after submission
        }
    };

    return (
        <>
            {loading ? (
                <Loader /> // Show loader when loading state is true
            ) : (
                <div className='login'>
                    <div className="form-container">
                        <p className="title">Welcome To <b>CLICK BYTES</b></p>
                        <form className="form" onSubmit={handleSignup}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                className="input"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="input"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                                className="input"
                            />
                            <button className="form-btn" type="submit">Sign Up</button>
                        </form>
                        {message && <p>{message}</p>}
                        <div className="signup-link">
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </div>
                     
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;
