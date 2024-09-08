import React from 'react'
import "../Footer/Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className='footerbox'>
        <div className='footer-container' >
            <div className='logo'>
                <h1>CLICKBYTES</h1></div>
            <div className='lists'>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Services</li>
                    <li>Careers</li>
                    </ul>
               
            </div>
            <div className='icons'>
            <ul>
                    <li> <FontAwesomeIcon icon={faFacebook} size="2x" /></li>
                    <li> <FontAwesomeIcon icon={faTwitter} size="2x" /></li>
                    <li> <FontAwesomeIcon icon={faInstagram} size="2x" /></li>
                    <li> <FontAwesomeIcon icon={faYoutube} size="2x" /></li>
                    </ul>
                
            </div>
        </div>
    </div>
  )
}

export default Footer