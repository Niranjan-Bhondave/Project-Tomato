import React, { useContext } from 'react'
import './foodItem.css'
import assets from '../../assets/assets'
import { FoodContext } from '../../context/StoreContext.jsx';
const FoodItem = ({id,name,price,description,image}) => {
  
  const {foodItems,addFoodItem,removeFoodItem,cartItem,setCartItem,url} = useContext(FoodContext);  
  return (
    <div className='foodItem'>
      <div className="foodItemImageContainer">
        <img className="foodItemImage" src={url + "/images/" + image} alt="" />
        {
          !cartItem[id] ? 
          <img className = "add" onClick={() => addFoodItem(id)} src={assets.add_icon_white} alt="" /> : 
          <div className="foodItemCounter">
            <img onClick={() => removeFoodItem(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={() => addFoodItem(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>

      <div className="foodItemInfo">
        <div className="foodItemNameRating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='foodItemDescription'>{description}</p>
        <p className="foodItemPrice">${price}</p>
        
      </div>

    </div>
  )
}

export default FoodItem