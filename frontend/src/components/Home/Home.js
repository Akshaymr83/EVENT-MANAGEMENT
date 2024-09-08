import React from 'react';
import Top from '../NAVBAR/Nav';
import '../Home/Home.css';
import bgimg from '../images/bachelorette-party.jpg';
import Footer from '../Footer/Footer';
import About from '../About/About';
import Services from '../Services/Services';
import Grid from '@mui/joy/Grid';
import Item from '@mui/joy/Grid';
import Works from '../Works/Works';
import Contact from '../Contact/Contact';
import Review from '../Review/Review';



function Home() {
  return (
    <>
      <Top />
    <div className='main-div'>
    
      <div className="Homecontainer" >
        <div className="image-container">
          <img className="bgimg" src={bgimg} alt="Event" />
          <div className="text-overlay">
            <h1 className="headline">FINAL CHOICE FOR ALL YOUR EVENTS</h1>
            <h2 className="subheadline">CHOOSE US</h2>
          </div>
        </div>
      </div>


      <div className="background container-fluid" style={{display:'flex',flexDirection:'column'}}>
        <h1>EVENT PLANNING IS<br></br> OUR<span className="highlight"> PASSION</span></h1>
        <p >We can help you</p>
        <div className="content">
          <div className="images-container1">  <p>Clickbytes Event Management is a dynamic and innovative company dedicated to transforming ordinary events into extraordinary experiences. With a team of passionate professionals, we specialize in crafting bespoke events that perfectly align with our clients' visions and goals. From corporate conferences and product launches to weddings and social gatherings, we offer a comprehensive range of services including event planning, design, logistics, and on-site coordination. Our commitment to excellence, attention to detail, and use of cutting-edge technology ensure that every event we manage is seamless, memorable, and impactful. At Clickbytes, we believe in creating unforgettable moments that </p></div>
          
           
         
          <div className="images-container">
          
            <div className="image-row">
              <div className="image-item">
                <img className="bgimg" src={bgimg} alt="Event" />
              </div>
              <div className="image-item">
                <img className="bgimg" src={bgimg} alt="Event" />
              </div>
            </div>
            <div className="image-row">
              <div className="image-item">
                <img className="bgimg" src={bgimg} alt="Event" />
              </div>
              <div className="image-item">
                <img className="bgimg" src={bgimg} alt="Event" />
              </div>
              
            </div>
            <button>View More</button>
          </div>
          
        
        </div>
        {/* <Grid container spacing={2} sx={{ flexGrow: 1 }}>
  <Grid xs={6} md={8}>
    <Item><img className="bgimg" src={bgimg} alt="Event" /></Item>
  </Grid>
  <Grid xs={6} md={4}>
    <Item><img className="bgimg" src={bgimg} alt="Event" /></Item>
   
    <Item><img className="bgimg" src={bgimg} alt="Event" /></Item>
  </Grid>
  <Grid xs={6} md={4} >
    <Item><img className="bgimg" src={bgimg} alt="Event" /></Item>
  </Grid>
  <Grid xs={6} md={8}>
    <Item><img className="bgimg" src={bgimg} alt="Event" /></Item>
  </Grid>
</Grid> */}
      </div>
      <About/>
      <Services/>
      <Works/>
      <Review/>
      <Contact/>
 
     
    </div>
    <Footer/>
    </>
  );
}

export default Home;
