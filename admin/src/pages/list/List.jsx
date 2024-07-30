import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './list.css';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);
  const url = "http://localhost:4000";

  const fetchList = async () =>
    {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      console.log(response.data);
      setList(response.data.data);
    }

    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() =>{
    fetchList();
  },[]);

  const removeFood = async (_id) =>{
      const response = await axios.post(`${url}/api/food/remove`, {_id: _id});
      fetchList();
      if(response.data.success){
        toast.success(response.data.message);
        
      }

      else{
        toast.error(response.data.message);
      }
  }
  return (
    <div className='list add flexCol'>
      <p>All foods list</p>
      <div className="listTable">
        <div className="listTableFormat title">
          <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key = {index} className='listTableFormat'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() =>removeFood(item._id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
