import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { colorOptions } from '../data/colors';

const sortOptions = [
  { id: 'popular', label: 'Від популярного' },
  { id: 'newest', label: 'Від найновішого' },
  { id: 'price-asc', label: 'Від найдешевшого' },
  { id: 'price-desc', label: 'Від найдорожчого' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

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
  const trackRef = useRef(null);

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

  const minAllowed = availableMinPrice || 0;
  const maxAllowed = availableMaxPrice || 99999;

  const parsedMin = tempPriceMin !== '' ? Number(tempPriceMin) : minAllowed;
  const parsedMax = tempPriceMax !== '' ? Number(tempPriceMax) : maxAllowed;

  const isPriceError = parsedMin > parsedMax || parsedMin > maxAllowed;

  const safeMin = Math.max(minAllowed, Math.min(parsedMin, maxAllowed));
  const safeMax = Math.min(maxAllowed, Math.max(parsedMax, minAllowed));

  const range = maxAllowed - minAllowed || 1;

  const leftPercent = Math.max(0, Math.min(100, ((safeMin - minAllowed) / range) * 100));
  const rightPercent = Math.max(0, Math.min(100, 100 - (((safeMax - minAllowed) / range) * 100)));

  //VALIDATION LOGIC
  const handlePriceInput = (setter) => (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setter(val);
  };

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const clickPercent = clickX / rect.width;
    const clickedValue = Math.round(minAllowed + clickPercent * (maxAllowed - minAllowed));
    const distToMin = Math.abs(safeMin - clickedValue);
    const distToMax = Math.abs(safeMax - clickedValue);

    if (distToMin <= distToMax) {
      setTempPriceMin(clickedValue.toString());
    } else {
      setTempPriceMax(clickedValue.toString());
    }
  };

  const handlePriceBlur = (type) => {
    if (type === 'min' && tempPriceMin !== '') {
      let val = Number(tempPriceMin);
      if (val < minAllowed) setTempPriceMin(minAllowed.toString());
    }
    if (type === 'max' && tempPriceMax !== '') {
      let val = Number(tempPriceMax);
      if (val > maxAllowed) setTempPriceMax(maxAllowed.toString());
    }
  };

  const applyPrice = () => {
    if (isPriceError) return;
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
            <div className="flex flex-col gap-3 ">
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
            <span onClick={clearSize} className={clearBtnStyle}>Очистити фільтри</span>
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
            <span onClick={clearColor} className={clearBtnStyle}>Очистити фільтри</span>
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
                  placeholder={minAllowed}
                  className="w-full outline-none text-[15px] text-black placeholder-gray-400"
                />
                <span className="text-[15px] text-black font-medium ml-2"> UAH </span>
              </div>
              <div className="border border-gray-300 px-4 py-2 flex flex-1 items-center justify-between">
                <input
                  type="text"
                  value={tempPriceMax}
                  onChange={handlePriceInput(setTempPriceMax)}
                  onBlur={() => handlePriceBlur('max')}
                  placeholder={maxAllowed}
                  className="w-full outline-none text-[15px] text-black placeholder-gray-400"
                />
                <span className="text-[15px] text-black font-medium ml-2"> UAH </span>
              </div>
            </div>

            <div
              ref={trackRef}
              onClick={handleTrackClick}
              className="relative w-full h-[3px] bg-gray-300 rounded-full mt-7 mb-6 cursor-pointer hover:bg-gray-400 transition-colors"
            >
              <div
                className={`absolute h-[3px] rounded-full transition-colors ${isPriceError ? 'bg-red-500' : 'bg-black'}`}
                style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
              ></div>

              <input
                type="range"
                min={minAllowed}
                max={maxAllowed}
                value={safeMin}
                onChange={(e) => setTempPriceMin(Math.min(Number(e.target.value), safeMax - 1).toString())}
                className="custom-range-slider z-10"
              />
              <input
                type="range"
                min={minAllowed}
                max={maxAllowed}
                value={safeMax}
                onChange={(e) => setTempPriceMax(Math.max(Number(e.target.value), safeMin + 1).toString())}
                className="custom-range-slider z-20"
              />
            </div>

            <button
              onClick={applyPrice}
              disabled={isPriceError}
              className={`w-full py-2.5 mt-5 font-medium transition-colors ${
                isPriceError
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#0B0035] hover:opacity-90 text-white'
              }`}
            >
              {isPriceError ? 'Невірний діапазон' : 'Ок'}
            </button>
            <span onClick={clearPrice} className={clearBtnStyle}>Очистити фільтри</span>
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
