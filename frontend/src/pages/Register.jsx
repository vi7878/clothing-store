import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Ім’я обов’язкове';
    if (!formData.email) newErrors.email = 'Електронна пошта обов’язкова';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Пароль має бути не менше 6 символів';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const success = await register({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      if (success) {
        navigate('/account');
      } else {
        setErrors({ email: 'Помилка реєстрації. Можливо, такий email вже існує.' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-32 min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">Реєстрація</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-2">Ім’я</label>
            <input
              type="text"
              className={`w-full border-2 p-3 outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-[#0B0035]'}`}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-2">Прізвище</label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 p-3 outline-none focus:border-[#0B0035] transition-colors"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase mb-2">Електронна пошта</label>
          <input
            type="email"
            className={`w-full border-2 p-3 outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#0B0035]'}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="relative">
          <label className="block text-xs font-bold uppercase mb-2">Пароль</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`w-full border-2 p-3 outline-none transition-colors ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#0B0035]'}`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-4 top-[38px] text-gray-400 hover:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <button type="submit" className="w-full bg-[#0B0035] text-white py-3.5 font-bold uppercase tracking-widest hover:bg-[#1a0a4a] transition-colors mt-4">
          Зареєструватись
        </button>
      </form>
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm mb-4">Вже маєте акаунт?</p>
        <Link to="/login" className="block w-full border-2 border-[#0B0035] text-[#0B0035] py-3.5 font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
          Увійти
        </Link>
      </div>
    </div>
  );
};

export default Register;
