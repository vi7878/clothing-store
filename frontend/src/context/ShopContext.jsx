/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';
import { productsData } from '../data/products';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || `${window.location.origin}/api`;
        const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const response = await fetch(`${apiUrl}/products/`);
        if (response.ok) {
          const data = await response.json();
          const items = Array.isArray(data) ? data : (data.results || []);

          const mergedItems = items.map(apiProduct => {
            const mockProduct = productsData.find(p => p.sku === apiProduct.sku || p.id === apiProduct.id);
            if (!mockProduct) return apiProduct;

            return {
              ...apiProduct,
              rating: (apiProduct.average_rating > 0) ? apiProduct.average_rating : (apiProduct.rating || mockProduct.rating || 0),
              sku: apiProduct.sku || mockProduct.sku || mockProduct.article,
              has_discount: apiProduct.has_discount || mockProduct.has_discount || mockProduct.discount || false,
              discount_percent: apiProduct.discount_percent || mockProduct.discount_percent || 0,
              collections: apiProduct.collections || mockProduct.collections || (apiProduct.tags ? apiProduct.tags.map(t => typeof t === 'object' ? t.name : t) : []),
              images: apiProduct.images?.length > 0 ? apiProduct.images : (mockProduct.images || []),
            };
          });

          setProducts(mergedItems);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [cartUserEmail, setCartUserEmail] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      const savedCart = localStorage.getItem(`wearhouse_cart_${user.email}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      setCartUserEmail(user.email);
    } else {
      setCartItems([]);
      setCartUserEmail(null);
    }
  }, [user]);

  useEffect(() => {
    if (cartUserEmail && cartUserEmail === user?.email) {
      localStorage.setItem(`wearhouse_cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, cartUserEmail, user]);

  const [wishlistItems, setWishlistItems] = useState([]);

  const [wishlistUserEmail, setWishlistUserEmail] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      const savedWishlist = localStorage.getItem(`wearhouse_wishlist_${user.email}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
      setWishlistUserEmail(user.email);
    } else {
      setWishlistItems([]);
      setWishlistUserEmail(null);
    }
  }, [user]);

  useEffect(() => {
    if (wishlistUserEmail && wishlistUserEmail === user?.email) {
      localStorage.setItem(`wearhouse_wishlist_${user.email}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, wishlistUserEmail, user]);



  const toggleWishlist = (productId) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const addToCart = (productId, size, color) => {
    const product = products.find(p => p.id === productId);
    const variant = product?.variants?.find(v => v.size === size && v.color_hex === color);
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

    const product = products.find(p => p.id === productId);
    const variant = product?.variants?.find(v => v.size === size && v.color_hex === color);
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
      const product = products.find((p) => p.id === cartItem.id);
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
    cartItems,
    getCartCount,
    getCartTotal,
    products,
    loading,
    currency: 'UAH',
    updateQuantity,
    removeFromCart,
    isCartModalOpen,
    setIsCartModalOpen,
    addToCart,
    wishlistItems,
    toggleWishlist,
    setCartItems,
    getWishlistCount
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
