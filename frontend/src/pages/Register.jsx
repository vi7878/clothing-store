import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); 

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "Це обов'язкове поле";
    if (!formData.lastName.trim()) newErrors.lastName = "Це обов'язкове поле";
    
    if (!formData.email.trim()) {
      newErrors.email = "Це обов'язкове поле";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Невірний формат електронної пошти";
    }

    if (!formData.password) {
      newErrors.password = "Це обов'язкове поле";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Пароль має містити мінімум 8 символів, малу літеру, а також цифру";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUser({ 
        firstName: formData.firstName, 
        email: formData.email 
      });
      navigate('/account'); 
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full min-h-[calc(100vh-160px)]">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-8">Ви зареєстровані?</h2>
         <Link to="/login" className="block w-full bg-[#0B0035] text-white py-3.5 font-semibold hover:bg-[#1a0a4a] transition-colors">
            Увійти
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-[#eef6fc]">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-8 text-center">Не маєте облікового запису?</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Електронна пошта *</label>
              <input 
                type="email" 
                className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-[#0B0035]'} p-3 rounded-full outline-none focus:ring-1 focus:ring-[#0B0035] transition-all`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Ім'я *</label>
              <input 
                type="text" 
                className={`w-full bg-white border ${errors.firstName ? 'border-red-500' : 'border-[#0B0035]'} p-3 rounded-full outline-none focus:ring-1 focus:ring-[#0B0035] transition-all`}
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-4">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Прізвище *</label>
              <input 
                type="text" 
                className={`w-full bg-white border ${errors.lastName ? 'border-red-500' : 'border-[#0B0035]'} p-3 rounded-full outline-none focus:ring-1 focus:ring-[#0B0035] transition-all`}
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-4">{errors.lastName}</p>}
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Пароль *</label>
              <input 
                type={showPassword ? "text" : "password"} 
                className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-[#0B0035]'} p-3 rounded-full outline-none focus:ring-1 focus:ring-[#0B0035] transition-all pr-12`}
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

            <button type="submit" className="w-full border-2 border-[#0B0035] bg-white text-[#0B0035] py-3.5 font-semibold mt-6 hover:bg-gray-50 transition-colors">
              Зареєструватись
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;