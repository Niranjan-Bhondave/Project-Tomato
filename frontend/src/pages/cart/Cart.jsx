import React, {useContext} from 'react'
import { FoodContext } from '../../context/StoreContext'
import './cart.css'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { getTotalCartAmount,foodItems,addFoodItem,removeFoodItem,cartItem,setCartItem } = useContext(FoodContext)
  return (
    <div className='cart'>
      <div className="cartItems">
        <div className="cartItemsTitle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {foodItems.map((item,index) => {
          if(cartItem[item._id] > 0)
            {
            return(
              <div>
              <div className="cartItemsTitle cartItemsItem">
                <img src={item.image} alt="" srcset="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>{  item.price  * cartItem[item._id] }</p>
                <p onClick = { () => removeFoodItem(item._id)}className='cross'>x</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      
      </div>
      <div className="cartBottom">
        <div className="cartTotal">
          <h2>Cart total</h2>
          <div>
            <div className="cartTotalDetails">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Total</b>
              <b>{getTotalCartAmount() ? getTotalCartAmount() + 2 : 0}</b>
            </div>
          </div>
          <Link to = '/PlaceOrder'><button>PROCEED TO CHECKOUT</button></Link>
        </div>
        <div className="cartPromoCode">
            <div>
              <p>Enter promocode</p>
              <div className="promoCodeInput">
                <input type="text" placeholder='promocode' />
                <button>SUBMIT</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Cart
