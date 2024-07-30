import React, { useState, useEffect } from 'react'
import {assets}from '../../assets/assets'
import './add.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const url = 'http://localhost:4000';
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onSubmitHandler = async (e) =>{
    console.log(data);
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    const response = await axios.post(`${url}/api/food/add`, formData)
    .then((res) => {
          setData(
          {
            name: "",
            description: "",
            price: "",
            category: "Salad"
          });
      setImage(false);
      toast.success(res.data.message);
    }
    ).catch((err) => toast.error(res.data.message));
  }

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value}) 
  }
  
  return (
    <div className='add'>
      <form className='flexCol' onSubmit={onSubmitHandler}>
        
        <div className='addImgUpload flexCol'>
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>

        <div className="addProductName flexCol">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here' id="" />
        </div>

        <div className="addProductDescription flexCol">
            <p>Product Description</p>
            <textarea name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder='Write content here'></textarea>
        </div>

        <div className="addCategoryPrice">
            <div className="addCategory flexCol">
                <p>Product Category</p>
                <select onChange={onChangeHandler} value={data.category} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Deserts">Dessert</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>

            <div className="addPrice flexCol">
                <p>Product Price</p>
                <input type="number" name="price" placeholder='$20' onChange={onChangeHandler} value={data.price} />
            </div>
        </div>
        <button type='submit' className='addButton'>ADD</button>
      </form>
    </div>
  )
}

export default Add
