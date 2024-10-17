import React from 'react'
import FormNav from './element/formnav'
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Category from './category';

function Edit() {
    const navigate = useNavigate();
    let { id } = useParams();
    console.log("params id", id);

    const [user, setUser] = useState({ name: '', email: '', category: '' })

    const onchangehandle = (e) => {

        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        axios.patch(`http://localhost:3000/users/${id}`)
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

    }

    return (
        <div className='container'>
            <FormNav />
            <div className='d-flex justify-content-center  align-items-center'>
                <form onSubmit={submithandle} className='d-flex flex-column   align-items-center mt-5'>
                    <div className="mb-3 d-flex gap-3">
                        <label >Name:</label>
                        <input type="text" value={user.name} onChange={onchangehandle} className="form-control" />
                    </div>
                    <div className="mb-3 d-flex gap-3 ">
                        <label>Email:</label>
                        <input type="email" value={user.email} onChange={onchangehandle} className="form-control" />
                    </div>

                    <div className='d-flex gap-1 mb-2'>

                        <label >Category: </label>
                        <select
                        onChange={onchangehandle}
                            name='category'
                            value={user.category}>

                            <option>---Options---</option>
                            <Category />

                        </select>
                    </div>
                    <button className='btn btn-info' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit