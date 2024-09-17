import React, { useContext, useEffect, useState } from 'react'
import './placeOrder.css'
import { FoodContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const PlaceOrder = () => {
  const {getTotalCartAmount, token, foodItems, cartItem,url} = useContext(FoodContext)
  const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone:""
  })
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setData(data => ({...data, [name]: value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();

    let orderItems = [];
    foodItems.map((item) =>{
      if(cartItem[item._id]){
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let order_data = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    let response =  await axios.post(url + "/api/order/place", order_data, {headers: {token}});
    if(response.data.success){
      const {sessionUrl} = response.data;
      window.location.replace(sessionUrl);
    } else {
      alert("Order failed. Please try again");
  }
}
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token)navigate('/')
    else if(getTotalCartAmount === 0)navigate('/cart')
  })

  return (
    <form className='placeOrder' onSubmit={placeOrder}>
      <div className="placeOrderLeft">
        <p className="title">Delivery Information</p>
        <div className="multiFields">
          <input  required name = 'firstName' onChange={handleChange} value = {data.firstName} type="text" placeholder='First Name' />
          <input required name = 'lastName' onChange={handleChange} value = {data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name = 'email' onChange={handleChange} value = {data.email} type="email" placeholder='email' />
        <input required name = 'street' onChange={handleChange} value = {data.street}type="text" placeholder='Street' />

        <div className="multiFields">
          <input required name = 'city' onChange={handleChange} value = {data.city} type="text" placeholder='City' />
          <input required name = 'state' onChange={handleChange} value = {data.state} type="text" placeholder='State' />
        </div>

        <div className="multiFields">
          <input required name = 'zipcode' onChange={handleChange} value = {data.zipcode} type="text" placeholder='zip code' />
          <input required name = 'country' onChange={handleChange} value = {data.country} type="text" placeholder='country' />
        </div>
        <input required name = 'phone' onChange={handleChange} value = {data.phone} type='text' placeholder='phone'/>
        </div>

       
      <div className="placeOrderRight">
      <div className="cartTotal">
          <h2>Cart total</h2>
          <div>
            <div className="cartTotalDetails">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
