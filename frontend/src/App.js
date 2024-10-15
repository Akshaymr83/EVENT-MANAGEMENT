import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/USER PAGE/Home/Home';
import About from './components/USER PAGE/About/About';
import Services from './components/USER PAGE/Services/Services';
import Signup from './components/Login/SignUp';
import VerifyOTP from './components/Login/Verify';
import Login from './components/Login/Login';
import EventBooking from './components/USER PAGE/Booking/Booking';
import AdminHome from './components/ADMIN PAGE/home/AdminHome';
import AdminEvent from './components/ADMIN PAGE/Event/AdminEvent';
import EventList from './components/ADMIN PAGE/Event/EventList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]); // Shared state for events

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp/:userId" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<EventBooking />} />

          {/* ADMIN */}
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminEvent" element={<AdminEvent setEvents={setEvents} />} />
          <Route path="/eventList" element={<EventList events={events} setEvents={setEvents} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
