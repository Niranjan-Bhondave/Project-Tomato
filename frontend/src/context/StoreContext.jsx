// context/StoreContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets';
import axios from "axios";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  
  const fetchFoodItems = async() =>{
    const response = await axios.get(url + "/api/food/list");
    setFoodItems(response.data.data);
  }

  useEffect(() => {
    async function loadData(){
      await fetchFoodItems();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);



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
    <FoodContext.Provider value={{ token, setToken,url,getTotalCartAmount,foodItems,addFoodItem,removeFoodItem,cartItem,setCartItem }}>
      {children}
    </FoodContext.Provider>
  );
};
