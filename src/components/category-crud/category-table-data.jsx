import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';


function Categorytabledata() {
    const [category, setCategory] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:3000/categories").then(res => {
            console.log("===>", res.data)
            setCategory(res.data)
        })
    },[]);

    const deletecategory = async(id) => {
        await axios.delete(`http://localhost:3000/categories/${id}`).then(res => console.log(res)).catch(err => console.log(err));
        const delet = category.filter(data => data.id !== id);
        setCategory(delet)
        toast.error('Category deleted', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
          
    }

    const setcategory = () => {
        const datas = category.map((data,id) => (
            <tr key={id}>
                <td>{data.name}</td>
                <td className='d-flex gap-3'>
                    <Link className='btn btn-outline-success' to={`/CategoryTable/Edit-Category/${data.id}`}>Edit</Link>
                    <button className='btn btn-outline-danger' onClick={() => deletecategory(data.id)}>Delete</button>
                </td>
            </tr>
        ))
        return datas
    }


  return (

    setcategory()
    
  )
}

export default Categorytabledata