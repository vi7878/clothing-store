import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { mobileMenuItems } from '../data/menuData';

const MobileNav = ({ setMobileMenuOpen }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setExpandedMenu(null);
    setExpandedSection(null);
  };

  return (
    <nav className="flex flex-col p-4 gap-0 flex-1 overflow-y-auto hide-scrollbar bg-white">
      {mobileMenuItems.map((item) => {
        const hasDropdown = item.subItems || item.sections;

        return (
          <div key={item.label} className="border-b border-gray-100">
            {hasDropdown ? (
              <>
                <button
                  onClick={() => {
                    setExpandedMenu(expandedMenu === item.label ? null : item.label);
                    setExpandedSection(null);
                  }}
                  className={`w-full flex items-center justify-between py-4 px-2 font-bold uppercase tracking-wide transition-colors ${
                    expandedMenu === item.label ? 'border-[1.5px] border-black text-black' : item.red ? 'text-[#B2412E]' : 'text-[#0B0035]'
                  }`}
                >
                  {item.label}
                  {expandedMenu === item.label ? <FiChevronDown size={22} className="text-black" /> : <FiChevronRight size={22} className="text-gray-400" />}
                </button>

                {expandedMenu === item.label && (
                  <div className="bg-white flex flex-col pb-4 pt-2 px-2 animate-[fadeIn_0.2s_ease-in-out]">

                    {item.subItems && item.subItems.map((sub, idx) => (
                      <NavLink
                        key={idx}
                        to={sub.to}
                        onClick={closeAllMenus}
                        className="py-3 pl-4 pr-2 text-[15px] font-bold text-black transition-opacity hover:opacity-70 border-b border-gray-50 last:border-none"
                      >
                        {sub.label}
                      </NavLink>
                    ))}

                    {item.sections && item.sections.map((section, idx) => (
                      <div key={idx} className="flex flex-col mb-1.5">
                        <button
                          onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                          className={`w-full flex items-center justify-between py-3.5 px-4 font-bold text-[16px] transition-all ${
                            expandedSection === section.title ? 'border-[1.5px] border-black text-black' : 'text-black'
                          }`}
                        >
                          <span>{section.title}</span>
                          {expandedSection === section.title ? <FiChevronDown size={20} className="text-black" /> : <FiChevronRight size={20} className="text-gray-400" />}
                        </button>

                        {expandedSection === section.title && (
                          <div className="flex flex-col gap-2 pl-8 pr-4 pb-4 pt-3 animate-[fadeIn_0.2s_ease-in-out]">
                            {section.links.map((link, lIdx) => (
                              <NavLink
                                key={lIdx}
                                to={link.to}
                                onClick={closeAllMenus}
                                className={() =>
                                  `py-2 text-[15px] font-bold transition-opacity hover:opacity-70 ${
                                    link.highlight ? 'text-[#B2412E]' : 'text-black'
                                  }`
                                }
                              >
                                {link.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (

              <NavLink
                to={item.to}
                onClick={closeAllMenus}
                className={() =>
                  `block w-full text-left py-4 px-2 font-bold uppercase tracking-wide transition-opacity hover:opacity-70 ${
                    item.red ? 'text-[#B2412E]' : 'text-[#0B0035]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default MobileNav;
