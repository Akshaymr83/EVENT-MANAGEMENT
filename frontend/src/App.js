import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/USER PAGE/Home/Home';
import About from './components/USER PAGE/About/About';
import Services from './components/USER PAGE/Services/Services';
import Signup from './components/Login/SignUp';
import VerifyOTP from './components/Login/Verify';
import Login from './components/Login/Login';

import AdminHome from './components/ADMIN PAGE/home/AdminHome';
import AdminEvent from './components/ADMIN PAGE/Event/AdminEvent';
import EventList from './components/ADMIN PAGE/Event/EventList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingDetails from './components/USER PAGE/Booking/BookingDetails';
import Top from './components/USER PAGE/NAVBAR/Nav';
import EventBooking from './components/USER PAGE/Booking/EventBooking';
import EventPackages from './components/USER PAGE/Packages/Packages';
import PackagesForm from './components/ADMIN PAGE/PackagesForm';
import PackagesCard from './components/ADMIN PAGE/Packages/PackagesCard';
import CompanyHome from './components/Company/ComHome/CompanyHome';
import CompanyLogin from './components/Company/ComLogin/ComLogin';
import CompanySignup from './components/Company/ComLogin/ComSignup';
import EventHallCard from './components/Company/EventHall/EventHallCard';
import EventHallForm from './components/Company/EventHall/EventHallForm';
import VerifyCompanyOTP from './components/Company/ComLogin/CompanyVerifyOtp';
import CompanyLayout from './components/Company/CompanyLayout/CompanyLayout';

function App() {
  const [events, setEvents] = useState([]); // Shared state for events
  const userId = localStorage.getItem("userId");
  const companyId = localStorage.getItem("companyId");

  // Fetch events initially
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/events') // Correct port
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  }, []);

  return (
    
    <div className="App">

    
      <Router>
      {/* <Top/> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp/:userId" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<EventBooking/>} />
          <Route path="/bookingDetails" element={<BookingDetails userId={userId} />} />
          <Route path= "/packages" element={<EventPackages/>}/>

          {/* ADMIN */}
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminEvent" element={<AdminEvent setEvents={setEvents} />} />
          <Route path="/eventList" element={<EventList events={events} setEvents={setEvents} />} />
          <Route path="/packagesForm"  element={<PackagesForm/>}/>
          <Route path="/packagesCard"  element={<PackagesCard/>}/>

          {/* COMPANY */}

          <Route path="/companyHome" element={<CompanyLayout><CompanyHome /></CompanyLayout>} />
          <Route path="/companyLogin" element={<CompanyLayout><CompanyLogin /></CompanyLayout>} />
          <Route path="/companySignup" element={<CompanyLayout><CompanySignup /></CompanyLayout>} />
          <Route path="/verify-Companyotp/:companyId" element={<CompanyLayout><VerifyCompanyOTP /></CompanyLayout>} />
          <Route path="/eventHallCard" element={<CompanyLayout><EventHallCard /></CompanyLayout>} />
          <Route path="/eventHallForm" element={<CompanyLayout><EventHallForm /></CompanyLayout>} />


          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
