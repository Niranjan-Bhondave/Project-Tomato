// context/StoreContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState(food_list);
  const [cartItem, setCartItem] = useState([]);
  const getTotalCartAmount = () =>{
      let total = 0;
      for(const item in cartItem){
        if(cartItem[item]){
          let selected_item = foodItems.find((food) => food._id === item);
          total += selected_item.price * cartItem[item];
        }
      }

      return total;
    }
    
  
  const addFoodItem = (_id) => {
    (!cartItem[_id]) ? setCartItem((prev) => ({...prev,[_id]:1})) : setCartItem((prev) => ({...prev,[_id]:cartItem[_id]+1}))
  }

  const removeFoodItem = (_id) => {
    setCartItem((prev) => ({...prev,[_id]:cartItem[_id]-1}))
  }

  return (
    <FoodContext.Provider value={{ getTotalCartAmount,foodItems,addFoodItem,removeFoodItem,cartItem,setCartItem }}>
      {children}
    </FoodContext.Provider>
  );
};
