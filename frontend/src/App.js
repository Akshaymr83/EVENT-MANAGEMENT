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
import AdminLayout from './components/ADMIN PAGE/AdminLayout/AdminLayout';
import UsersTable from './components/ADMIN PAGE/Tables/UserTable';
import CompanyTable from './components/ADMIN PAGE/Tables/CompanyTable';
import Halls from './components/USER PAGE/Halls/Halls';

import UserLayout from './components/USER PAGE/UserLayout/UserLayout';
import HallBanner from './components/USER PAGE/Halls/HallBanner';


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
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/about" element={<UserLayout><About /></UserLayout>} />
        <Route path="/services" element={<UserLayout><Services /></UserLayout>} />
        <Route path="/signup" element={<UserLayout><Signup /></UserLayout>} />
        <Route path="/verify-otp/:userId" element={<UserLayout><VerifyOTP /></UserLayout>} />
        <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
        <Route path="/booking" element={<UserLayout><EventBooking /></UserLayout>} />
        <Route path="/bookingDetails" element={<UserLayout><BookingDetails /></UserLayout>} />
        <Route path="/packages" element={<UserLayout><EventPackages /></UserLayout>} />
        <Route path="/halls" element={<UserLayout><Halls /></UserLayout>} />
        <Route path="/hallBanner" element={<UserLayout><HallBanner /></UserLayout>} />

      

          {/* ADMIN */}
          <Route path="/adminHome" element={<AdminLayout><AdminHome /></AdminLayout>} />
          <Route path="/adminEvent" element={<AdminLayout><AdminEvent setEvents={setEvents} /></AdminLayout>} />
          <Route path="/eventList" element={<AdminLayout><EventList events={events} setEvents={setEvents} /></AdminLayout>} />
          <Route path="/packagesForm" element={<AdminLayout><PackagesForm /></AdminLayout>} />
          <Route path="/packagesCard" element={<AdminLayout><PackagesCard /></AdminLayout>} />
          <Route path="/userTable" element={<AdminLayout><UsersTable /></AdminLayout>} />
          <Route path="/companyTable" element={<AdminLayout><CompanyTable /></AdminLayout>} />

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
