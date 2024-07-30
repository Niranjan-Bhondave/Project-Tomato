import React, { useContext } from 'react'
import './placeOrder.css'
import { FoodContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(FoodContext)
  return (
    <form className='placeOrder'>
      <div className="placeOrderLeft">
        <p className="title">Delivery Information</p>
        <div className="multiFields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='email' />
        <input type="text" placeholder='Street' />

        <div className="multiFields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>

        <div className="multiFields">
          <input type="text" placeholder='zip code' />
          <input type="text" placeholder='country' />
        </div>
        <input type='text' placeholder='phone'/>
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
          <button>PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
