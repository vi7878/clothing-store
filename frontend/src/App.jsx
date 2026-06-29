import { Toaster } from 'react-hot-toast';
import { Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import SearchPage from './pages/SearchPage';
import Cart from './pages/Cart';
import CartModal from './components/CartModal';
import Sale from './pages/Sale';
import Summer from './pages/Summer';
import Women from './pages/Women';
import Men from './pages/Men';
import New from './pages/New';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderSuccess from './pages/OrderSuccess';
import Checkout from './pages/Checkout';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';
  return (
    <main>
      <ScrollToTop />
      <Header />
      <Toaster position='bottom-right'/>
      <CartModal />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/wishlist' element={<Wishlist/>} />
          <Route path='/account' element={<Account/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/shop/sale' element={<Sale/>} />
          <Route path='/shop/summer' element={<Summer/>} />
          <Route path='/shop/women' element={<Women/>} />
          <Route path='/shop/men' element={<Men/>} />
          <Route path='/shop/new' element={<New/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {!hideFooter && <Footer />}
    </main>
  );
}

export default App;
