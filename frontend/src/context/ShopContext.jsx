/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { productsData } from '../data/products';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  //const [cartItems, setCartItems] = useState({});

  const currency = "UAH";
  const products = productsData;

  const getCartCount = () => 0;

  const addToCart = (itemId, size, color) => {
    console.log(`Додано в кошик -> ID: ${itemId}, Розмір: ${size}, Колір: ${color}`);
  };

  const contextValue = {
    user, setUser,
    showUserLogin,
    setShowUserLogin,
    getCartCount,
    products,
    currency,
    addToCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
