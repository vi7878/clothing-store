import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { ShopContext } from './context/ShopContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Sale from './pages/Sale';
import Summer from './pages/Summer';
import Women from './pages/Women';
import Men from './pages/Men';
import New from './pages/New';
import Footer from './components/Footer';

const App = () => {
  const { showUserLogin } = useContext(ShopContext);

  return (
    <main>
      <Header />
      <Toaster position='bottom-right'/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/wishlist' element={<Wishlist/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/shop/sale' element={<Sale/>} />
          <Route path='/shop/summer' element={<Summer/>} />
          <Route path='/shop/women' element={<Women/>} />
          <Route path='/shop/men' element={<Men/>} />
          <Route path='/shop/new' element={<New/>} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
