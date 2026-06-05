import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AccountLayout = ({ activeTab, setActiveTab, children, user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 min-h-[60vh]">
      <aside className="w-full md:w-1/4">
        <h2 className="text-2xl font-bold mb-6">{user ? user.firstName : 'Гість'}</h2>
        <nav className="flex flex-col space-y-4 border-b border-gray-200 pb-6 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 text-lg text-left transition-colors ${activeTab === 'orders' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Мої замовлення
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 text-lg text-left transition-colors ${activeTab === 'profile' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Мої дані та адреси
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-lg text-gray-500 hover:text-red-600 transition-colors text-left"
        >
          Вийти
        </button>
      </aside>

      <section className="w-full md:w-3/4">
        {children}
      </section>
    </div>
  )
}

export default AccountLayout