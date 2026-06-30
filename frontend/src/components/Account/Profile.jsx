import { useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, requestPasswordCode, resetPasswordWithCode } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || user?.firstName || '',
    lastName: user?.last_name || user?.lastName || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({ code: '', new: '', confirm: '' });
  const [address, setAddress] = useState(user?.default_address || '');
  const [codeSent, setCodeSent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileSave = async () => {
    if (!profileData.firstName.trim() || !profileData.lastName.trim()) return;
    const success = await updateProfile({
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      address: address
    });
    if (success) {
      alert("Дані успішно збережено!");
    } else {
      alert("Помилка збереження даних");
    }
  };

  const handleRequestCode = async () => {
    const result = await requestPasswordCode();
    if (result.success) {
      alert("Код відправлено на вашу пошту!");
      setCodeSent(true);
    } else {
      alert(result.message || "Помилка відправки коду");
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.code || !passwordData.new || !passwordData.confirm) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      alert("Нові паролі не співпадають!");
      return;
    }

    const result = await resetPasswordWithCode({
      code: passwordData.code,
      new_password: passwordData.new
    });

    if (result.success) {
      alert("Пароль успішно змінено!");
      setPasswordData({ code: '', new: '', confirm: '' });
      setCodeSent(false);
    } else {
      let errorMsg = "Помилка зміни пароля";
      if (result.errors?.code) errorMsg = result.errors.code[0];
      else if (result.errors?.new_password) errorMsg = result.errors.new_password[0];
      else if (result.errors?.error) errorMsg = result.errors.error;
      alert(errorMsg);
    }
  };

  const inputStyle = "w-full border border-gray-300 px-5 py-3 rounded-full outline-none focus:border-[#0B0035] focus:ring-1 focus:ring-[#0B0035] transition-all";
  const btnStyle = "bg-[#0B0035] text-white px-8 py-3.5 rounded-md uppercase text-sm font-bold hover:bg-[#1a0a4a] transition-colors mt-2 w-full sm:w-auto";

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-12">

      <div>
        <h3 className="text-xl font-bold mb-6 uppercase text-[#0B0035]">Особисті дані</h3>
        <div className="space-y-5">
          <input type="text" placeholder="Ім'я" className={inputStyle}
            value={profileData.firstName}
            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
          />
          <input type="text" placeholder="Прізвище" className={inputStyle}
            value={profileData.lastName}
            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
          />
          <input type="email" placeholder="Email" className={inputStyle}
            value={profileData.email} disabled
          />
          <button type="button" onClick={handleProfileSave} className={btnStyle}>
            Зберегти дані
          </button>
        </div>

        <h3 className="text-xl font-bold mt-14 mb-6 uppercase text-[#0B0035]">Змінити пароль</h3>
        {!codeSent ? (
          <div>
            <p className="text-gray-600 mb-4 text-sm">
              Для зміни пароля ми надішлемо код підтвердження на вашу електронну адресу.
            </p>
            <button type="button" onClick={handleRequestCode} className={btnStyle}>
              Отримати код
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="relative">
              <input type="text" placeholder="Код підтвердження" className={inputStyle}
                value={passwordData.code}
                onChange={(e) => setPasswordData({ ...passwordData, code: e.target.value })}
              />
            </div>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} placeholder="Новий пароль" className={inputStyle}
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-5 top-3.5 text-[#0B0035] hover:opacity-70">
                {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} placeholder="Підтвердьте пароль" className={inputStyle}
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-5 top-3.5 text-[#0B0035] hover:opacity-70">
                {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <button type="button" onClick={handlePasswordUpdate} className={btnStyle}>
              Оновити пароль
            </button>
            <button type="button" onClick={() => setCodeSent(false)} className="block mt-4 text-sm text-[#0B0035] underline hover:no-underline">
              Скасувати
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6 uppercase text-[#0B0035]">Адреси</h3>
        <label className="block text-sm text-gray-600 mb-1 ml-2">Адреса доставки за замовчуванням *</label>
        <textarea rows="4" placeholder="м. Київ, вул. Хрещатик 1, кв. 10"
          className="w-full border border-gray-300 p-5 rounded-xl outline-none focus:border-[#0B0035] focus:ring-1 focus:ring-[#0B0035] transition-all resize-none"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="button" onClick={handleProfileSave} className={`${btnStyle} mt-4`}>
          Зберегти адресу
        </button>
      </div>
    </div>
  );
};

export default Profile;
