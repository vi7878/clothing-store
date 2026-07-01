
import { useNavigate } from 'react-router-dom';

const SummerBanner = () => {
  const navigate = useNavigate();

  const handleNavigate = (gender) => {
    navigate(`/shop/summer?gender=${gender}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="contrast-125 relative w-full h-[800px] bg-cover bg-center bg-no-repeat flex items-center justify-center "
          style={{ backgroundImage: `url("https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/banners/summer-bg")` }}>
          <div className="max-w-[1440px] mx-auto w-full px-5 grid grid-cols-12 gap-5 mt-80">
           <div className="col-span-12 flex flex-col items-center justify-center text-center">
             <h1 className="font-kalam italic text-white/90 text-[80px] md:text-[200px] drop-shadow-md tracking-wide leading-none mb-10">
               Summer 2026
             </h1>
              <div className="flex justify-start gap-6">
                <button
                  onClick={() => handleNavigate('women')}
                  className="bg-white/90 text-[#0B0035] font-bold text-[20px] py-4 px-12 border-2 border-[#B2412E] hover:bg-[#0B0035] hover:text-white transition-colors duration-300"
                > Для Неї
                </button>

                <button
                  onClick={() => handleNavigate('men')}
                  className="bg-white/90 text-[#0B0035] font-bold text-[20px] py-4 px-12 border-2 border-[#B2412E] hover:bg-[#0B0035] hover:text-white transition-colors duration-300"
                > Для Нього
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SummerBanner
