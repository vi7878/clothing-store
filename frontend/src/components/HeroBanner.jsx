import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/banners/hero-new-bg.jpg';

const HeroBanner = () => {
 const navigate = useNavigate();

 const handleNavigate = (gender) => {
    navigate(`/shop/new?gender=${gender}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="contrast-125 relative w-full h-[400px] md:h-[800px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="max-w-[1440px] mx-auto w-full px-5 grid grid-cols-12 gap-5 -mt-6 md:-mt-32">
        <div className="col-span-12 md:col-span-5 md:col-start-2 ">
          <h1 className="bg-white/30 backdrop-contrast-100 text-[60px] sm:text-[80px] md:text-[120px] font-bold text-black mb-10 tracking-wide w-fit px-5 py-1 [-webkit-text-stroke:2px_white] animate-[fadeInUp_0.7s_ease_both]">
            Новинки
          </h1>
          <div className="flex justify-start gap-6 animate-[fadeInUp_0.9s_ease_both]">
            <button
              onClick={() => handleNavigate('women')}
              className="bg-white/90 text-[#0B0035] font-bold text-[14px] md:text-[20px] py-3 px-6 md:py-4 md:px-12 border-2 border-[#B2412E] hover:bg-[#0B0035] hover:text-white transition-colors duration-300 active:scale-95"
            > Для Неї
            </button>

            <button
              onClick={() => handleNavigate('men')}
              className="bg-white/90 text-[#0B0035] font-bold text-[14px] md:text-[20px] py-3 px-6 md:py-4 md:px-12 border-2 border-[#B2412E] hover:bg-[#0B0035] hover:text-white transition-colors duration-300 active:scale-95"
            >
              Для Нього
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
