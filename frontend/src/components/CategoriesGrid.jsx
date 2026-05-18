import React from 'react'
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import tshirtsWomen from '../assets/categories/tshirts-women.jpg';
import tshirtsMen from '../assets/categories/tshirts-men.jpg';
import sweatersWomen from '../assets/categories/sweaters-women.jpg';
import sweatersMen from '../assets/categories/sweaters-men.jpg';
import dresses from '../assets/categories/dresses.jpg';
import pantsMen from '../assets/categories/pants-men.jpg';
import outWomen from '../assets/categories/outerwear-women.jpg';
import outMen from '../assets/categories/outerwear-men.jpg';

//temporary data for cards
const categories = [
  { id: 1, title: "ФУТБОЛКИ ДЛЯ НЕЇ", link: "/shop/women/tshirts", img: tshirtsWomen },
  { id: 2, title: "ФУТБОЛКИ ДЛЯ НЬОГО", link: "/shop/men/tshirts", img: tshirtsMen },
  { id: 3, title: "СВЕТРИ ДЛЯ НЕЇ", link: "/shop/women/sweaters", img: sweatersWomen },
  { id: 4, title: "СВЕТРИ ДЛЯ НЬОГО", link: "/shop/men/sweaters", img: sweatersMen },
  { id: 5, title: "СУКНІ ТА СПІДНИЦІ", link: "/shop/women/dresses", img: dresses },
  { id: 6, title: "ШТАНИ ДЛЯ НЬОГО", link: "/shop/men/pants", img: pantsMen },
  { id: 7, title: "ВЕРХНІЙ ОДЯГ ДЛЯ НЕЇ", link: "/shop/women/outerwear", img: outWomen },
  { id: 8, title: "ВЕРХНІЙ ОДЯГ ДЛЯ НЬОГО", link: "/shop/men/outerwear", img: outMen },
];

const CategoriesGrid = () => {
return (
    <div className="max-w-[1700px] mx-auto w-full px-10 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            to={cat.link}
            className="relative group aspect-[4/5] overflow-hidden bg-gray-200 block"
          >
            <img 
              src={cat.img} 
              alt={cat.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div> 
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2">
              <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">{cat.title}</h3>
              <FiArrowRight className="text-white text-xl transform transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesGrid