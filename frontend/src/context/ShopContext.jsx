/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { productsData } from '../data/products';
import toast from 'react-hot-toast';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const addToCart = (productId, size, color) => {
    const product = productsData.find(p => p.id === productId);
    const variant = product?.variants.find(v => v.size === size && v.color_hex === color);
    const maxStock = variant ? variant.stock_quantity : 0;

    let addedSuccessfully = false;

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === productId && item.size === size && item.color === color
      );

      const currentQty = existingItemIndex >= 0 ? prev[existingItemIndex].quantity : 0;

      if (currentQty >= maxStock) {
        toast.error(`Вибачте, в наявності лише ${maxStock} шт. такого розміру та кольору`);
        return prev;
      }

      addedSuccessfully = true;

      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }
      return [...prev, { id: productId, size, color, quantity: 1 }];
    });

    if (addedSuccessfully) {
      setIsCartModalOpen(true);
    }
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;

    const product = productsData.find(p => p.id === productId);
    const variant = product?.variants.find(v => v.size === size && v.color_hex === color);
    const maxStock = variant ? variant.stock_quantity : 0;

    if (newQuantity > maxStock) {
      toast.error(`Максимальна кількість на складі цього товару: ${maxStock} шт.`);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = productsData.find((p) => p.id === cartItem.id);
      if (product) {
        const finalPrice = product.has_discount
          ? Math.round(product.base_price * (1 - product.discount_percent / 100))
          : product.base_price;
        return total + finalPrice * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const contextValue = {
    user, setUser,
    showUserLogin, setShowUserLogin,
    cartItems,
    getCartCount,
    getCartTotal,
    products: productsData,
    currency: 'UAH',
    updateQuantity,
    removeFromCart,
    isCartModalOpen,
    setIsCartModalOpen,
    addToCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
