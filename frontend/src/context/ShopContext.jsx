import { createContext, useState } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  
  const getCartCount = () => 0; 

  const contextValue = { 
    user, setUser, 
    showUserLogin, setShowUserLogin, 
    getCartCount 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;