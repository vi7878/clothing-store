import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

//temporary data for cards
const categories = [
  { id: 1, title: "ФУТБОЛКИ ДЛЯ НЕЇ", link: "/shop/women?category=T-shirts %26 Tank Tops", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/tshirts-women" },
  { id: 2, title: "ФУТБОЛКИ ДЛЯ НЬОГО", link: "/shop/men?category=T-shirts %26 Polos", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/tshirts-men" },
  { id: 3, title: "СВЕТРИ ДЛЯ НЕЇ", link: "/shop/women?category=Sweaters %26 Cardigans", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/sweaters-women" },
  { id: 4, title: "СВЕТРИ ДЛЯ НЬОГО", link: "/shop/men?category=Sweaters", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/sweaters-men" },
  { id: 5, title: "СУКНІ", link: "/shop/women?category=Dresses", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/dresses" },
  { id: 6, title: "ШТАНИ ДЛЯ НЬОГО", link: "/shop/men?category=Pants", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/pants-men" },
  { id: 7, title: "ВЕРХНІЙ ОДЯГ ДЛЯ НЕЇ", link: "/shop/women?category=Outerwear", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/outerwear-women" },
  { id: 8, title: "ВЕРХНІЙ ОДЯГ ДЛЯ НЬОГО", link: "/shop/men?category=Outerwear", img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/categories/outerwear-men" },
];

const CategoriesGrid = () => {
return (
    <div className="max-w-[1700px] mx-auto w-full px-10 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
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
