import React from 'react'
import { Link } from 'react-router-dom'

function Catnavbar() {
  return (
    <nav className='navbar bg-body-secendory px-5'>
            <a href="#" className='navbar-brand'><h1>Categories</h1></a>
       
           <div className='d-flex gap-3'>
           <Link  to={"/"} className='btn btn-info'>GO-TO USER</Link>
           <Link  to={"/CategoryTable/Form"} className='btn btn-success'>ADD</Link>
           <Link  to={"/CategoryTable/Trash"} className='btn btn-danger'>Trash</Link>
           </div>
     </nav>
  )
}

export default Catnavbar