import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate(); 
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Це обов'язкове поле";
    if (!formData.password) newErrors.password = "Це обов'язкове поле";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Спроба входу:', formData);
      //ВИПРАВИТИ: Тут має бути реальна логіка аутентифікації через бекенд. Поки що просто імітуємо успішний вхід.
      // Успішний вхід (поки немає бекенду)
      setUser({ firstName: "Тест", email: formData.email });
      navigate('/account');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-160px)]">
      
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-8 text-center">Ви зареєстровані?</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Електронна пошта *
              </label>
              <input 
                type="email" 
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#0B0035]'} p-3 rounded-full outline-none focus:ring-1 focus:ring-[#0B0035] transition-all`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>}
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Пароль *
              </label>
              <input 
                type={showPassword ? "text" : "password"} 
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-[#0B0035]'} p-3 rounded-full outline-none focus:ring-1 focus:ring-[#0B0035] transition-all pr-12`}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-[#0B0035] hover:opacity-70 transition-opacity focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
              
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-4">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full bg-[#0B0035] text-white py-3.5 font-semibold mt-2 hover:bg-[#1a0a4a] transition-colors">
              Увійти
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-[#eef6fc]">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-6">Не маєте облікового запису?</h2>
          <Link to="/register" className="block w-full border-2 border-[#0B0035] bg-white text-[#0B0035] py-3.5 font-semibold hover:bg-gray-50 transition-colors">
            Зареєструватись
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;