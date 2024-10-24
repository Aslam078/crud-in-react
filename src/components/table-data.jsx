import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { toast,Bounce } from 'react-toastify';

function Userdata() {
    const [user,setUser] = useState([])
   

    useEffect(()=> {
      // console.log('test');
      
     const usersPromise =  axios.get("http://localhost:3000/users")
    const categoriesPromise =  axios.get("http://localhost:3000/categories")
      Promise.all([usersPromise,
        categoriesPromise]).then(([usersResponce,categoriesResponce])=>{
          // console.log();
          const data = [];
          usersResponce.data.forEach((user)=>{
          const categoryName= categoriesResponce.data.find((category)=> category.id == user.category )

          if (categoryName) {
            data.push({...user,category:categoryName.name})
          }else{
            data.push({...user})

          }
          })
          setUser(data)
        })
        
    },[]);


    const userdelete = async(id) => {
      await axios.delete(`http://localhost:3000/users/${id}`).then(res => console.log(res)).catch(err => console.log(err));
      const delet = user.filter(users => users.id !== id);
      setUser(delet)
        toast.error('user deleted', {
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
      
    

    const setuser = () => {
       const data = user.map((users,id) => (
        <tr key={id}>
      <td><img src={users.image} alt="userimage" className='rounded-circle' width={'50px'} height={'50px'} /></td>
      <td>{users.name}</td>
      <td>{users.email}</td>
      <td> {users.category} </td>
      <td> {users.option} </td>
      <td> {users.radio} </td>
      
        <td>
        <div className='d-flex gap-3'>
            <Link className='btn text-info' to={`/edit/${users.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
            <button className='btn text-danger' onClick={() => userdelete(users.id)}><i className="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
       ))
       return data
    }

  return (
    <>
    {setuser()}
    </>
  )
}

export default Userdata