import React from 'react';
import "../../USER PAGE/NAVBAR/Nav.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';

function AdminNav() {
  const navigate = useNavigate(); // For redirecting the user after logout
  
  // Safely retrieve and parse the user data from localStorage
  const user = localStorage.getItem("user");

  let parsedUser = null;
  try {
    if (user) {
      parsedUser = JSON.parse(user); // Try parsing only if user exists
    }
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error);
  }

  // Handle logout functionality
  const handleLogout = () => {
    alert("Do you want to logout")
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/adminHome"); // Redirect to signup or login page after logout
    window.location.reload(); // Refresh the page to reflect logout state
  };

  return (
    <div className='navbarcontainer'>
      <Navbar fixed="top" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand >CLICK BYTES ADMIN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">    
            <Nav.Link href="" as={Link} to='/userTable'>Users</Nav.Link>      
            <Nav.Link href="" as={Link} to='/companyTable'>Companies</Nav.Link>          
              <NavDropdown href="" title="Events" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/adminEvent" href="#action/3.1"> Add Event</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"  as={Link} to="/eventList"  >
                Added Events
              </NavDropdown.Item>           
            </NavDropdown>
            <NavDropdown href="" title="Packages" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/packagesForm" href="#action/3.1"> Add Packages</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"  as={Link} to="/packagesCard"  >
                Added Packages
              </NavDropdown.Item>           
            </NavDropdown>
           
                    </Nav>
            {parsedUser ? (
              <div className="user-options" style={{ position: 'relative' }}>
                {/* New popup structure */}
                <label className="popup">
                  <input type="checkbox" />
                  <div tabindex="0" class="burger">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                      ></path>
                    </svg>
                  </div>
                  <nav className="popup-window">
                    <legend ><b>Hello, {parsedUser.name}</b>
                    </legend>
                    <ul>
                      <li>
                        <button>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 4v6.406l-3.753 3.741-6.463-6.462 3.7-3.685h6.516zm2-2h-12.388l1.497 1.5-4.171 4.167 9.291 9.291 4.161-4.193 1.61 1.623v-12.388zm-5 4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm6.708.292l-.708.708v3.097l2-2.065-1.292-1.74zm-12.675 9.294l-1.414 1.414h-2.619v2h-2v2h-2v-2.17l5.636-5.626-1.417-1.407-6.219 6.203v5h6v-2h2v-2h2l1.729-1.729-1.696-1.685z"
                            ></path>
                          </svg>
                          <span onClick={handleLogout}>Log Out</span>
                        </button>
                      </li>
                    
                    </ul>
                  </nav>
                </label>
              </div>
            ) : (
              // If not logged in, show login button
              <Link to={'/signup'}>
                <button className='LoginButton'>Login</button>
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNav