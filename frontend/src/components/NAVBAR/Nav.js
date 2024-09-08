// import React from 'react'
// import "../NAVBAR/Nav.css"
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';


// function Top() {
//   return (
//     <div className='navbarcontainer'>
//          <Navbar fixed="top"  >
//         <Container>
//           <Navbar.Brand href="#home">CLICK BYTES</Navbar.Brand>
//           <Nav className="me-auto">
//            <Nav.Link href="#home">Home </Nav.Link>
//            <Nav.Link href="#about">About Us </Nav.Link>
//           <Nav.Link href="#services"> Services</Nav.Link>
//             <Nav.Link href="#works">Our Works</Nav.Link>
//             <Nav.Link href="#contact">Contact Us</Nav.Link>
//             <Nav.Link href="#careers">Careers</Nav.Link>
//           </Nav>
//           <Link to={'/login'}> <button className='LoginButton'>Login</button></Link>
//         </Container>
//       </Navbar>
//     </div>
//   )
// }

// export default Top
import React from 'react';
import "../NAVBAR/Nav.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Top() {
  return (
    <div className='navbarcontainer'>
      <Navbar fixed="top" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#home">CLICK BYTES</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#works">Our Works</Nav.Link>
              <Nav.Link href="#contact">Contact Us</Nav.Link>
              <Nav.Link href="#careers">Careers</Nav.Link>
            </Nav>
            <Link to={'/signup'}>
              <button className='LoginButton'>Login</button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Top;
