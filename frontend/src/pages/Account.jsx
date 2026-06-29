import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AccountLayout from '../components/Account/AccountLayout';
import Orders from '../components/Account/Orders';
import Profile from '../components/Account/Profile';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'orders';

  const setActiveTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };

  return (
    <AccountLayout activeTab={activeTab} setActiveTab={setActiveTab} user={user}>
      {activeTab === 'orders' ? <Orders /> : <Profile user={user} />}
    </AccountLayout>
  )
}

export default Account;
