
import { useNavigate } from 'react-router-dom';
import saleBg from '../assets/banners/sale-bg.jpg';

const SaleBanner = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate('/shop/sale');
    window.scrollTo(0, 0);
  };

  const handleButtonClick = (gender, e) => {
    e.stopPropagation();
    navigate(`/shop/sale?gender=${gender}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleBannerClick}
      className="relative w-full h-[400px] md:h-[450px] bg-cover bg-center flex items-center justify-center cursor-pointer group"
      style={{ backgroundImage: `url(${saleBg})` }}
    >
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-5 flex flex-col md:flex-row items-center justify-center md:gap-16">

        <h2 className="text-white font-black text-[70px] sm:text-[100px] md:text-[150px] leading-none tracking-tighter">
          10%-20%
        </h2>

        <div className="flex flex-col items-center md:items-start text-white max-w-[400px] text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">Offer Of The Month</h3>
          <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed">
            Оновіть свій гардероб вигідно. Тільки цього місяця діє спеціальна знижка від 10% до 20% на обрані моделі для неї та для нього.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mt-2">
            <button
              onClick={(e) => handleButtonClick('women', e)}
              className="bg-white/90 text-[#0B0035] font-bold text-[14px] md:text-[20px] py-3 px-6 md:py-4 md:px-12 border-2 border-[#B2412E] hover:bg-[#0B0035] hover:text-white transition-colors duration-300 active:scale-95 whitespace-nowrap"
            > Для Неї
            </button>

            <button
              onClick={(e) => handleButtonClick('men', e)}
              className="bg-white/90 text-[#0B0035] font-bold text-[14px] md:text-[20px] py-3 px-6 md:py-4 md:px-12 border-2 border-[#B2412E] hover:bg-[#0B0035] hover:text-white transition-colors duration-300 active:scale-95 whitespace-nowrap"
            > Для Нього
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SaleBanner
