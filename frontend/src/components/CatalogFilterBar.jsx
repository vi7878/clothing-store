import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const sortOptions = [
  { id: 'popular', label: 'Від популярного' },
  { id: 'newest', label: 'Від найновішого' },
  { id: 'price-asc', label: 'Від найдешевшого' },
  { id: 'price-desc', label: 'Від найдорожчого' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colorOptions = [
  { id: 'Black', label: 'чорний', hex: '#000000' },
  { id: 'White', label: 'білий', hex: '#FFFFFF', border: true },
  { id: 'Gray', label: 'сірий', hex: '#808080' },
  { id: 'Navy', label: 'темно-синій', hex: '#1E3A8A' },
  { id: 'Beige', label: 'бежевий', hex: '#F5F5DC', border: true },
  { id: 'Brown', label: 'коричневий', hex: '#8B4513' },
  { id: 'Olive', label: 'оливковий', hex: '#4B5320' },
  { id: 'Red', label: 'червоний', hex: '#DC2626' },
  { id: 'Burgundy', label: 'бордо', hex: '#722F37' },
  { id: 'Pink', label: 'рожевий', hex: '#FFC0CB' },
  { id: 'Light Blue', label: 'блакитний', hex: '#ADD8E6' },
  { id: 'Mustard', label: 'гірчичний', hex: '#EAB308' },
];

const CatalogFilterBar = ({ 
  scrollDirection, 
  isSalesActive, setIsSalesActive,
  sort, setSort,
  size, setSize,
  color, setColor,
  priceMin, setPriceMin,
  priceMax, setPriceMax,
  availableMinPrice,
  availableMaxPrice
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const barRef = useRef(null);

  const [tempSort, setTempSort] = useState(sort);
  const [tempSize, setTempSize] = useState(size || []);
  const [tempColor, setTempColor] = useState(color || []);
  const [tempPriceMin, setTempPriceMin] = useState(priceMin);
  const [tempPriceMax, setTempPriceMax] = useState(priceMax);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setTempSort(sort);
      setTempSize(size || []);
      setTempColor(color || []);
      setTempPriceMin(priceMin);
      setTempPriceMax(priceMax);
      
      setOpenDropdown(dropdownName);
    }
  };
  
  const applySort = () => { setSort(tempSort); setOpenDropdown(null); };
  
  const toggleSize = (s) => setTempSize(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]);
  const applySize = () => { setSize(tempSize); setOpenDropdown(null); };
  const clearSize = () => { setSize([]); setOpenDropdown(null); };

  const toggleColor = (c) => setTempColor(prev => prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c]);
  const applyColor = () => { setColor(tempColor); setOpenDropdown(null); };
  const clearColor = () => { setColor([]); setOpenDropdown(null); };

  //VALIDATION LOGIC
  const handlePriceInput = (setter) => (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setter(val);
  };

  const handlePriceBlur = (type) => {
    const minAllowed = availableMinPrice || 0;
    const maxAllowed = availableMaxPrice || 20;

    if (type === 'min' && tempPriceMin !== '') {
      let val = Number(tempPriceMin);
      if (val < minAllowed) val = minAllowed;
      if (tempPriceMax !== '' && val > Number(tempPriceMax)) val = Number(tempPriceMax);
      setTempPriceMin(val.toString());
    }
    
    if (type === 'max' && tempPriceMax !== '') {
      let val = Number(tempPriceMax);
      if (val > maxAllowed) val = maxAllowed;
      if (tempPriceMin !== '' && val < Number(tempPriceMin)) val = Number(tempPriceMin);
      setTempPriceMax(val.toString());
    }
  };

  const applyPrice = () => {
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setOpenDropdown(null);
  };
  
  const clearPrice = () => {
    setPriceMin('');
    setPriceMax('');
    setOpenDropdown(null);
  };

  const btnStyle = "border border-black bg-[#E6F1F9] px-4 py-1.5 flex items-center justify-between gap-4 min-w-[170px] flex-grow md:flex-grow-0 whitespace-nowrap text-[15px] text-black font-medium hover:bg-[#d8e0eb] transition-colors relative";
  const popupStyle = "absolute top-[calc(100%+8px)] left-0 bg-white border border-gray-300 shadow-2xl p-4 min-w-[280px] max-h-[450px] overflow-y-auto";
  const okBtnStyle = "w-full bg-[#0B0035] hover:opacity-90 text-white font-medium py-2.5 mt-5 transition-opacity";
  const clearBtnStyle = "text-sm text-black underline text-center block mt-3 cursor-pointer hover:text-gray-600";
  const checkboxStyle = "w-5 h-5 flex-shrink-0 border border-black flex items-center justify-center bg-white cursor-pointer";

  const getActiveSortLabel = () => sortOptions.find(o => o.id === sort)?.label || 'Сортувати за';
  const getActiveSizeLabel = () => size?.length > 0 ? (size.length === 1 ? `Розмір: ${size[0]}` : `Розмірів: ${size.length}`) : 'Розміри';
  const getActiveColorLabel = () => color?.length > 0 ? (color.length === 1 ? 'Колір: 1' : `Кольорів: ${color.length}`) : 'Кольори';

  return (
    <div 
      ref={barRef}
      style={{ overflow: 'visible', zIndex: 20 }} 
      className={`sticky bg-white top-[150px] transition-transform duration-300 ease-in-out pt-4 pb-5 border-b border-gray-300 mb-8 flex flex-wrap items-center gap-4 ${
        scrollDirection === 'down' && !openDropdown ? '-translate-y-[150px]' : 'translate-y-0' 
      }`}
    >
      
      {/* SORTING */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button onClick={() => toggleDropdown('sort')} className={btnStyle}>
          {getActiveSortLabel()} <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'sort' && (
          <div className={popupStyle} style={{ zIndex: 20 }}>
            <div className="flex flex-col gap-3">
              {sortOptions.map((opt) => (
                <div key={opt.id} onClick={() => setTempSort(opt.id)} className="flex items-center gap-3 cursor-pointer group">
                  <div className={checkboxStyle}>
                    {tempSort === opt.id && <div className="w-3 h-3 bg-[#0B0035]"></div>}
                  </div>
                  <span className="text-[15px] group-hover:text-gray-600 transition-colors">{opt.label}</span>
                </div>
              ))}
            </div>
            <button onClick={applySort} className={okBtnStyle}>Ок</button>
          </div>
        )}
      </div>

      {/* SIZES */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button onClick={() => toggleDropdown('size')} className={btnStyle}>
          {getActiveSizeLabel()} <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'size' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'size' && (
          <div className={popupStyle} style={{ zIndex: 20}}>
            <div className="flex flex-col gap-3">
              {sizeOptions.map((s) => (
                <div key={s} onClick={() => toggleSize(s)} className="flex items-center gap-3 cursor-pointer group">
                  <div className={checkboxStyle}>
                    {tempSize.includes(s) && <div className="w-3 h-3 bg-[#0B0035]"></div>}
                  </div>
                  <span className="text-[15px] group-hover:text-gray-600 transition-colors">{s}</span>
                </div>
              ))}
            </div>
            <button onClick={applySize} className={okBtnStyle}>Ок</button>
            <span onClick={clearSize} className={clearBtnStyle}>Усунути фільтри</span>
          </div>
        )}
      </div>

      {/* COLORS */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button onClick={() => toggleDropdown('color')} className={btnStyle}>
          {getActiveColorLabel()} <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'color' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'color' && (
          <div className={popupStyle} style={{ zIndex: 20 }}>
            <div className="flex flex-col gap-3">
              {colorOptions.map((c) => (
                <div key={c.id} onClick={() => toggleColor(c.id)} className="flex items-center gap-3 cursor-pointer group">
                  <div className={checkboxStyle}>
                    {tempColor.includes(c.id) && <div className="w-3 h-3 bg-[#0B0035]"></div>}
                  </div>
                  <div 
                    className={`w-5 h-5 rounded-full flex-shrink-0 ${c.border ? 'border border-gray-300' : ''}`} 
                    style={{ backgroundColor: c.hex }}
                  ></div>
                  <span className="text-[15px] group-hover:text-gray-600 transition-colors">{c.label}</span>
                </div>
              ))}
            </div>
            <button onClick={applyColor} className={okBtnStyle}>Ок</button>
            <span onClick={clearColor} className={clearBtnStyle}>Усунути фільтри</span>
          </div>
        )}
      </div>

      {/* NEW PRICE FILTER */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button onClick={() => toggleDropdown('price')} className={btnStyle}>
          Ціна <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'price' && (
          <div className={`${popupStyle} w-[340px]`} style={{ zIndex: 20 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="border border-gray-300 px-4 py-2 flex flex-1 items-center justify-between">
                <input 
                  type="text" 
                  value={tempPriceMin} 
                  onChange={handlePriceInput(setTempPriceMin)}
                  onBlur={() => handlePriceBlur('min')}
                  placeholder={availableMinPrice || 0}
                  className="w-full outline-none text-[15px] text-black placeholder-gray-400"
                />
                <span className="text-[15px] text-black font-medium ml-2">грн</span>
              </div>
              <div className="border border-gray-300 px-4 py-2 flex flex-1 items-center justify-between">
                <input 
                  type="text" 
                  value={tempPriceMax} 
                  onChange={handlePriceInput(setTempPriceMax)}
                  onBlur={() => handlePriceBlur('max')}
                  placeholder={availableMaxPrice || 20}
                  className="w-full outline-none text-[15px] text-black placeholder-gray-400"
                />
                <span className="text-[15px] text-black font-medium ml-2">грн</span>
              </div>
            </div>
            <div className="px-2 mb-6 mt-1">
              <div className="w-full h-[3px] bg-black relative flex-shrink-0">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-black rounded-full"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-black rounded-full"></div>
              </div>
            </div>

            <button onClick={applyPrice} className={okBtnStyle}>Ок</button>
            <span onClick={clearPrice} className={clearBtnStyle}>Усунути фільтри</span>
          </div>
        )}
      </div>

      {/* SALES TOGGLE */}
      <div 
        className="flex items-center gap-2 ml-auto cursor-pointer group flex-shrink-0 pl-4"
        onClick={() => setIsSalesActive(!isSalesActive)}
      >
        <span className="font-bold text-[17px] text-black">Sales</span>
        <div className="w-5 h-5 rounded-full border-[2.5px] border-black flex items-center justify-center transition-all bg-[#eef2f6]">
            <div className={`w-2 h-2 bg-black rounded-full transition-opacity ${isSalesActive ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>

    </div>
  );
};

export default CatalogFilterBar;