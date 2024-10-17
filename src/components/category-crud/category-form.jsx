import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import CatFormNav from './element/cat-formnav';
import axios from 'axios';

function CategoryForm() {
    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    const onchangehandle = (e) => {
        const { name, value } = e.target
        setCategory((prev) => {
          return{...prev, [name]:value}
        });
      }


      const submithandle = (e) => {
        e.preventDefault()
        console.log(category);
        
        axios({
          url: "http://localhost:3000/categories",
          method: "POST",
          data: category,
      })
          // Handle the response from backend here
          .then((res) => {
            alert("data stored success");
          })
    
          // Catch errors if any
          .catch((err) => console.log("CategoryForm error", err));
    
          navigate('/CategoryTable');
    
      }


  return (
    <div className='container'>
      <CatFormNav />
      <div className='d-flex justify-content-center  align-items-center'>
        <form onSubmit={submithandle} className='d-flex flex-column mt-5'>
          <div className="mb-3 d-flex gap-3">
            <label >Category:</label>
            <input type="text" name='name'  value={category.name} onChange={onchangehandle} className="form-control" required />
          </div>
          

          <button className='btn btn-info' type='submit'>Submit</button>
        </form>
      </div>
    </div >
  )
}

export default CategoryForm