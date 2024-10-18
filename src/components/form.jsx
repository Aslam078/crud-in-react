import React from 'react'
import { useState, useEffect } from 'react'
import FormNav from './element/formnav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Category from './category';
import { Bounce, toast } from 'react-toastify';

function Form() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    category: "",
  })

  
  const onchangehandle = (e) => {
    const { name, value } = e.target
    // console.log(name, value);
    setDetails((prev) => {
      return{...prev, [name]:value}
    });
  }
  

  const submithandle = (e) => {
    e.preventDefault()
    console.log(details);
    
    axios({
      url: "http://localhost:3000/users",
      method: "POST",
      data: details,
  })
      // Handle the response from backend here
      .then((res) => {
        toast.info('Data Store Succesfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      })

      // Catch errors if any
      .catch((err) => {});
      navigate('/');

  }

  return (
    <div className='container'>
      <FormNav />
      <div className='d-flex justify-content-center  align-items-center'>
        <form onSubmit={submithandle} className='d-flex flex-column mt-5'>
          <div className="mb-3 d-flex gap-3">
            <label >Name:</label>
            <input type="text" name='name'  value={details.name} onChange={onchangehandle} className="form-control" required />
          </div>
          <div className="mb-3 d-flex gap-3 ">
            <label>Email:</label>
            <input type="email" name='email' value={details.email} onChange={onchangehandle} className="form-control" required />
          </div>


          <div className='d-flex gap-1 mb-2'>

          <label >Category: </label>
            <select className='w-100 text-center'
            onChange={onchangehandle}
            value={details.category}
            name='category'>

              <option>Options</option>
              <Category />
            
            </select>

          </div>
          <button className='btn btn-info' type='submit'>Submit</button>
        </form>
      </div>
    </div >

  )

}

export default Form