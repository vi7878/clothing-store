import Main11 from '../assets/products/1_1w.jpg';
import Hover12 from '../assets/products/1_2w.jpg';

import Main21 from '../assets/products/2_1w.jpg';
import Hover22 from '../assets/products/2_2w.jpg';
//to add....



// -SIZES-
//sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

// -COLORS-
//color_Black: [color_name: "Black", color_hex: "#000000"]
//color_White: [color_name: "White", color_hex: "#FFFFFF"]
//color_Gray: [color_name: "Gray", color_hex: "#808080"]
//color_Navy: [color_name: "Navy", color_hex: "#1E3A8A"]
//color_Beige: [color_name: "Beige", color_hex: "#D5B895"]
//color_Brown: [color_name: "Brown", color_hex: "#8B4513"]
//color_Olive: [color_name: "Olive", color_hex: "#4B5320"]
//color_Red: [color_name: "Red", color_hex: "#DC2626"]
//color_Burgundy: [color_name: "Burgundy", color_hex: "#722F37"]
//color_Pink: [color_name: "Pink", color_hex: "#E79E9E"]
//color_Light_Blue: [color_name: "Light Blue", color_hex: "#93C5FD"]
//color_Mustard: [color_name: "Mustard", color_hex: "#EAB308"]

// -CATEGORIES_Women-
//categories: ['Tracksuits', 'Pants & Leggings', 'Shorts', 'Socks', 
// 'T-shirts & Tank Tops', 'Blouses & Shirts', 'Dresses', 'Skirts', 
// 'Sweaters & Cardigans', 'Jackets & Vests', 'Coats', 'Outerwear', 
// 'Hoodies & Sweatshirts', 'Co-ords', 'Jumpsuits', 'Jeans']

// -CATEGORIES_Men-
//categories: ['Tracksuits', 'Pants', 'Shorts', 'Socks', 
// 'T-shirts & Polos', 'Shirts', 'Sweaters', 'Beachwear', 
// 'Suits & Blazers', 'Coats', 'Outerwear', 
// 'Hoodies & Sweatshirts', 'Sets', 'Jeans']


// Function to automatically generate product variants
const generateVariants = (sizes, colors, stock = 5) => { // Set 5 items in stock by default for each variant
  const result = [];
  for (let color of colors) {
    for (let size of sizes) {
      result.push({
        size: size,
        color_name: color.name,
        color_hex: color.hex,
        stock_quantity: stock 
      });
    }
  }
  return result;
};

export const productsData = [
    //--WOMEN--
  {
    id: 1,
    title: "Легкий лляний сет для літа",
    description: "Детальний опис цього чудового товару...", 
    base_price: 960,
    has_discount: true,
    discount_percent: 15, //in this case 'has_discount: false', then '0'
    rating: 4,// then the logic here may change; a table with reviews will be highlighted in the database
    images: [Main11, Hover12],
    gender: "women", 
    category: "Co-ords", 
    collections: ["summer"], //collections: ["new"] or ["summer", "new"] or  [],
    variants: [
      
      // Spread the automatically generated variants (the three dots are mandatory!)
      ...generateVariants(
        ['XS', 'S', 'L'], 
        [                            
          { name: "White", hex: "#FFFFFF" },
          { name: "Red", hex: "#DC2626" },
          { name: "Black", hex: "#000000" }
        ]
      ),

      // Manually add specific variants
      { size: "S", color_name: "White", color_hex: "#FFFFFF", stock_quantity: 5 },
      { size: "M", color_name: "White", color_hex: "#FFFFFF", stock_quantity: 0 }, // Out of inventory
      { size: "XL", color_name: "Blue", color_hex: "#3E7B9D", stock_quantity: 2 }  
      
    ]
  },

  {
    //to correct
    id: 2,
    title: "2VEL new",
    price: 1200,
    rating: 4,
    images: [Main21, Hover22],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['new']
  },
  {
    //to correct
    id: 3,
    title: "3VEL new",
    price: 1200,
    rating: 4,
    images: [Main31, Hover32],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['new']
  },
  {
    //to correct
    id: 4,
    title: "4VEL new",
    price: 1200,
    rating: 4,
    images: [Main41, Hover42],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['new']
  },
  {
    //to correct
    id: 5,
    title: "5VEL new",
    price: 1200,
    rating: 4,
    images: [Main51, Hover52],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['new']
  },
  {
    //to correct
    id: 6,
    title: "6VEL summer",
    price: 1200,
    rating: 4,
    images: [Main61, Hover62],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['summer']
  },
  {
    //to correct
    id: 7,
    title: "7VEL summer",
    price: 1200,
    rating: 4,
    images: [Main71, Hover72],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['summer']
  },
  {
    //to correct
    id: 8,
    title: "8VEL summer",
    price: 1200,
    rating: 4,
    images: [Main81, Hover82],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['summer']
  },
  {
    //to correct
    id: 9,
    title: "9VEL summer",
    price: 1200,
    rating: 4,
    images: [Main91, Hover92],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['summer']
  },
  {
    //to correct
    id: 10,
    title: "10VEL summer",
    price: 1200,
    rating: 4,
    images: [Main101, Hover102],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'women',
    collections: ['summer']
  },

  //--MEN--
  // start with id: 50
  {
      //to correct
    id: 11,
    title: "11VEL new",
    price: 1400,
    rating: 4,
    images: [Main111, Hover112],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['new']
  },
    {
        //to correct
    id: 12,
    title: "12VEL new",
    price: 1400,
    rating: 4,
    images: [Main121, Hover122],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['new']
  },
    {
        //to correct
    id: 13,
    title: "13VEL new",
    price: 1400,
    rating: 4,
    images: [Main131, Hover132],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['new']
  },
    {
        //to correct
    id: 14,
    title: "14VEL new",
    price: 1400,
    rating: 4,
    images: [Main141, Hover142],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['new']
  },
    {
        //to correct
    id: 15,
    title: "15VEL new",
    price: 1400,
    rating: 4,
    images: [Main151, Hover152],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['new']
  },
   {
      //to correct
    id: 16,
    title: "16VEL summer",
    price: 1300,
    rating: 4,
    images: [Main151, Hover152],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['summer']
  },
    {
        //to correct
    id: 17,
    title: "17VEL summer",
    price: 1300,
    rating: 4,
    images: [Main111, Hover112],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['summer']
  },
    {
        //to correct
    id: 18,
    title: "18VEL summer",
    price: 1300,
    rating: 4,
    images: [Main121, Hover122],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['summer']
  },
    {
        //to correct
    id: 19,
    title: "19VEL summer",
    price: 1300,
    rating: 4,
    images: [Main131, Hover132],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['summer']
  },
    {
        //to correct
    id: 20,
    title: "20VEL summer",
    price: 1300,
    rating: 4,
    images: [Main141, Hover142],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFFFFF', '#F29B9B', '#3E7B9D', '#D4BB2A'],
    gender: 'men',
    collections: ['summer']
  },
];
