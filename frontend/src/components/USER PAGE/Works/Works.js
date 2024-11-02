import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import './Works.css';  // Ensure the path to your CSS file is correct

import img1 from '../images/evening-summer-sun-makes-halo-around-beautiful-wedding-couple.jpg';
import img2 from '../images/bachelorette-party.jpg';
import img3 from '../images/beautiful-couple-having-their-wedding-beach.jpg';

const itemData = [
  {
    img: img1,
    title: 'Image 1'
  },
  {
    img: img2,
    title: 'Image 2'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  {
    img: img2,
    title: 'Image 2'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  {
    img: img2,
    title: 'Image 2'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  ,
  {
    img: img3,
    title: 'Image 3'
  },
  {
    img: img2,
    title: 'Image 2'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  ,
  {
    img: img3,
    title: 'Image 3'
  },
  {
    img: img2,
    title: 'Image 2'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  ,
  {
    img: img3,
    title: 'Image 3'
  },
  {
    img: img2,
    title: 'Image 2'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  {
    img: img3,
    title: 'Image 3'
  },
  // Add more images as needed
];

function Works() {
  return (
    <div id='works' >
      <div className="WorkTitle">
          <h1 className="Work-head2">
            OUR <span style={{ color: 'rgba(255, 214, 0, 1)' }}>WORKS</span>
          </h1>
        </div>
         
        <div className="WorkTitle2">
          <h1 className="Work-head3">
            CAPTURING
          </h1>
          <p>THE MOMENTS THAT CAPTITAVE YOUR HEART</p>
        </div>
      <div className="WorkContainer" >
       
        
        <div className='photobox' >
        <ImageList variant="masonry" cols={3} gap={8}>
  {itemData.map((item) => (
    <ImageListItem key={item.img}>
      <img
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.img}?w=248&fit=crop&auto=format`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
        </div> 
      </div>
      <div style={{borderTop:'0.5px solid black'}} >
            <p style={{margin:'6rem',fontSize:'18px',fontWeight:'600',lineHeight:'40px',textAlign:'center'}}>
            At <span>CLICK BYTES</span>, we specialize in transforming your visions into reality.
             Our team of experienced event planners and managers work tirelessly to create
              memorable experiences that leave a lasting impression.
            </p>
        </div>

        <div className='feedbacks'>

          <h1 className='feedbackstitle'>FEEDBACKS</h1>
          <div class="input-container">
         <input type="text" name="text" class="input" placeholder="Enter text"/>

         <div className='inputbox2' >
         <input type="text" name="text" class="input" placeholder="Enter text"/>
         <input type="text" name="text" class="input" placeholder="Enter text"/>
         </div>
         <input type="text" name="text" class="input" placeholder="Enter text"/>
  
           </div>
           <button className='sub-btn'>Submit</button>

        </div>


              
    </div>
  );
}

export default Works;
