import React, {useContext, useState} from 'react'
import './foodDisplay.css'
import  FoodItem  from '../foodItem/FoodItem.jsx';
import { FoodContext } from '../../context/StoreContext.jsx';

const FoodDisplay = ({category}) => {
  const [itemCount,setItemCount] = useState(0);
  const {foodItems,addFoodItem,removeFoodItem,cartItem,setCartItem} = useContext(FoodContext);
  return (
    <div className='foodDisplay' id='foodDisplay'>
        <h2>Top dishes near you</h2>
       <div className="foodDisplayList">
          {
            foodItems.map((item,index) => {
              if(category === 'All' || item.category === category)return <FoodItem id = {item._id} name = {item.name} description={item.description} price={item.price} image={item.image} />
            })
          }
        </div>  
      
    </div>
  )
}

export default FoodDisplay
