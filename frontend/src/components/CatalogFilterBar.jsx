import { FiChevronDown } from 'react-icons/fi';
const CatalogFilterBar = ({ scrollDirection, isSalesActive, setIsSalesActive }) => {
  return (
    <div className={`sticky z-40 bg-white top-[150px] transition-transform duration-300 ease-in-out pt-4 pb-5 border-b border-gray-300 mb-8 flex flex-nowrap items-center gap-4 overflow-x-auto ${
        scrollDirection === 'down' ? '-translate-y-[150px]' : 'translate-y-0' 
      }`}>
       {['Сортувати за', 'Розміри', 'Кольори', 'Ціна'].map(filter => (
          <button 
            key={filter} 
            className="border border-black bg-[#E6F1F9] px-4 py-1.5 flex items-center justify-between gap-4 min-w-[150px] flex-shrink-0 whitespace-nowrap text-[15px] text-black font-medium hover:bg-[#d8e0eb] transition-colors"
          >
            {filter} <FiChevronDown className="text-lg" />
          </button>
       ))}
       
       <div 
         className="flex items-center gap-2 ml-auto cursor-pointer group flex-shrink-0 pl-4"
         onClick={() => setIsSalesActive(!isSalesActive)}>
          <span className="font-bold text-[17px] text-black">Sales</span>
          <div className="w-5 h-5 rounded-full border-[2.5px] border-black flex items-center justify-center transition-all bg-[#eef2f6]">
             <div className={`w-2.5 h-2.5 bg-black rounded-full transition-opacity ${isSalesActive ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
       </div>
    </div>
  )
}

export default CatalogFilterBar