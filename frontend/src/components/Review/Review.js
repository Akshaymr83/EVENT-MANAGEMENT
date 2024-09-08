import React from 'react'
import '../Review/Review.css'
import img from '../images/pexels-photo-415829.webp'

function Review() {
  return (
   <>
   <div className='reviewContainer'> 


    <div className='reviewbox'>
    <img src={img}/>
    <div className='reviewCard'> 

<p>"very goodservixe realy liked it, very 
  suortive servixe realy liked it, very suportive "<h6><b>:Ann Mariya</b></h6></p></div>
   
  </div>
   
  
  <div className='reviewbox'>
    <img src={img}/>
    <div className='reviewCard'> 

<p>"very goodservixe realy liked it, very 
  suortive servixe realy liked it, very suportive "<h6><b>:Ann Mariya</b></h6></p></div>
   
  </div>
   
 
  <div className='reviewbox'>
    <img src={img}/>
    <div className='reviewCard'> 

<p>"very goodservixe realy liked it, very 
  suortive servixe realy liked it, very suportive "<h6><b>:Ann Mariya</b></h6></p></div>
   
  </div>

    </div>  
   </>
  )
}

export default Review