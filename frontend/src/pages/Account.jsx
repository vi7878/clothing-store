import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AccountLayout from '../components/Account/AccountLayout';
import Profile from '../components/Account/Profile';
import Orders from '../components/Account/Orders';

const Account = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <AccountLayout activeTab={activeTab} setActiveTab={setActiveTab} user={user}>
      {activeTab === 'profile' && <Profile user={user} />}
      {activeTab === 'orders' && <Orders />}
    </AccountLayout>
  );
};

export default Account;
