import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function Category() {
    const { id } = useParams();
    // console.log("params", id);
    
    const [category, setCategory] = useState([]);

    useEffect(()=> {
        axios.get(`http://localhost:3000/categories`).then(res => {
          const categories = res.data.filter(d => d.is_deleted !== 1)
          setCategory(categories) 
          console.log("res ===>", categories)
            
          })
    },[id]);

    const changehandle = (e) => {
      const {name,value} = e.target.value
      setCategory(() => {
        return{ [name]:value}
      })
    }

      const catagories = () => {
        const data = category.map((cat) => (
              <option key={cat.id} name='category' onChange={changehandle} value={cat.id} >{cat.name}</option>
        ))
        return data;
      }


  return (
    catagories()
  )
}

export default Category