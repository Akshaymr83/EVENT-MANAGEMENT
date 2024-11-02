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
import img from '../images/female-wedding-planner-working-ceremony.jpg'



function Home() {
  return (
    <>
     
    <div className='main-div'>
    
      <div className="Homecontainer" >
        <div className="image-container ">
          <img className="bgimg" src={bgimg} alt="Event" />
          <div className="text-overlay ">
            <h1 className="headline ">FINAL CHOICE FOR ALL YOUR EVENTS</h1>
            <h2 className="subheadline ">CHOOSE US</h2>
          </div>
        </div>
      </div>


      <div className="background container-fluid " style={{display:'flex',flexDirection:'column'}}>
        <h1 className='anim'>EVENT PLANNING IS<br></br> OUR<span className="highlight"> PASSION</span></h1>
    

        <div className="content">

        <div className='homeImage '>
          <img src={img}></img>
          </div>

          <div className="images-container1 H-anim"> <h1 >WE CAN HELP YOU</h1> </div>
          
           
         
          
          
        
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
