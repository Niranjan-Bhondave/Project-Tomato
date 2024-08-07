// context/StoreContext.jsx
import React, { createContext, useEffect, useState } from "react";
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
    
  
  const addFoodItem = async(itemId) => {
    (!cartItem[itemId]) ? setCartItem((prev) => ({...prev,[itemId]:1})) : setCartItem((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    if(token)await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}});
    
  }

  const removeFoodItem = async(itemId) => {
    setCartItem((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    if(token)await axios.post(url + "/api/cart/remove", {itemId}, {headers: {token}});
  }

  return (
    <FoodContext.Provider value={{ token, setToken,url,getTotalCartAmount,foodItems,addFoodItem,removeFoodItem,cartItem,setCartItem }}>
      {children}
    </FoodContext.Provider>
  );
};
