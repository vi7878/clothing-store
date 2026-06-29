import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Ім’я обов’язкове';
    if (!formData.email) newErrors.email = 'Електронна пошта обов’язкова';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Пароль має бути не менше 6 символів';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
      navigate('/account');
    }
  };
  
  const inputStyle = "w-full border px-5 py-3 rounded-full outline-none transition-all";
  const normalInput = `${inputStyle} border-gray-300 focus:border-[#0B0035] focus:ring-1 focus:ring-[#0B0035]`;
  const errorInput = `${inputStyle} border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500`;

  return (
    <div className="max-w-md mx-auto px-4 pt-10 pb-20">
      <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">Реєстрація</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-2 ml-2">Ім’я</label>
            <input
              type="text"
              className={errors.firstName ? errorInput : normalInput}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-2 ml-2">Прізвище</label>
            <input
              type="text"
              className={normalInput}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase mb-2 ml-2">Електронна пошта</label>
          <input
            type="email"
            className={errors.email ? errorInput : normalInput}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-2 ml-2">Пароль</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={errors.password ? errorInput : normalInput}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-5 top-3.5 text-[#0B0035] hover:opacity-70 transition-opacity"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full bg-[#0B0035] text-white py-3.5 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-[#1a0a4a] transition-colors mt-6">
          Зареєструватись
        </button>
      </form>
      
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm mb-4">Вже маєте акаунт?</p>
        <Link to="/login" className="block w-full border-2 border-[#0B0035] text-[#0B0035] py-3.5 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-gray-50 transition-colors">
          Увійти
        </Link>
      </div>
    </div>
  );
};

export default Register;