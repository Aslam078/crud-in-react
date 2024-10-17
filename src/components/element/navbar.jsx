import React from 'react'
import {Link, Navigate} from "react-router-dom"


function Navbar() {
  return (
    <nav className='navbar bg-body-secendory px-5'>
            <a href="#" className='navbar-brand'><h1 >User Data</h1></a>
       
           <div className='d-flex gap-3'>
           <Link  to={"/CategoryTable"} className='btn btn-outline-dark'>GO-TO CATEGORY</Link>
           <Link  to={"/form"} className='btn btn-primary position-fixed bottom-0 end-0 m-5 rounded-circle'><i className="fa-solid fa-plus"></i></Link>
           </div>
     </nav>
  )
}

export default Navbar