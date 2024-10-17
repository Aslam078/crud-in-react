import React from 'react'
import { Link } from "react-router-dom"

function CatFormNav() {
  return (
    <nav className='navbar bg-body-secendory px-5'>
            <a href="#" className='navbar-brand'><h1>Add Category</h1></a>
       
            <Link  to={"/CategoryTable"} className='btn btn-danger'>Home Page</Link>
     </nav>
  )
}

export default CatFormNav