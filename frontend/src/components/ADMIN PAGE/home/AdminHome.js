import React from 'react'
import { Link } from 'react-router-dom'
import '../home/AdminHome.css'
import AdminNav from '../AdminNav/AdminNav'

function AdminHome() {
  return (
    <div className='adminContainer'>AdminHome
    <AdminNav/>

     {/* <Link to={"/adminEvent"}><button><h2>Add event</h2></button></Link> 
     <Link to={"/eventList"}><button><h2>EventList</h2></button></Link>  */}
    </div>
  )
}

export default AdminHome