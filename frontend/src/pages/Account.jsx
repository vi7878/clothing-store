import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AccountLayout from '../components/Account/AccountLayout';
import Orders from '../components/Account/Orders';
import Profile from '../components/Account/Profile';

const Account = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { user } = useContext(AuthContext);

  return (
    <AccountLayout activeTab={activeTab} setActiveTab={setActiveTab} user={user}>
      {activeTab === 'orders' ? <Orders /> : <Profile user={user} />}
    </AccountLayout>
  )
}

export default Account;
