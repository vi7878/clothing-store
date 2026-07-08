import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
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

  const isAnyFilterActive =
    sort !== 'popular' ||
    (size && size.length > 0) ||
    (color && color.length > 0) ||
    priceMin !== '' ||
    priceMax !== '' ||
    isSalesActive;


  const handleClearAll = () => {
    setSort('popular');
    setSize([]);
    setColor([]);
    setPriceMin('');
    setPriceMax('');
    setIsSalesActive(false);
    setOpenDropdown(null);
  };

  const btnStyle = "border border-black bg-[#E6F1F9] px-2.5 py-1.5 md:px-4 md:py-1.5 flex items-center justify-between gap-1.5 md:gap-4 flex-shrink-0 whitespace-nowrap text-[13px] md:text-[15px] text-black font-medium hover:bg-[#d8e0eb] transition-colors";
  const popupStyle = "absolute top-[calc(100%+8px)] z-[100] bg-white border border-gray-300 shadow-xl p-4 min-w-[220px] md:min-w-[280px] max-w-[90vw] max-h-[250px] md:max-h-[450px] overflow-y-auto rounded-md md:rounded-none";
  const okBtnStyle = "w-full bg-[#0B0035] hover:opacity-90 text-white font-medium py-2.5 mt-5 transition-opacity md:rounded-none uppercase text-sm tracking-wider";
  const clearBtnStyle = "text-sm text-gray-500 underline text-center block mt-4 cursor-pointer hover:text-black";
  const checkboxStyle = "w-5 h-5 flex-shrink-0 border border-gray-400 md:border-black flex items-center justify-center bg-white cursor-pointer";

  const getActiveSortLabel = () => sortOptions.find(o => o.id === sort)?.label || 'Сортувати за';
  const getActiveSizeLabel = () => size?.length > 0 ? (size.length === 1 ? `Розмір: ${size[0]}` : `Розмірів: ${size.length}`) : 'Розміри';
  const getActiveColorLabel = () => color?.length > 0 ? (color.length === 1 ? 'Колір: 1' : `Кольорів: ${color.length}`) : 'Кольори';

  return (
    <div
      ref={barRef}
      className={`sticky bg-white z-30 top-[130px] md:top-[150px] -mx-4 px-4 transition-transform duration-300 ease-in-out py-8 md:pt-4 md:pb-5 border-b border-gray-200 md:border-gray-300 mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4 ${
        scrollDirection === 'down' ? '-translate-y-[150px]' : 'translate-y-0'
      }`}
    >

      {/* SORTING */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button type="button" onClick={() => toggleDropdown('sort')} className={btnStyle}>
          {getActiveSortLabel()} <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'sort' && (
          <div className={`${popupStyle} left-0`}>
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
            <button type="button" onClick={applySort} className={okBtnStyle}>Ок</button>
          </div>
        )}
      </div>

      {/* SIZES */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button type="button" onClick={() => toggleDropdown('size')} className={btnStyle}>
          {getActiveSizeLabel()} <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'size' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'size' && (
          <div className={`${popupStyle} left-0`}>
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
            <button type="button" onClick={applySize} className={okBtnStyle}>Ок</button>
            <span onClick={clearSize} className={clearBtnStyle}>Очистити фільтри</span>
          </div>
        )}
      </div>

      {/* COLORS */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button type="button" onClick={() => toggleDropdown('color')} className={btnStyle}>
          {getActiveColorLabel()} <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'color' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'color' && (
          <div className={`${popupStyle} right-0 md:left-0 md:right-auto`}>
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
            <button type="button" onClick={applyColor} className={okBtnStyle}>Ок</button>
            <span onClick={clearColor} className={clearBtnStyle}>Очистити фільтри</span>
          </div>
        )}
      </div>

      {/*PRICE FILTER */}
      <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
        <button type="button" onClick={() => toggleDropdown('price')} className={btnStyle}>
          Ціна <FiChevronDown className={`text-lg transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'price' && (
         <div className={`${popupStyle} left-0 md:left-auto md:right-0 w-[300px] md:w-[340px]`}>
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
              type="button"
              onClick={applyPrice}
              disabled={isPriceError}
              className={`w-full py-2.5 mt-5 font-medium transition-colors ${isPriceError
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
        className="flex items-center gap-2 md:ml-auto cursor-pointer group flex-shrink-0 py-1"
        onClick={() => setIsSalesActive(!isSalesActive)}
      >
        <span className="font-bold text-[14px] md:text-[17px] text-black">Sales</span>
        <div className={`w-10 h-5 md:w-12 md:h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 ${isSalesActive ? 'bg-black' : 'bg-gray-300'}`}>
          <div className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isSalesActive ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`}></div>
        </div>
      </div>

      {isAnyFilterActive && (
        <div className="flex flex-wrap items-center gap-2 w-full pt-1">

          {sort !== 'popular' && (
            <div className="flex items-center gap-1.5 bg-[#f3f3f3] border border-gray-200 px-3 py-1 rounded-full text-[13px] text-black">
              <span className="text-gray-500">Сортування:</span> <span className="font-semibold">{getActiveSortLabel()}</span>
              <button type="button" onClick={() => setSort('popular')} className="ml-1 text-gray-400 hover:text-red-500 transition-colors">
                <FiX className="text-sm stroke-[3]" />
              </button>
            </div>
          )}

          {size?.map((s) => (
            <div key={`tag-size-${s}`} className="flex items-center gap-1.5 bg-[#f3f3f3] border border-gray-200 px-3 py-1 rounded-full text-[13px] text-black">
              <span className="text-gray-500">Розмір:</span> <span className="font-semibold">{s}</span>
              <button type="button" onClick={() => setSize(size.filter((item) => item !== s))} className="ml-1 text-gray-400 hover:text-red-500 transition-colors">
                <FiX className="text-sm stroke-[3]" />
              </button>
            </div>
          ))}

          {color?.map((cId) => {
            const colorObj = colorOptions.find((opt) => opt.id === cId);
            return colorObj ? (
              <div key={`tag-color-${cId}`} className="flex items-center gap-1.5 bg-[#f3f3f3] border border-gray-200 px-3 py-1 rounded-full text-[13px] text-black">
                <span className="text-gray-500">Колір:</span> <span className="font-semibold">{colorObj.label}</span>
                <button type="button" onClick={() => setColor(color.filter((item) => item !== cId))} className="ml-1 text-gray-400 hover:text-red-500 transition-colors">
                  <FiX className="text-sm stroke-[3]" />
                </button>
              </div>
            ) : null;
          })}

          {(priceMin !== '' || priceMax !== '') && (
            <div className="flex items-center gap-1.5 bg-[#f3f3f3] border border-gray-200 px-3 py-1 rounded-full text-[13px] text-black">
              <span className="text-gray-500">Ціна:</span> <span className="font-semibold">{priceMin || availableMinPrice} - {priceMax || availableMaxPrice} UAH</span>
              <button type="button" onClick={() => { setPriceMin(''); setPriceMax(''); }} className="ml-1 text-gray-400 hover:text-red-500 transition-colors">
                <FiX className="text-sm stroke-[3]" />
              </button>
            </div>
          )}

          {isSalesActive && (
            <div className="flex items-center gap-1.5 bg-[#fce8e8] border border-red-200 px-3 py-1 rounded-full text-[13px] text-red-700">
              <span className="font-bold">Тільки Sales</span>
              <button type="button" onClick={() => setIsSalesActive(false)} className="ml-1 text-red-400 hover:text-red-600 transition-colors">
                <FiX className="text-sm stroke-[3]" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleClearAll}
            className="ml-3 text-[13px] font-medium text-gray-500 underline hover:text-[#B2412E] transition-colors"
          >
            Очистити всі фільтри
          </button>
        </div>
      )}

    </div>
  );
};

export default CatalogFilterBar;
