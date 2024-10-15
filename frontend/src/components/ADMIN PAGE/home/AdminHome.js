import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <div>AdminHome

     <Link to={"/adminEvent"}><button><h2>Add event</h2></button></Link> 
     <Link to={"/eventList"}><button><h2>EventList</h2></button></Link> 
    </div>
  )
}

export default AdminHome