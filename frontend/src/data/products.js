// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/13_3m" from "../assets/products/13_3m.jpg";







// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_3m" from "../assets/products/20_3m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_4m" from "../assets/products/20_4m.jpg";



// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_3m" from "../assets/products/23_3m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_4m" from "../assets/products/23_4m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_5m" from "../assets/products/23_5m.jpg";

// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/24_3m" from "../assets/products/24_3m.jpg";








// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/32_1m" from "../assets/products/32_1m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/32_2m" from "../assets/products/32_2m.jpg";


// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/34_3m" from "../assets/products/34_3m.jpg";




// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/38_3m" from "../assets/products/38_3m.jpg";

// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_3m" from "../assets/products/39_3m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_4m" from "../assets/products/39_4m.jpg";

// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_3m" from "../assets/products/40_3m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_4m" from "../assets/products/40_4m.jpg";
// import "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_5m" from "../assets/products/40_5m.jpg";





// -SIZES-
//sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

// -COLORS-
// src/data/colors.js

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
const generateVariants = (sizes, colors, stock = 5) => {
  // Set 5 items in stock by default for each variant
  const result = [];
  for (let color of colors) {
    for (let size of sizes) {
      result.push({
        size: size,
        color_name: color.name,
        color_hex: color.hex,
        stock_quantity: stock,
      });
    }
  }
  return result;
};

export const productsData = [
  //--WOMEN--
  {
    id: 1,
    //код
    name: "Спортивний костюм оверсайз ",
    description: "Детальний опис цього чудового товару...",
    base_price: 1500,
    has_discount: false, //if 'has_discount: false', then 'discount_percent' must be '0'
    discount_percent: 0, //in this case 'has_discount: false', then '0'
    rating: 4, // then the logic here may change; a table with reviews will be highlighted in the database
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/1_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/1_2w"],
    gender: "women",
    category: "Tracksuits",
    collections: ["new"], //collections: ["new"] or ["summer", "new"] or  [],
    variants: [
      // Spread the automatically generated variants (the three dots are mandatory!)
      ...generateVariants(
        ["XS", "S"],
        [
          { name: "Pink", hex: "#E79E9E" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
        ],
      ),

      // Manually add specific variants
      {
        size: "S",
        color_name: "White",
        color_hex: "#FFFFFF",
        stock_quantity: 5,
      },
      {
        size: "M",
        color_name: "White",
        color_hex: "#FFFFFF",
        stock_quantity: 0,
      }, // Out of inventory
      {
        size: "XL",
        color_name: "Blue",
        color_hex: "#3E7B9D",
        stock_quantity: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Легкий лляний сет для літа",
    description:
      "Зручний комплект з худі та джогерів, виконаний з якісної щільної бавовни на флісі. Ідеальний вибір для прохолодних вечорів",
    base_price: 1400,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/2_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/2_2w"],
    gender: "women",
    category: "Co-ords",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Mustard", hex: "#EAB308" },
          { name: "Gray", hex: "#808080" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 3,
    name: "Спортивний сет з велосипедками",
    description: "Детальний опис цього чудового товару...",
    base_price: 1050,
    has_discount: true,
    discount_percent: 5,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/3_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/3_2w"],
    gender: "women",
    category: "Co-ords",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Mustard", hex: "#EAB308" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 4,
    name: "Лляний сет",
    description:
      "Складається з топа на бретельках та шортів з високою посадкою. Виглядає дорого та елегантно",
    base_price: 960,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/4_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/4_2w"],
    gender: "women",
    category: "Co-ords",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
  {
    id: 5,
    name: "Шовковий костюм у піжамному стилі",
    description:
      "Трендовий костюм вільного крою зі штучного шовку. Складається з сорочки на ґудзиках та розслаблених широких штанів. Виглядає дорого та елегантно",
    base_price: 1180,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/5_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/5_2w"],
    gender: "women",
    category: "Co-ords",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "Pink", hex: "#E79E9E" },
        ],
      ),
    ],
  },
  {
    id: 6,
    name: "Безшовний комплект для фітнесу",
    description:
      "Ідеальний вибір для тренувань у залі, йоги чи розтяжки. Еластична тканина, що дихає, забезпечує максимальну підтримку, а безшовна технологія гарантує комфорт під час будь-яких рухів",
    base_price: 1370,
    has_discount: true,
    discount_percent: 10,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/6_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/6_2w"],
    gender: "women",
    category: "Tracksuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Pink", hex: "#E79E9E" },
          { name: "Navy", hex: "#1E3A8A" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
  {
    id: 7,
    name: "Базовий спортивний костюм на флісі",
    description:
      "Твій улюблений теплий сет для прохолодної погоди. Об'ємне худі-оверсайз з глибоким капюшоном та зручні джогери на високій посадці. М'який фліс всередині",
    base_price: 1450,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/7_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/7_2w"],
    gender: "women",
    category: "Tracksuits",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
  {
    id: 8,
    name: "Класична куртка-косуха",
    description:
      "Базова куртка-косуха з якісної екошкіри з металевою фурнітурою. Універсальний елемент гардероба, який ідеально доповнить як кежуал, так і романтичний образ.",
    base_price: 2200,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/8_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/8_2w"],
    gender: "women",
    category: "Outerwear",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Burgundy", hex: "#722F37" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
  {
    id: 9,
    name: "Елегантне коротке пальто з поясом",
    description:
      "Стильне демісезонне пальто вільного крою, що витончено підкреслює талію завдяки широкому поясу. Ідеальний варіант для міських буднів.",
    base_price: 2850,
    has_discount: true,
    discount_percent: 15,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/9_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/9_2w"],
    gender: "women",
    category: "Outerwear",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
  {
    id: 10,
    name: "Класичне пальто прямого крою",
    description:
      "Базове осіннє пальто теплого коричневого відтінку. Прямий силует чудово поєднується з об'ємними светрами та дозволяє створювати багатошарові образи.",
    base_price: 3200,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/10_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/10_2w"],
    gender: "women",
    category: "Coats",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
  {
    id: 11,
    name: "Вовняне пальто на затин",
    description:
      "Жіночне пальто міді класичного бежевого кольору. Фасон на затин з поясом гарантує ідеальну посадку на будь-яку фігуру, а вовна у складі надійно зігріває.",
    base_price: 4100,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/11_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/11_2w"],
    gender: "women",
    category: "Coats",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
  {
    id: 12,
    name: "Яскраве двобортне пальто",
    description:
      "Ефектне червоне пальто, яке стане головним акцентом твого гардероба. Класичний двобортний крой та щільна тканина, що добре тримає форму.",
    base_price: 3800,
    has_discount: true,
    discount_percent: 20,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/12_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/12_2w"],
    gender: "women",
    category: "Coats",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Red", hex: "#DC2626" },
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 13,
    name: "Утеплений стьобаний жилет",
    description:
      "Базовий дутий жилет із капюшоном. Ідеальний шар для прохолодної погоди, чудово поєднується з об'ємними худі та спортивними костюмами.",
    base_price: 1850,
    has_discount: true,
    discount_percent: 15,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/13_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/13_2w"],
    gender: "women",
    category: "Jackets & Vests",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Olive", hex: "#4B5320" },
          { name: "Black", hex: "#000000" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
  {
    id: 14,
    name: "Твідовий жилет у клітинку",
    description:
      "Елегантний жилет прямого крою з класичним картатим принтом. Додасть фактурності вашому повсякденному або офісному образу.",
    base_price: 2100,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/14_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/14_2w"],
    gender: "women",
    category: "Jackets & Vests",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 15,
    name: "Легка вітрівка з капюшоном",
    description:
      "Практична куртка-вітрівка для мінливої погоди. Виконана з водовідштовхувального матеріалу, має зручний капюшон та мінімалістичний дизайн.",
    base_price: 1950,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/15_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/15_2w"],
    gender: "women",
    category: "Jackets & Vests",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L", "XL"],
        [
          { name: "Gray", hex: "#808080" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
  {
    id: 16,
    name: "Базова джинсова куртка",
    description:
      "Класична джинсова куртка прямого крою. Незамінний елемент гардероба, який ніколи не виходить з моди та ідеально підходить до будь-якого стилю.",
    base_price: 1700,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/16_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/16_2w"],
    gender: "women",
    category: "Jackets & Vests",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Navy", hex: "#1E3A8A" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 17,
    name: "Джинсова куртка вінтажного крою",
    description:
      "Куртка з деніму у вінтажному стилі з легкими потертостями. Чудово доповнить літні сукні та повсякденні луки з улюбленими брюками.",
    base_price: 1850,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/17_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/17_2w"],
    gender: "women",
    category: "Jackets & Vests",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Blue", hex: "#3E7B9D" },
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 18,
    name: "Плюшевий жилет оверсайз",
    description:
      "Неймовірно м'який та теплий жилет зі штучного хутра (шерпа). Затишний варіант для створення стильних багатошарових образів.",
    base_price: 1600,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/18_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/18_2w"],
    gender: "women",
    category: "Jackets & Vests",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "Brown", hex: "#8B4513" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 19,
    name: "Джинси скіні з високою посадкою",
    description:
      "Базові облягаючі джинси скіні світло-блакитного відтінку. Ідеально підкреслюють фігуру, візуально подовжують ноги та підходять для створення ніжних повсякденних образів.",
    base_price: 1250,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/19_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/19_2w"],
    gender: "women",
    category: "Jeans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Navy", hex: "#1E3A8A" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 20,
    name: "Класичні прямі джинси",
    description:
      "Прямі джинси класичного синього кольору (straight fit). Універсальна модель базового гардероба, яка гармонійно поєднується як з кедами, так і з підборами.",
    base_price: 1400,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_2w"],
    gender: "women",
    category: "Jeans",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Blue", hex: "#3E7B9D" },
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 21,
    name: "Світлі джинси труби",
    description:
      "Трендові широкі джинси світлого, майже льодяного відтінку. Створюють розслаблений силует та забезпечують максимальну свободу рухів.",
    base_price: 1650,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/21_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/21_2w"],
    gender: "women",
    category: "Jeans",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 22,
    name: "Базові джинси мом",
    description:
      "Зручні джинси фасону 'мом' (mom Jeans) із щільного деніму. Трохи вільні на стегнах і завужені донизу — класика, яка завжди актуальна.",
    base_price: 1350,
    has_discount: true,
    discount_percent: 10,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/22_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/22_2w"],
    gender: "women",
    category: "Jeans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [{ name: "Light Blue", hex: "#93C5FD" }],
      ),
    ],
  },
  {
    id: 23,
    name: "Темно-сірі джинси баггі",
    description:
      "Стильні широкі джинси баггі у темно-сірому кольорі з акцентними потертостями. Додадуть зухвалості твоїм стрітстайл-лукам.",
    base_price: 1750,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_2w"],
    gender: "women",
    category: "Jeans",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Gray", hex: "#808080" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 24,
    name: "Широкі джинси з розрізами",
    description:
      "Довгі джинси вільного крою (wide leg) зі стильними розрізами на колінах. Хіт цього сезону для створення розслаблених та сміливих образів.",
    base_price: 1800,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/24_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/24_2w"],
    gender: "women",
    category: "Jeans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Blue", hex: "#3E7B9D" },
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 25,
    name: "Джинси палаццо з декором",
    description:
      "Об'ємні джинси палаццо класичного синього кольору з цікавими деталями та декоративними елементами. Максимальний комфорт та виразна фактура.",
    base_price: 1950,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/25_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/25_2w"],
    gender: "women",
    category: "Jeans",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Blue", hex: "#3E7B9D" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 26,
    name: "Елегантний комбінезон з відкритою спиною",
    description:
      "Розкішний вечірній комбінезон насиченого смарагдового кольору з V-подібним вирізом та широкими штанинами. Ідеальний вибір для урочистих подій та святкових виходів.",
    base_price: 2400,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/26_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/26_2w"],
    gender: "women",
    category: "Jumpsuits",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Teal", hex: "#008080" },
          { name: "Black", hex: "#000000" },
          { name: "Red", hex: "#DC2626" },
        ],
      ),
    ],
  },
  {
    id: 27,
    name: "Комбінезон з дрібним квітковим принтом",
    description:
      "Легкий літній комбінезон з ніжним флористичним візерунком. Вільний крій, м'яка тканина та акцент на талії забезпечують комфорт та жіночний силует.",
    base_price: 1550,
    has_discount: true,
    discount_percent: 15,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/27_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/27_2w"],
    gender: "women",
    category: "Jumpsuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Olive", hex: "#4B5320" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
  {
    id: 28,
    name: "Червоний комбінезон міді з принтом",
    description:
      "Яскравий комбінезон-кюлоти червоного кольору з принтом. Має короткі рукави та зручний пояс. Чудовий варіант для прогулянок містом, побачень чи відпустки.",
    base_price: 1600,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/28_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/28_2w"],
    gender: "women",
    category: "Jumpsuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Red", hex: "#DC2626" },
          { name: "Navy", hex: "#1E3A8A" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 29,
    name: "Базовий чорний комбінезон на бретелях",
    description:
      "Лаконічний та абсолютно універсальний комбінезон з вкороченими штанинами вільного крою. Легко стилізується як зі спортивним взуттям, так і з елегантними босоніжками.",
    base_price: 1300,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/29_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/29_2w"],
    gender: "women",
    category: "Jumpsuits",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 30,
    name: "Базові сірі шкарпетки",
    description:
      "Універсальні базові шкарпетки світло-сірого меланжевого кольору. Виконані з дихаючої бавовни, ідеально підходять для щоденного комфорту.",
    base_price: 150,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/30_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/30_2w"],
    gender: "women",
    category: "Socks",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Gray", hex: "#808080" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 31,
    name: "Шкарпетки з принтом 'Губи'",
    description:
      "Оригінальні білі шкарпетки з яскравим акцентним принтом червоних губ. Додадуть грайливого настрою та стануть цікавою деталлю твого образу.",
    base_price: 180,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/31_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/31_2w"],
    gender: "women",
    category: "Socks",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Red", hex: "#DC2626" },
        ],
      ),
    ],
  },
  {
    id: 32,
    name: "Рожеві шкарпетки з бананами",
    description:
      "Веселі та яскраві рожеві шкарпетки з милим принтом жовтих бананів. М'яка резинка не перетискає ногу, забезпечуючи комфорт на весь день.",
    base_price: 190,
    has_discount: true,
    discount_percent: 15,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/32_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/32_2w"],
    gender: "women",
    category: "Socks",
    collections: [],
    variants: [
      ...generateVariants(["S", "M", "L"], [{ name: "Pink", hex: "#E79E9E" }]),
    ],
  },
  {
    id: 33,
    name: "Базове худі оверсайз",
    description:
      "Об'ємне худі зі спущеною лінією плеча та зручним капюшоном. М'яка бавовна на флісі забезпечує тепло та комфорт у прохолодну погоду, а вільний крій не сковує рухів.",
    base_price: 1200,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/33_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/33_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 34,
    name: "Тепле худі кольору хакі",
    description:
      "Зручне худі класичного крою глибокого оливкового відтінку. Ідеально підходить для зимових прогулянок та активного відпочинку. Добре поєднується з джинсами та джогерами.",
    base_price: 1350,
    has_discount: true,
    discount_percent: 15,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/34_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/34_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Olive", hex: "#4B5320" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 35,
    name: "Худі тай-дай 'Lakers'",
    description:
      "Яскраве худі з логотипом Lakers у стилі тай-дай. Смілива та акцентна річ для тих, хто любить виділятися та цінує естетику стрітстайлу.",
    base_price: 1650,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/35_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/35_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Mustard", hex: "#EAB308" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 36,
    name: "Спортивне худі з принтом",
    description:
      "Насичене фіолетове худі зі спортивним принтом. Чудовий вибір для тренувань на свіжому повітрі або створення розслаблених повсякденних образів.",
    base_price: 1500,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/36_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/36_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Purple", hex: "#6B21A8" },
          { name: "Navy", hex: "#1E3A8A" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 37,
    name: "Світле худі з написом 'NYC'",
    description:
      "Стильне худі молочного відтінку з мінімалістичним принтом 'NYC'. Має велику кишеню-кенгуру та зручний об'ємний капюшон.",
    base_price: 1400,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/37_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/37_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 38,
    name: "Базове бежеве худі",
    description:
      "Універсальне худі теплого пісочного кольору. Лаконічний дизайн без зайвих деталей, що робить його незамінною базою у твоєму гардеробі.",
    base_price: 1250,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/38_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/38_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "Olive", hex: "#4B5320" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },
  {
    id: 39,
    name: "Худі шоколадного відтінку",
    description:
      "Затишне худі красивого коричневого кольору. Виконане з преміальної бавовни, яка чудово тримає форму та не кошлатиться після прання.",
    base_price: 1300,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_2w"],
    gender: "women",
    category: "Hoodies & Sweatshirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 40,
    name: "В'язаний светр з косами",
    description:
      "Теплий та затишний светр з фактурною в'язкою у вигляді кіс. Яскравий теракотовий колір додасть настрою у прохолодні дні, а якісна пряжа зігріє.",
    base_price: 1650,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_2w"],
    gender: "women",
    category: "Sweaters & Cardigans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Rust", hex: "#B7410E" },
          { name: "Beige", hex: "#D5B895" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 41,
    name: "Базовий гольф у рубчик",
    description:
      "Облягаючий гольф (водолазка) з високою горловиною з м'якого трикотажу в рубчик. Незамінна база для багатошарових образів під жакет або кардиган.",
    base_price: 950,
    has_discount: true,
    discount_percent: 10,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/41_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/41_2w"],
    gender: "women",
    category: "Sweaters & Cardigans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Gray", hex: "#808080" },
          { name: "Black", hex: "#000000" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 42,
    name: "Об'ємний светр грубої в'язки",
    description:
      "Стильний светр оверсайз глибокого смарагдового відтінку. Груба в'язка та вільний крій створюють максимально розслаблений і комфортний силует.",
    base_price: 1800,
    has_discount: true,
    discount_percent: 15,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/42_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/42_2w"],
    gender: "women",
    category: "Sweaters & Cardigans",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Emerald", hex: "#047857" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 43,
    name: "Світлий светр з високим горлом",
    description:
      "Елегантний білий светр з м'якої напіввовняної пряжі. Високий комір надійно захищає від вітру, а класичний колір легко поєднується з будь-яким низом.",
    base_price: 1450,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/43_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/43_2w"],
    gender: "women",
    category: "Sweaters & Cardigans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
  {
    id: 44,
    name: "Кардиган вільного крою кажан",
    description:
      "Легкий накидний кардиган теплого карамельного відтінку з рукавами 'кажан'. Ідеально підходить для створення багатошарових та затишних осінніх образів.",
    base_price: 1550,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/44_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/44_2w"],
    gender: "women",
    category: "Sweaters & Cardigans",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Camel", hex: "#C19A6B" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },
  {
    id: 45,
    name: "Тепла мідіспідниця в клітинку",
    description:
      "Стильна спідниця довжини міді з класичним картатим принтом. Ідеально підходить для створення затишних осінніх образів у поєднанні з об'ємними светрами та черевиками.",
    base_price: 1350,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/45_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/45_2w"],
    gender: "women",
    category: "Skirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Olive", hex: "#4B5320" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 46,
    name: "Чорна спідниця плісе",
    description:
      "Базова коротка спідниця в складку (теніска). Трендова та універсальна модель, яка чудово комбінується як з кросівками, так і з масивним взуттям.",
    base_price: 950,
    has_discount: true,
    discount_percent: 10,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/46_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/46_2w"],
    gender: "women",
    category: "Skirts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 47,
    name: "Спідниця А-силуету з геометричним принтом",
    description:
      "Ефектна спідниця середньої довжини з оригінальним візерунком. Щільна тканина добре тримає форму, а завищена талія гармонійно підкреслює фігуру.",
    base_price: 1450,
    has_discount: true,
    discount_percent: 15,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/47_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/47_2w"],
    gender: "women",
    category: "Skirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
  {
    id: 48,
    name: "Синя максіспідниця",
    description:
      "Довга спідниця вільного крою класичного синього відтінку. Створює жіночний і розслаблений силует, ідеальний вибір для літніх прогулянок чи відпустки.",
    base_price: 1600,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/48_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/48_2w"],
    gender: "women",
    category: "Skirts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Blue", hex: "#3E7B9D" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
  {
    id: 49,
    name: "Світла мініспідниця прямого крою",
    description:
      "Елегантна коротка спідниця приємного молочного відтінку. Лаконічний дизайн робить її ідеальною базою для вечірніх або стильних повсякденних луків.",
    base_price: 1100,
    has_discount: true,
    discount_percent: 20,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/49_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/49_2w"],
    gender: "women",
    category: "Skirts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 50,
    name: "Сукня міді в горошок",
    description:
      "Жіночна сукня міді з класичним принтом у горошок. Облягаючий крій чудово підкреслює фігуру, створюючи елегантний та романтичний образ для побачень чи свят.",
    base_price: 1400,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/50_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/50_2w"],
    gender: "women",
    category: "Dresses",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Brown", hex: "#8B4513" },
          { name: "Black", hex: "#000000" },
          { name: "Red", hex: "#DC2626" },
        ],
      ),
    ],
  },
  {
    id: 51,
    name: "Синя сукня міді з принтом",
    description:
      "Легка сукня глибокого синього кольору з дрібним принтом. Пояс вигідно підкреслює талію, роблячи силует витонченим і гармонійним.",
    base_price: 1550,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/51_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/51_2w"],
    gender: "women",
    category: "Dresses",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Navy", hex: "#1E3A8A" },
          { name: "Black", hex: "#000000" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
  {
    id: 52,
    name: "Чорна трикотажна сукня з розрізом",
    description:
      "Елегантна облягаюча сукня максі з довгими рукавами та спокусливим розрізом на нозі. Ідеальний базовий вибір для вечірнього виходу або особливої події.",
    base_price: 1800,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/52_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/52_2w"],
    gender: "women",
    category: "Dresses",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Burgundy", hex: "#722F37" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 53,
    name: "Базова чорна сукня з поясом",
    description:
      "Класична чорна сукня довжини міді. Універсальний фасон з поясом та довгим рукавом, що ідеально підійде як для офісу, так і для ділової зустрічі.",
    base_price: 1650,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/53_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/53_2w"],
    gender: "women",
    category: "Dresses",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
  {
    id: 54,
    name: "Біла літня сукня максі",
    description:
      "Легка та повітряна сукня максі на бретелях. Вільний крій та натуральна тканина роблять її ідеальною для спекотних літніх днів та прогулянок набережною.",
    base_price: 1900,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/54_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/54_2w"],
    gender: "women",
    category: "Dresses",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
  {
    id: 55,
    name: "Коротка сукня в стилі бохо",
    description:
      "Стильна біла мінісукня вільного крою з широкими рукавами. Чудовий вибір для пляжного відпочинку та створення розслаблених літніх образів.",
    base_price: 1450,
    has_discount: true,
    discount_percent: 15,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/55_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/55_2w"],
    gender: "women",
    category: "Dresses",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Mustard", hex: "#EAB308" },
        ],
      ),
    ],
  },
  {
    id: 56,
    name: "Повітряна сукня А-силуету",
    description:
      "Ніжна сукня світлого молочного відтінку вільного А-силуету. Легка тканина гарно струменить при ходьбі, додаючи вашому образу невимушеної романтичності.",
    base_price: 1700,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/56_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/56_2w"],
    gender: "women",
    category: "Dresses",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Beige", hex: "#D5B895" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 57,
    name: "Джинсові мінішорти",
    description:
      "Класичні джинсові шорти світло-блакитного кольору з високою посадкою. Незамінна база для спекотних літніх днів, яка ідеально поєднується з будь-якими топами та футболками.",
    base_price: 950,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/57_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/57_2w"],
    gender: "women",
    category: "Shorts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Blue", hex: "#3E7B9D" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 58,
    name: "Спортивні велосипедки",
    description:
      "Зручні облягаючі велосипедки світло-сірого кольору з високою талією. Чудовий вибір для активного відпочинку, тренувань або створення трендових стрітстайл-образів з оверсайз-футболками.",
    base_price: 650,
    has_discount: true,
    discount_percent: 15,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/58_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/58_2w"],
    gender: "women",
    category: "Shorts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Gray", hex: "#808080" },
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
  {
    id: 59,
    name: "Легкі бавовняні шорти",
    description:
      "Вільні білі шорти на еластичній резинці зі шнурком. Виготовлені з дихаючої натуральної тканини, що гарантує максимальний комфорт під час літньої спеки.",
    base_price: 800,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/59_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/59_2w"],
    gender: "women",
    category: "Shorts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 60,
    name: "Трикотажні мінішорти",
    description:
      "М'які та приємні до тіла короткі трикотажні шорти ніжного рожевого відтінку. Ідеальні для пляжних прогулянок, відпустки або комфортного домашнього відпочинку.",
    base_price: 700,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/60_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/60_2w"],
    gender: "women",
    category: "Shorts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Pink", hex: "#E79E9E" },
          { name: "Beige", hex: "#D5B895" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
  {
    id: 61,
    name: "Джогери з камуфляжним принтом",
    description:
      "Зручні спортивні штани-джогери з трендовим камуфляжним принтом. Еластичний пояс та манжети забезпечують надійну посадку для активних тренувань або прогулянок.",
    base_price: 1150,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/61_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/61_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Olive", hex: "#4B5320" },
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 62,
    name: "Чорні спортивні джогери",
    description:
      "Базові чорні спортивні штани вільного крою. Ідеально підходять для занять спортом, активного відпочинку чи комфортного повсякденного носіння.",
    base_price: 950,
    has_discount: true,
    discount_percent: 15,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/62_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/62_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 63,
    name: "Класичні брюки вільного крою",
    description:
      "Елегантні жіночі брюки приємного рожевого відтінку. Прямий крій та висока посадка чудово підкреслюють фігуру та підходять як для офісу, так і для кежуал образів.",
    base_price: 1450,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/63_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/63_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Pink", hex: "#E79E9E" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 64,
    name: "Спортивні штани з лампасами",
    description:
      "Стильні чорні штани з контрастними білими лампасами з боків. Візуально подовжують ноги та додають динаміки у твій стрітстайл образ.",
    base_price: 1100,
    has_discount: true,
    discount_percent: 10,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/64_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/64_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Red", hex: "#DC2626" },
        ],
      ),
    ],
  },
  {
    id: 65,
    name: "Базові чорні легінси",
    description:
      "Універсальні безшовні легінси з високою талією. Еластична тканина ідеально облягає фігуру, не просвічує та забезпечує комфорт під час фітнесу або йоги.",
    base_price: 850,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/65_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/65_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
  {
    id: 66,
    name: "Штани карго з кишенями",
    description:
      "Трендові штани карго оливкового кольору з накладними кишенями. Вільний крій та міцна тканина роблять їх ідеальним вибором для активного міського життя.",
    base_price: 1600,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/66_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/66_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Olive", hex: "#4B5320" },
          { name: "Beige", hex: "#D5B895" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 67,
    name: "Темні штани-джогери карго",
    description:
      "Практичні та стильні джогери темно-сірого кольору. Поєднують у собі комфорт спортивних штанів та функціональність карго завдяки додатковим боковим кишеням.",
    base_price: 1550,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/67_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/67_2w"],
    gender: "women",
    category: "Pants & Leggings",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Gray", hex: "#808080" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
  {
    id: 68,
    name: "Легкий топ без рукавів",
    description:
      "Базовий топ вільного крою приємного ніжно-рожевого відтінку. Ідеальний вибір для спекотних літніх днів, чудово поєднується з шортами, спідницями та світлими джинсами.",
    base_price: 650,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/68_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/68_2w"],
    gender: "women",
    category: "T-shirts & Tank Tops",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Pink", hex: "#E79E9E" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
  {
    id: 69,
    name: "Укорочена футболка з кантом",
    description:
      "Стильна кроп-футболка білого кольору з яскравим червоним кантом у ретро-стилі. Чудово підкреслює талію і пасує до деніму з високою посадкою.",
    base_price: 750,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/69_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/69_2w"],
    gender: "women",
    category: "T-shirts & Tank Tops",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Red", hex: "#DC2626" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 70,
    name: "Базова бавовняна футболка",
    description:
      "Класична біла футболка прямого крою з натуральної бавовни. Абсолютний мастхев базового гардероба, який стане ідеальною основою для безлічі повсякденних образів.",
    base_price: 800,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/70_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/70_2w"],
    gender: "women",
    category: "T-shirts & Tank Tops",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
  {
    id: 71,
    name: "Спортивна футболка реглан",
    description:
      "Зручна футболка у спортивному стилі з контрастними чорними рукавами та акцентним принтом спереду. Відмінно підійде для активного відпочинку чи тренувань на свіжому повітрі.",
    base_price: 900,
    has_discount: true,
    discount_percent: 15,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/71_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/71_2w"],
    gender: "women",
    category: "T-shirts & Tank Tops",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
  {
    id: 72,
    name: "Рожева блуза з квітковим принтом",
    description:
      "Жіночна блуза приємного рожевого кольору з ніжним квітковим візерунком. Зав'язка на шиї у вигляді банта додає романтичності та вишуканості твоєму образу.",
    base_price: 1250,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/72_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/72_2w"],
    gender: "women",
    category: "Blouses & Shirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Pink", hex: "#E79E9E" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
  {
    id: 73,
    name: "Класична біла сорочка",
    description:
      "Базова біла сорочка прямого крою з довгим рукавом. Абсолютний мастхев ділового гардероба, який також чудово поєднується з джинсами для створення розслабленого кежуал-луку.",
    base_price: 1100,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/73_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/73_2w"],
    gender: "women",
    category: "Blouses & Shirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Light Blue", hex: "#93C5FD" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 74,
    name: "Шовкова блуза без рукавів",
    description:
      "Елегантна блуза без рукавів ніжного молочного відтінку. Струмлива тканина з легким блиском робить її ідеальним вибором для офісу або вечірніх виходів у теплу пору року.",
    base_price: 950,
    has_discount: true,
    discount_percent: 10,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/74_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/74_2w"],
    gender: "women",
    category: "Blouses & Shirts",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
  {
    id: 75,
    name: "Блуза з об'ємними рукавами",
    description:
      "Витончена блуза кремового відтінку з класичним коміром та злегка об'ємними рукавами на манжетах. Додасть шарму та жіночності вашому повсякденному чи святковому образу.",
    base_price: 1350,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/75_1w", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/75_2w"],
    gender: "women",
    category: "Blouses & Shirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "White", hex: "#FFFFFF" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },

  // --MEN--

    {
    id: 76,
    name: "Beachwear Item 76",
    description: "Детальний опис цього чудового товару...",
    base_price: 1150,
    has_discount: false,
    discount_percent: 0,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/1_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/1_2m"],
    gender: "men",
    category: "Beachwear",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 77,
    name: "Beachwear Item 77",
    description: "Детальний опис цього чудового товару...",
    base_price: 1190,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/2_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/2_2m"],
    gender: "men",
    category: "Beachwear",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
    {
    id: 78,
    name: "Beachwear Item 78",
    description: "Детальний опис цього чудового товару...",
    base_price: 990,
    has_discount: true,
    discount_percent: 11,
    rating: 4,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/3_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/3_2m"],
    gender: "men",
    category: "Beachwear",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Cardinal", hex: "#a20818" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
    {
    id: 79,
    name: "Coats Item 79",
    description: "Детальний опис цього чудового товару...",
    base_price: 7450,
    has_discount: true,
    discount_percent: 15,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/4_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/4_2m"],
    gender: "men",
    category: "Coats",
    collections: [],
    variants: [
      ...generateVariants(
        ["M", "L", "XL"],
        [
          { name: "Saddle Brown", hex: "#8a5529" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
    {
    id: 80,
    name: "Coats Item 80",
    description: "Детальний опис цього чудового товару...",
    base_price: 4010,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/5_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/5_2m"],
    gender: "men",
    category: "Coats",
    collections: [],
    variants: [
      ...generateVariants(
        ["L", "XL", "XXL"],
        [
          { name: "Dark Pine", hex: "#0e1e18" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
    {
    id: 81,
    name: "Coats Item 81",
    description: "Детальний опис цього чудового товару...",
    base_price: 6650,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/6_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/6_2m"],
    gender: "men",
    category: "Coats",
    collections: [],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S", "M"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },
    {
    id: 82,
    name: "Hoodies and Sweatshirt Item 82",
    description: "Детальний опис цього чудового товару...",
    base_price: 1850,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/7_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/7_2m"],
    gender: "men",
    category: "Hoodies & Sweatshirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Harvest Gold", hex: "#c28100" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },
    {
    id: 83,
    name: "Hoodies and Sweatshirt Item 83",
    description: "Детальний опис цього чудового товару...",
    base_price: 1690,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/8_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/8_2m"],
    gender: "men",
    category: "Hoodies & Sweatshirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
    {
    id: 84,
    name: "Outerwear Item 84",
    description: "Детальний опис цього чудового товару...",
    base_price: 4150,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/9_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/9_2m"],
    gender: "men",
    category: "Outerwear",
    collections: [],
    variants: [
      ...generateVariants(
        ["M", "L", "XL", "XXL"],
        [
          { name: "Warm Gray", hex: "#947a6c" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
    {
    id: 85,
    name: "Outerwear Item 85",
    description: "Детальний опис цього чудового товару...",
    base_price: 3050,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/10_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/10_2m"],
    gender: "men",
    category: "Outerwear",
    collections: [],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S"],
        [
          { name: "Desert Sand", hex: "#ae9387" },
          { name: "Mustard", hex: "#EAB308" },
        ],
      ),
    ],
  },
    {
    id: 86,
    name: "Shirts Item 86",
    description: "Детальний опис цього чудового товару...",
    base_price: 1050,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/11_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/11_2m"],
    gender: "men",
    category: "Shirts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Pale Gray", hex: "#809696" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 87,
    name: "Shirts Item 87",
    description: "Детальний опис цього чудового товару...",
    base_price: 1390,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/12_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/12_2m"],
    gender: "men",
    category: "Shirts",
    collections: [],
    variants: [
      ...generateVariants(["S", "M", "L"], [
          { name: "Tiara", hex: "#bed0d2" },
          { name: "Black", hex: "#000000" },
        ]),
    ],
  },
    {
    id: 88,
    name: "Shirts Item 88",
    description: "Детальний опис цього чудового товару...",
    base_price: 1160,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/13_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/13_2m"], //, "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/13_3m"
    gender: "men",
    category: "Shirts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["M", "L", "XL"],
        [
          { name: "Golden Sand", hex: "#d8b54e" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
    {
    id: 89,
    name: "Suits and Blazers Item 89",
    description: "Детальний опис цього чудового товару...",
    base_price: 5880,
    has_discount: true,
    discount_percent: 40,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/14_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/14_2m"],
    gender: "men",
    category: "Suits & Blazers",
    collections: [],
    variants: [
      ...generateVariants(
        ["L", "XL", "XXL"],
        [
          { name: "Maroon", hex: "#762d3a" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
    {
    id: 90,
    name: "Suits and Blazers Item 90",
    description: "Детальний опис цього чудового товару...",
    base_price: 5630,
    has_discount: true,
    discount_percent: 17,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/15_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/15_2m"],
    gender: "men",
    category: "Suits & Blazers",
    collections: [],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S", "M"],
        [
          { name: "Teal Blue", hex: "#1d2a32" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
    {
    id: 91,
    name: "Suits and Blazers Item 91",
    description: "Детальний опис цього чудового товару...",
    base_price: 5690,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/16_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/16_2m"],
    gender: "men",
    category: "Suits & Blazers",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },
    {
    id: 92,
    name: "Sweater Item 92",
    description: "Детальний опис цього чудового товару...",
    base_price: 1810,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/17_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/17_2m"],
    gender: "men",
    category: "Sweaters",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Dusty Slate", hex: "#595e70" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
    {
    id: 93,
    name: "Sweater Item 93",
    description: "Детальний опис цього чудового товару...",
    base_price: 2080,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/18_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/18_2m"],
    gender: "men",
    category: "Sweaters",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["M", "L", "XL", "XXL"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
    {
    id: 94,
    name: "Sweater Item 94",
    description: "Детальний опис цього чудового товару...",
    base_price: 1350,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/19_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/19_2m"],
    gender: "men",
    category: "Sweaters",
    collections: [],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S"],
        [
          { name: "Reddish Brown", hex: "#965007" },
          { name: "Red", hex: "#DC2626" },
        ],
      ),
    ],
  },
    {
    id: 95,
    name: "T-shirts and Polos Item 95",
    description: "Детальний опис цього чудового товару...",
    base_price: 950,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_2m"], //, "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_3m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/20_4m"
    gender: "men",
    category: "T-shirts & Polos",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 96,
    name: "T-shirts and Polos Item 96",
    description: "Детальний опис цього чудового товару...",
    base_price: 650,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/21_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/21_2m"],
    gender: "men",
    category: "T-shirts & Polos",
    collections: ["summer"],
    variants: [
      ...generateVariants(["S", "M", "L"], [
          { name: "White", hex: "#ffffff" },
          { name: "Gray", hex: "#808080" },
        ]),
    ],
  },
    {
    id: 97,
    name: "T-shirts and Polos Item 97",
    description: "Детальний опис цього чудового товару...",
    base_price: 940,
    has_discount: true,
    discount_percent: 10,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/22_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/22_2m"],
    gender: "men",
    category: "T-shirts & Polos",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["M", "L", "XL"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
    {
    id: 98,
    name: "T-shirts and Polos Item 98",
    description: "Детальний опис цього чудового товару...",
    base_price: 1050,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_2m"], //, "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_3m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_4m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/23_5m"
    gender: "men",
    category: "T-shirts & Polos",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["L", "XL", "XXL"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
    {
    id: 99,
    name: "T-shirts and Polos Item 99",
    description: "Детальний опис цього чудового товару...",
    base_price: 690,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/24_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/24_2m"], //, "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/24_3m"
    gender: "men",
    category: "T-shirts & Polos",
    collections: ["summer"],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S", "M"],
        [
          { name: "Limed Ash", hex: "#727862" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
    {
    id: 100,
    name: "Jeans Item 100",
    description: "Детальний опис цього чудового товару...",
    base_price: 2350,
    has_discount: true,
    discount_percent: 17,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/25_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/25_2m"],
    gender: "men",
    category: "Jeans",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
    {
    id: 101,
    name: "Jeans Item 101",
    description: "Детальний опис цього чудового товару...",
    base_price: 2390,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/26_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/26_2m"],
    gender: "men",
    category: "Jeans",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Mirage", hex: "#063461" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
    {
    id: 102,
    name: "Pants Item 102",
    description: "Детальний опис цього чудового товару...",
    base_price: 1290,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/27_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/27_2m"],
    gender: "men",
    category: "Pants",
    collections: [],
    variants: [
      ...generateVariants(
        ["M", "L", "XL", "XXL"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Red", hex: "#DC2626" },
        ],
      ),
    ],
  },
    {
    id: 103,
    name: "Pants Item 103",
    description: "Детальний опис цього чудового товару...",
    base_price: 1650,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/28_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/28_2m"],
    gender: "men",
    category: "Pants",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
    {
    id: 104,
    name: "Pants Item 104",
    description: "Детальний опис цього чудового товару...",
    base_price: 1220,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/29_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/29_2m"],
    gender: "men",
    category: "Pants",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Mustard", hex: "#EAB308" },
        ],
      ),
    ],
  },
    {
    id: 105,
    name: "Pants Item 105",
    description: "Детальний опис цього чудового товару...",
    base_price: 1200,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/30_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/30_2m"],
    gender: "men",
    category: "Pants",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 106,
    name: "Pants Item 106",
    description: "Детальний опис цього чудового товару...",
    base_price: 1200,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/31_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/31_2m"],
    gender: "men",
    category: "Pants",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 107,
    name: "Pants Item 107",
    description: "Детальний опис цього чудового товару...",
    base_price: 1790,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/33_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/33_2m"],
    gender: "men",
    category: "Pants",
    collections: [],
    variants: [
      ...generateVariants(
        ["M", "L", "XL"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 108,
    name: "Shorts Item 108",
    description: "Детальний опис цього чудового товару...",
    base_price: 900,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/34_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/34_2m"], //, "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/34_3m"
    gender: "men",
    category: "Shorts",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["L", "XL", "XXL"],
        [
          { name: "Warm Earthy Brown", hex: "#9a755a" },
          { name: "Light Blue", hex: "#93C5FD" },
        ],
      ),
    ],
  },
    {
    id: 109,
    name: "Shorts Item 109",
    description: "Детальний опис цього чудового товару...",
    base_price: 750,
    has_discount: true,
    discount_percent: 14,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/35_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/35_2m"],
    gender: "men",
    category: "Shorts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S", "M"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
    {
    id: 110,
    name: "Shorts Item 110",
    description: "Детальний опис цього чудового товару...",
    base_price: 860,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/36_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/36_2m"],
    gender: "men",
    category: "Shorts",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M", "L"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Olive", hex: "#4B5320" },
        ],
      ),
    ],
  },
    {
    id: 111,
    name: "Shorts Item 111",
    description: "Детальний опис цього чудового товару...",
    base_price: 1090,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/37_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/37_2m"],
    gender: "men",
    category: "Shorts",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L", "XL"],
        [
          { name: "Rust Red", hex: "#d20120" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
    {
    id: 112,
    name: "Socks Item 112",
    description: "Детальний опис цього чудового товару...",
    base_price: 390,
    has_discount: true,
    discount_percent: 14,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/38_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/38_2m"], //"https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/38_3m"
    gender: "men",
    category: "Socks",
    collections: [],
    variants: [
      ...generateVariants(
        ["M", "L", "XL", "XXL"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
    {
    id: 113,
    name: "Socks Item 113",
    description: "Детальний опис цього чудового товару...",
    base_price: 270,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_2m"], // "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_3m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/39_4m"]
    gender: "men",
    category: "Socks",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      ),
    ],
  },
    {
    id: 114,
    name: "Tracksuits Item 114",
    description: "Детальний опис цього чудового товару...",
    base_price: 2130,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_2m"], // "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_3m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_4m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/40_5m"],
    gender: "men",
    category: "Tracksuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["XS", "S", "M"],
        [
          { name: "Black", hex: "#000000" },
          { name: "Gray", hex: "#808080" },
        ],
      ),
    ],
  },
    {
    id: 115,
    name: "Tracksuits Item 115",
    description: "Детальний опис цього чудового товару...",
    base_price: 3050,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/41_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/41_2m"],
    gender: "men",
    category: "Tracksuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["S", "M", "L"],
        [
          { name: "Deep Blue", hex: "#0f233a" },
          { name: "Black", hex: "#000000" },
        ],
      ),
    ],
  },
    {
    id: 116,
    name: "Tracksuits Item 116",
    description: "Детальний опис цього чудового товару...",
    base_price: 2720,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/42_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/42_2m"],
    gender: "men",
    category: "Tracksuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["M", "L", "XL"],
        [
          { name: "Lite Green", hex: "#01904a" },
          { name: "Beige", hex: "#D5B895" },
        ],
      ),
    ],
  },
    {
    id: 117,
    name: "Tracksuits Item 117",
    description: "Детальний опис цього чудового товару...",
    base_price: 1930,
    has_discount: true,
    discount_percent: 20,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/43_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/43_2m"],
    gender: "men",
    category: "Tracksuits",
    collections: [],
    variants: [
      ...generateVariants(
        ["L", "XL", "XXL"],
        [
          { name: "Black", hex: "#000000" },
          { name: "White", hex: "#FFFFFF" },
        ],
      ),
    ],
  },
    {
    id: 118,
    name: "Tracksuits Item 118",
    description: "Детальний опис цього чудового товару...",
    base_price: 2220,
    has_discount: false,
    discount_percent: 0,
    rating: 5,
    images: ["https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/44_1m", "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_800/v1/wearhouse/products/44_2m"],
    gender: "men",
    category: "Tracksuits",
    collections: ["new"],
    variants: [
      ...generateVariants(
        ["XXS", "XS", "S", "M"],
        [
          { name: "White", hex: "#ffffff" },
          { name: "Brown", hex: "#8B4513" },
        ],
      ),
    ],
  },
];
