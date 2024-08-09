import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [cartItem, setCartItem] = useState({});

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodItems(response.data.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItem(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodItems();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };
    loadData();
  }, []); // Added empty dependency array

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItem) {
      if (cartItem[itemId]) {
        const selectedItem = foodItems.find((food) => food._id === itemId);
        if (selectedItem) {
          total += selectedItem.price * cartItem[itemId];
        }
      }
    }
    return total;
  };

  const addFoodItem = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding food item to cart:", error);
        // Optional: Revert the cart change or notify the user
      }
    }
  };

  const removeFoodItem = async (itemId) => {
    setCartItem((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing food item from cart:", error);
        // Optional: Revert the cart change or notify the user
      }
    }
  };

  return (
    <FoodContext.Provider
      value={{
        token,
        setToken,
        url,
        getTotalCartAmount,
        foodItems,
        addFoodItem,
        removeFoodItem,
        cartItem,
        setCartItem,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
