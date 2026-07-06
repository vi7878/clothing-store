import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import AccountLayout from '../components/Account/AccountLayout';
import Profile from '../components/Account/Profile';
import Orders from '../components/Account/Orders';

const Account = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'orders';

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <AccountLayout user={user}>
      {activeTab === 'orders' ? <Orders /> : <Profile user={user} />}
    </AccountLayout>
  );
};

export default Account;
