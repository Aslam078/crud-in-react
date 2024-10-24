import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';


function Categorytabledata() {
    const [category, setCategory] = useState([]);

    const fetchTable =()=>{


        axios.get(`http://localhost:3000/categories`).then(res => {
            // console.log("===>", res.data)
            const del = res.data.filter(d => d.is_deleted !== 1)
            console.log("=== del", del);
            setCategory(del)
        }).catch(err => {});

    }
        useEffect(() => {
            fetchTable();
    }, []);

    const deletecategory = (id) => {
        const delet = {
            "is_deleted": 1
        }


         axios.patch(`http://localhost:3000/categories/${id}`, delet)
                .then(res => {
                    fetchTable();
                    console.log("==== del", res)
                })
                .catch(err => console.log(err));

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
        return category.map((data) => {
            const { name, id } = data;


            return (
                <tr className='text-center' key={id}>
                    <td className='text-center'>{name}</td>
                    <td className='text-center d-flex justify-content-center gap-3'>
                        <Link className='btn btn-outline-success' to={`/CategoryTable/Edit-Category/${id}`}>Edit</Link>
                        <button className='btn btn-outline-danger' onClick={() => deletecategory(id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (

        setcategory()
    )
}

export default Categorytabledata