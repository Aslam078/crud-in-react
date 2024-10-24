import React from 'react'
import { useState, useEffect } from 'react'
import FormNav from './element/formnav'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Category from './category';
import { Bounce, toast } from 'react-toastify';

function Form() {
  const navigate = useNavigate();
  // const {email} = useParams()
  const [details, setDetails] = useState({
    name: "",
    email: "",
    category: [],
    option:[],
    radio:[],
    image:''
  })

  const uploadimg = async(e) => {
    const file = e.target.files[0];
    const base64 = await convertbase(file)
    setDetails((prev) => ({
      ...prev,
      image:base64
    }))
    // console.log(e.target.files);
    
  }

  const convertbase = (file) => {
    return new Promise ((resolve,reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file)

      filereader.onload = () => { 
        resolve(filereader.result)
      }
      filereader.onerror = (error) => {
        reject(error);
      }
    });
  }
  
  const onchangehandle = (e) => {
    const { name, value } = e.target
    // console.log(name, value);
      setDetails((prev) => {
        return{...prev, [name]:value}
      })
    }

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/users?email=${email}`);
      // console.log("respone =====",response);
      return response.data.length > 0;
      
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  // console.log("email========>",details.email);



  const submithandle = async(e) => {
    e.preventDefault()
    console.log(details);

    const emailExists = await checkEmailExists(details.email);
      if (emailExists) {
        toast.warn('Email is already in use', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
    
    axios({
      url: "http://localhost:3000/users",
      method: "POST",
      data: details,
  })
      // Handle the response from backend here
      .then((res) => {
        toast.info('Data Store Succesfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      })
      .catch((err) => {});
      navigate('/');
  }

  return (
    <div className='container'>
      <FormNav />
      <div className='d-flex justify-content-center  align-items-center'>
        <form onSubmit={submithandle} className='d-flex gap-1 flex-column mt-5'>
          <div className="mb-3 d-flex gap-3">
            <label >Name:</label>
            <input type="text" name='name'  value={details.name} onChange={onchangehandle} className="form-control" required />
          </div>
          <div className="mb-3 d-flex gap-3 ">
            <label>Email:</label>
            <input type="email" name='email' value={details.email} onChange={onchangehandle} className="form-control" required />
          </div>

          <div className="mb-3 d-flex gap-3 ">
                    <label>vehicle:</label>
                    <label  className="form-check-label" htmlFor='checkbox-one'>car</label>
                    <input type="checkbox" id='checkbox-one'  name='option' value={'car'} onChange={onchangehandle} />
                    <label htmlFor='checkbox-two'>bike</label>
                    <input type="checkbox" id='checkbox-two' name='option' value={'bike'}  onChange={onchangehandle} />
                    <label htmlFor='checkbox-three'>boat</label>
                    <input type="checkbox" id='checkbox-three' name='option' value={'boat'}  onChange={onchangehandle} />
                </div>

          <div className="mb-3 d-flex gap-3 ">
            <label>Option:</label>
            <input type="radio" id='radio-one'  name='radio' value={details.radio + 'active'} onChange={onchangehandle} />
            <label htmlFor='radio-one'>active</label>
            <input type="radio" id='radio-two' name='radio' value={details.radio + 'inactive'}  onChange={onchangehandle} />
            <label htmlFor='radio-two'>inactive</label>
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

        <div className='d-flex gap-4 mb-3'>
          <label>Photo:</label>
          <input type="file" name='image' onChange={uploadimg} />
        </div>

          <button className='btn btn-info text-white' type='submit'>Submit</button>
        </form>
      </div>
    </div >

  )

}

export default Form