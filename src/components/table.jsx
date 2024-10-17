// import React, { useState } from 'react'
// import Navbar from './element/navbar';
// import Datas from './datas';

import Navbar from "./element/navbar"
import Userdata from "./table-data"



function Table() {

  return (
     <div className='container'>
      <Navbar />
       <table className="table">
  <thead>
    <tr>
    <th>Name</th>
      <th>Email</th>
      <th>option</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody >
  
 <Userdata />
 
  </tbody>
</table>
     </div>
  )
}

export default Table
