import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast,Bounce } from 'react-toastify';

function TrashTable() {

    const[trash, setTrash] = useState([]);

    const fatchrestoredata = () => {
        axios.get('http://localhost:3000/categories').then(res => {
            const deletedData = res.data.filter(f => f.is_deleted == 1);
            console.log("deletedData",deletedData);
            setTrash(deletedData)

        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fatchrestoredata();
    },[])

    const restore = (id) => {
        const restoredata = {
            "is_deleted": 0
        }

        axios.patch(`http://localhost:3000/categories/${id}`,restoredata).then(res =>{
            fatchrestoredata();
            console.log("data restored ===>",res.data)            
        }).catch(err => console.log(err))

        toast.info('Category Restored', {
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

    const trashdata = () => {

        return trash.map((deleted) => {
            const{name,id} = deleted;
    
            return(
                <tr key={id} className="text-center">
                <td key={id}>{name}</td>
                <td><button className='btn btn-outline-light text-secondary' onClick={() => restore(id)}><i className="fa-solid fa-arrow-rotate-left"></i> Restore</button></td>
                </tr>
            )
        })
    }

    return (
        <div className='container'>
            <nav className='navbar bg-body-secendory px-5'>
                <a href="#" className='navbar-brand'><h1 className='text-danger'><i className="fa-solid fa-trash"></i> Trash</h1></a>

                <div className='d-flex gap-3'>
                    <Link to={"/CategoryTable"} className='btn btn-outline-warning'>Back</Link>
                </div>
            </nav>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    
                      {trashdata()}

                </tbody>
            </table>
        </div>
    )
}

export default TrashTable