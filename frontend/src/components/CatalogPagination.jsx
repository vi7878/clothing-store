const CatalogPagination = ({ visibleCount, totalCount, onLoadMore }) => {
  const allLoaded = visibleCount >= totalCount;
  return (
    <div className="flex justify-center w-full pt-8 pb-10">
       {!allLoaded && (
         <button 
           onClick={onLoadMore}
           className="border-[2px] border-[#0B0035] bg-[#E6F1F9] rounded-full px-8 py-2 text-[15px] font-black flex items-center gap-2 text-[#0B0035] hover:bg-[#d8e0eb] transition-colors shadow-sm">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
           </svg>
           Завантажити ще
         </button>
       )}
    </div>
  )
}

export default CatalogPagination