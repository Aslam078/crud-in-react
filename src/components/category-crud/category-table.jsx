// import React, { useState } from 'react'
// import Navbar from './element/navbar';
// import Datas from './datas';


import Categorytabledata from "./category-table-data"
import Catnavbar from "./element/cat-nav"



function CategoryTable() {



  return (
    <div className='container'>
      <Catnavbar />
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          <Categorytabledata />

        </tbody>
      </table>
    </div>
  )
}

export default CategoryTable