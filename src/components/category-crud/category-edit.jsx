import React, { useEffect, useState } from 'react'
import CatFormNav from './element/cat-formnav'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CategoryEdit() {
    const { id } = useParams();
    console.log('params ===>',id);
    
    const [editcategory, setEditCategory] = useState([]);
    const navigate = useNavigate()

    const onhandlechange = (e) => {
        const {name,value} = e.target
        setEditCategory(prev => ({
            ...prev,[name]:value
        }))
    }

    useEffect(() =>{
        axios.patch(`http://localhost:3000/categories/${id}`)
    .then(res => {setEditCategory(res.data)
         console.log("edit data", res.data)})
    .catch(err => console.log("edit error",err));
    },[])

    const dataedit = async() => {
       await axios.patch(`http://localhost:3000/categories/${id}`,editcategory);
       console.log("data edited");
    }

    const handlesubmit = () => {
        dataedit();
        navigate('/CategoryTable')
        toast.success("Category Edit successfully");
    }

  return (
    <div className='container'>
      <nav className='navbar bg-body-secendory px-5'>
            <a href="#" className='navbar-brand'><h1>Edit Category</h1></a> 
       
            <Link  to={"/CategoryTable"} className='btn btn-danger'>Home Page</Link>
     </nav>
      <div className='d-flex justify-content-center  align-items-center'>
        <form onSubmit={handlesubmit} className='d-flex flex-column mt-5'>
          <div className="mb-3 d-flex gap-3">
            <label >Category:</label>
            <input type="text" name='name'  value={editcategory.name} onChange={onhandlechange} className="form-control" required />
          </div>
          

          <button className='btn btn-info' type='submit'>Submit</button>
        </form>
      </div>
    </div >
  )
}

export default CategoryEdit