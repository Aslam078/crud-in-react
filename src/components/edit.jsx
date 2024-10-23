import React from 'react'
import FormNav from './element/formnav'
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Category from './category';
import { Bounce, toast } from 'react-toastify';

function Edit() {
    const navigate = useNavigate();
    let { id } = useParams();
    console.log("params id", id);

    const [user, setUser] = useState({ name: '', email: '', category: '', option:[],radio:'', image:'' })

    const imgchange = async(e) => {
        const file = e.target.files[0];
        const base64 = await ConvertToBase(file);
        setUser ((prev) => ({
            ...prev,
            image: base64
        }))
    }

    const ConvertToBase = (file) => {
        return new Promise ((resolve,reject) => {
            const fileread = new FileReader();
            fileread.readAsDataURL(file)

            fileread.onload = () => {
                resolve(fileread.result)
            }
            fileread.onerror = (error) => {
                reject(error);
            }
        })
    }

    const onchangehandle = (e) => {

        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(res => {
                setUser(res.data);
                //  setDetails(res.data);
                console.log("edit data", res.data);
            }

            )
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    console.error("Data not found for this ID:", id);
                    //    alert("Data not found!");  
                } else {
                    console.error("Data Error:", err);
                }
            });
    }, [])


    const EditData = async () => {
        console.log("fdslfsh");
        await axios.patch(`http://localhost:3000/users/${id}`, user)

    }

    const submithandle = (e) => {
        e.preventDefault();
        console.log("edit data", e);
        console.log("edit username", user);
        EditData();
        navigate('/')
        toast.success("data stored success",{
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

    } 

    return (
        <div className='container'>
            <nav className='navbar bg-body-secendory px-5'>
            <a href="#" className='navbar-brand'><h1>Edit User</h1></a>
       
            <Link  to={"/"} className='btn btn-danger'>Home Page</Link>
        </nav>
            <div className='d-flex justify-content-center  align-items-center'>
                <form onSubmit={submithandle} className='d-flex gap-1 flex-column mt-5 w-50'>
                    <div className="mb-3 d-flex gap-3">
                        <label >Name:</label>
                        <input type="text" name='name' value={user.name} onChange={onchangehandle} className="form-control" />
                    </div>
                    <div className="mb-3 d-flex gap-3 ">
                        <label>Email:</label>
                        <input type="email" name='email' value={user.email} onChange={onchangehandle} className="form-control" />
                    </div>

                <div className="mb-3 d-flex gap-3 "> 
                    <label>vehicle:</label>
                    <input type="checkbox" id='checkbox-one'  name='option' value={'car'} checked={user.option === 'car'} onChange={onchangehandle} />
                    <label htmlFor='checkbox-one'>car</label>
                    <input type="checkbox" id='checkbox-two' name='option' value={'bike'} checked={user.option === 'bike'}  onChange={onchangehandle} />
                    <label htmlFor='checkbox-two'>bike</label>
                    <input type="checkbox" id='checkbox-three' name='option' value={'boat'} checked={user.option === 'boat'}  onChange={onchangehandle} />
                    <label htmlFor='checkbox-three'>boat</label>
                </div>

          <div className="mb-3 d-flex gap-3 ">
            <label>Option:</label>
            <input type="radio" id='radio-one'  name='radio' value={'active'} checked={user.radio === 'active'} onChange={onchangehandle} />
            <label htmlFor='radio-one'>active</label>
            <input type="radio" id='radio-two' name='radio' value={'inactive'} checked={user.radio === 'inactive'}  onChange={onchangehandle} />
            <label htmlFor='radio-two'>inactive</label>
          </div>

                    <div className='d-flex gap-1 mb-2 w-100'>

                        <label >Category: </label>
                        <select className='w-100 text-center'
                        onChange={onchangehandle}
                            name='category'
                            value={user.category}>

                            <option>---Options---</option>
                            <Category />

                        </select>
                    </div>

                    <div className='d-flex gap-2'>
                        <label>Change image:</label>
                        <input type="file" name="image" onChange={imgchange}   />
                    </div>

                    <button className='btn btn-info' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit