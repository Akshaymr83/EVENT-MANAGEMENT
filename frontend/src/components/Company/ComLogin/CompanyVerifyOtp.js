import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader"; // Ensure this component is properly imported

const VerifyCompanyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", ""]); // Array to hold 4 digits
    const [message, setMessage] = useState("");
    const { companyId } = useParams(); // Get companyId from URL params
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Update OTP input
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === "") { // Allow only digits
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    // Combine the OTP values into a single string
    const combinedOtp = otp.join("");

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await axios.post("http://localhost:5000/api/company/verify-Companyotp", {
                    companyId,
                    otp: combinedOtp,
                });
    
                console.log(response.data); // Log response to inspect structure
    
                // If verification is successful, store company details in localStorage and navigate to home page
                if (response.data.status === "Success") {
                    setMessage(response.data.message);
    
                    // Fetch company details and store them after verification (adjust according to response structure)
                    const company = response.data.data?.company; // Use optional chaining in case data structure differs
                    if (company) {
                        localStorage.setItem("company", JSON.stringify(company));
                    }
    
                    navigate("/companyLogin"); // Navigate to company login page
                } else {
                    setMessage(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("OTP verification failed. Please try again.");
                }
            } finally {
                setLoading(false); // Hide loader after submission
            }
        }, 3000); // Simulate a 3-second loading time
    };

    return (
        <div className="verify-otp">
            {loading ? (
                <Loader /> // Show loader during API request
            ) : (
                <form className="otp-Form" onSubmit={handleVerify}>
                    <span className="mainHeading">Enter OTP for Company Verification</span>
                    <p className="otpSubheading">
                        We have sent a verification code to the email associated with your company
                    </p>
                    <div className="inputContainer">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="otp-input"
                                value={value}
                                onChange={(e) => handleOtpChange(e, index)}
                                required
                            />
                        ))}
                    </div>
                    <button className="verifyButton" type="submit">
                        Verify
                    </button>
                    
                    <p className="resendNote">
                        Didn't receive the code? <button className="resendBtn">Resend Code</button>
                    </p>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyCompanyOTP;
