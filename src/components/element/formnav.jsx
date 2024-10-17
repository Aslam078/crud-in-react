import React from 'react'
import { Link } from "react-router-dom"

function FormNav() {
  return (
    <nav className='navbar bg-body-secendory px-5'>
            <a href="#" className='navbar-brand'><h1>Add User</h1></a>
       
            <Link  to={"/"} className='btn btn-danger'>Home Page</Link>
     </nav>
  )
}

export default FormNav