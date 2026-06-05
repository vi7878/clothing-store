import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Електронна пошта обов’язкова';
    if (!formData.password) newErrors.password = 'Пароль обов’язковий';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Mock login for now
      setUser({ firstName: "Тест", lastName: "Користувач", email: formData.email });
      navigate('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-32 min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">Вхід</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase mb-2">Електронна пошта</label>
          <input
            type="email"
            className={`w-full border-2 p-3 outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#0B0035]'}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-[#0B0035] text-white py-3.5 font-bold uppercase tracking-widest hover:bg-[#1a0a4a] transition-colors mt-4">
          Увійти
        </button>
      </form>
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm mb-4">Ще не маєте акаунту?</p>
        <Link to="/register" className="block w-full border-2 border-[#0B0035] text-[#0B0035] py-3.5 font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
          Зареєструватись
        </Link>
      </div>
    </div>
  );
};

export default Login;
