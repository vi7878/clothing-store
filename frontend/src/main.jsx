import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> {/* <--- Обгорни ShopContextProvider та App */}
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthProvider>
  </BrowserRouter>,
)
