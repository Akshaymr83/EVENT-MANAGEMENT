import React from 'react'
import './About.css'
import Top from '../NAVBAR/Nav'
import Footer from '../Footer/Footer';

import aboutimg from '../images/caucasian-romantic-young-couple-celebrating-their-marriage-city-tender-bride-groom-modern-city-s-street-family-relationship-love-concept.jpg';

function About() {
  return (
    <>

    <div className='AboutContainer' id='about' style={{marginBottom:'4rem'}}>
        <div className='About-title'> 
            <h1 className='ourstory anim'><span >WHO WE ARE</span>​<br></br>
            We love to create,​<br></br>design and produce awesome event!</h1>
        </div>

        <div className='About-div' style={{display:'flex',justifyContent:'space-evenly'}}>
          <div className='About-text'>
            <p style={{color:'rgba(255, 214, 0, 1)'}}><b>Welcome to Click Bytes</b></p>
            <p>At Click Bytes, we are passionate about creating unforgettable moments and lasting memories. As a premier event management company, we specialize in orchestrating a diverse range of events that cater to your
               unique needs and aspirations. Whether it's a corporate gathering, a grand celebration, an intimate photoshoot, or a personalized gifting experience, we bring creativity, precision, and a touch of magic to every occasion.At Click Bytes, we are passionate about creating unforgettable moments and lasting memories. As a premier event management company, we specialize in orchestrating a diverse range of events that cater to your
               unique needs and aspirations. Whether it's a corporate gathering, a grand celebration, an intimate photoshoot, or a personalized gifting experience, we bring creativity, precision, and a touch of magic to every occasion.</p>
          </div>
          <div className='About-img'>
            <img src={aboutimg}></img>
          </div>
        </div>
        <div style={{marginLeft:"5rem",color:'white',margin:'4rem 0 5rem 0'}}>
      <h1  className='About-head2' style={{color:'rgba(255, 214, 0, 1)'}}><span >OUR </span>STORY</h1>
      <div className='About-head2p' style={{margin:'2rem 5rem 0 3rem',color:'black'}}><p>Founded with a vision to revolutionize the event management industry, Click Bytes has grown from a small startup to a trusted name in the field. Over the years, we have successfully 
        executed numerous events, each marked by meticulous planning, innovative ideas, and flawless execution. Our journey is fueled by a commitment to excellence and a deep understanding of the importance of every special moment.
        Founded with a vision to revolutionize the event management industry, Click Bytes has grown from a small startup to a trusted name in the field. Over the years, we have successfully 
        executed numerous events, each marked by meticulous planning, innovative ideas, and flawless execution. Our journey is fueled by a commitment to excellence and a deep understanding of the importance of every special moment.</p></div>
    </div>

    <div className='container3'>
      <h1 className='About-head3' >Why Choose Us</h1>

      <div  className='choose-div' >
        
      <div className='About-img2' >
      <img src={aboutimg}></img>
      </div>

      <div className='experience'>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        <p ><span style={{color:'black'}}><b>Experience:</b></span> With years of experience in event management, we understand the nuances of planning and executing a successful event.</p>
        <br></br>
        
      </div>
      </div>


    </div>
 
    </div>
    {/* <Footer/> */}

    </>
  )
}

export default About