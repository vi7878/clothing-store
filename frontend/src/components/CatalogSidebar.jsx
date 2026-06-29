const CatalogSidebar = ({
  scrollDirection,
  activeCollection,
  activeCategory,
  onCollectionClick,
  onCategoryClick,
  categoriesMap,
  newCategories,
  summerCategories
}) => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 md:border-r border-gray-200 md:pr-6">
      <div className={`sticky top-[180px] transition-transform duration-300 ease-in-out flex flex-col gap-6 ${
          scrollDirection === 'down' ? '-translate-y-[150px]' : 'translate-y-0'
        }`}>

        {/* NEW*/}
        <div>
          <button
            type="button"
            onClick={() => onCollectionClick('new')}
            className={`text-left font-black text-[22px] tracking-wide w-full transition-colors ${activeCollection === 'new' ? 'text-black' : 'text-black hover:text-gray-700'}`}>
            Новинки
          </button>
          {activeCollection === 'new' && (
            <ul className="flex flex-col gap-3 pl-4 mt-3">
              <li>
                <button  type="button" onClick={() => onCategoryClick('all')} className={`text-left text-[16px] transition-colors ${activeCategory === 'all' ? 'text-[#a53b26] font-bold' : 'text-black font-medium hover:text-[#a53b26]'}`}>
                  Всі новинки
                </button>
              </li>
              {newCategories.map((cat) => (
                <li key={cat.id}>
                  <button type="button" onClick={() => onCategoryClick(cat.id)} className={`text-left text-[16px] transition-colors ${activeCategory === cat.id ? 'text-[#a53b26] font-bold' : 'text-black font-medium hover:text-[#a53b26]'}`}>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*SEASONAL*/}
        <div>
          <button
            type="button"
            onClick={() => onCollectionClick('summer')}
            className={`text-left font-black text-[22px] tracking-wide w-full transition-colors ${activeCollection === 'summer' ? 'text-black' : 'text-black hover:text-gray-700'}`}>
            Сезонні
          </button>
          {activeCollection === 'summer' && (
            <ul className="flex flex-col gap-3 pl-4 mt-3">
              <li>
                <button type="button" onClick={() => onCategoryClick('all')} className={`text-left text-[16px] transition-colors ${activeCategory === 'all' ? 'text-[#a53b26] font-bold' : 'text-black font-medium hover:text-[#a53b26]'}`}>
                  Всі сезонні
                </button>
              </li>
              {summerCategories.map((cat) => (
                <li key={cat.id}>
                  <button  type="button" onClick={() => onCategoryClick(cat.id)} className={`text-left text-[16px] transition-colors ${activeCategory === cat.id ? 'text-[#a53b26] font-bold' : 'text-black font-medium hover:text-[#a53b26]'}`}>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*CLOTHING*/}
        <div>
          <button
          type="button"
            onClick={() => onCollectionClick('all')}
            className={`text-left font-black text-[22px] tracking-wide w-full transition-colors ${activeCollection === 'all' ? 'text-black' : 'text-black hover:text-gray-700'}`}
          >
            Одяг
          </button>
          {activeCollection === 'all' && (
            <ul className="flex flex-col gap-3 pl-4 mt-3">
              <li>
                <button  type="button" onClick={() => onCategoryClick('all')} className={`text-left text-[16px] transition-colors ${activeCategory === 'all' ? 'text-[#a53b26] font-bold' : 'text-black font-medium hover:text-[#a53b26]'}`}>
                  Всі товари
                </button>
              </li>
              {categoriesMap.map((cat) => (
                <li key={cat.id}>
                  <button type="button" onClick={() => onCategoryClick(cat.id)} className={`text-left text-[16px] transition-colors ${activeCategory === cat.id ? 'text-[#a53b26] font-bold' : 'text-black font-medium hover:text-[#a53b26]'}`}>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  )
}

export default CatalogSidebar
