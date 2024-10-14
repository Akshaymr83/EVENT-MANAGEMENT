import React from 'react'
import Top from '../NAVBAR/Nav'
import './Careers.css'
import img from '../images/cheerful-young-businessman-sitting-seminar_1262-2088.jpg'

function Careers() {
  return (
    <div id='careers'>
        <Top/>
        <div className='CareerBox'>
            <h1>JOIN <span>US</span></h1>
            <div><img src={img}></img></div>

        </div>
    </div>
  )
}

export default Careers