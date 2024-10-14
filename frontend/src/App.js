import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Services from './components/Services/Services';
import '../src/App.css';

import Signup from './components/Login/SignUp';
import VerifyOTP from './components/Login/Verify';
import Loader from './components/Loader/Loader';
import CompanyHome from './components/Company/ComHome/CompanyHome';
import CompanyLogin from './components/Company/ComLogin/ComLogin';
import CompanySignup from './components/Company/ComLogin/ComSignup';
import Login from './components/Login/Login';
import EventBooking from './components/Booking/Booking';
import AdminHome from './components/ADMIN PAGE/home/AdminHome';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp/:userId" element={<VerifyOTP />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/booking" element={<EventBooking/>} />
 


          {/* COMPANY */}
          {/* <Route path="/companyLogin" element={<CompanyLogin />} />
          <Route path="/companySignup" element={<CompanySignup />} />
          <Route path ="/companyHome" element={<CompanyHome/>} /> */}

          {/* ADMIN */}
          <Route path="/adminHome" element={<AdminHome />} />
        </Routes>
   
      </Router>
     
    </div>
  );
}

export default App;
