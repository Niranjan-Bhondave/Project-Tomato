import React, { useContext } from 'react';
import './foodItem.css';
import assets from '../../assets/assets';
import { FoodContext } from '../../context/StoreContext.jsx';

const FoodItem = ({ itemId, name, price, description, image }) => {
  const { addFoodItem, removeFoodItem, cartItem, url } = useContext(FoodContext);  

  return (
    <div className='foodItem'>
      <div className="foodItemImageContainer">
        <img className="foodItemImage" src={url + "/images/" + image} alt={name} />
        {
          (!cartItem[itemId]) ? 
          <img className="add" onClick={() => addFoodItem(itemId)} src={assets.add_icon_white} alt="Add to cart" /> : 
          <div className="foodItemCounter">
            <img onClick={() => removeFoodItem(itemId)} src={assets.remove_icon_red} alt="Remove from cart" />
            <p>{cartItem[itemId]}</p>
            <img onClick={() => addFoodItem(itemId)} src={assets.add_icon_green} alt="Add more to cart" />
          </div>
        }
      </div>

      <div className="foodItemInfo">
        <div className="foodItemNameRating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className='foodItemDescription'>{description}</p>
        <p className="foodItemPrice">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
