export const mobileMenuItems = [
  { to: '/', label: 'ГОЛОВНА' },
  {
    label: 'SALE',
    red: true,
    subItems: [
      { to: '/shop/sale?gender=women', label: 'Для неї' },
      { to: '/shop/sale?gender=men', label: 'Для нього' },
    ]
  },
  {
    label: 'SUMMER',
    subItems: [
      { to: '/shop/women?gender=women&collection=summer', label: 'Для неї' },
      { to: '/shop/men?gender=men&collection=summer', label: 'Для нього' },
    ]
  },
  {
    label: 'НОВИНКИ',
    subItems: [
      { to: '/shop/women?gender=women&collection=new', label: 'Для неї' },
      { to: '/shop/men?gender=men&collection=new', label: 'Для нього' },
    ]
  },
  {
    label: 'ЖІНКИ',
    sections: [
      {
        title: 'Новинки',
        links: [
          { to: '/shop/women?gender=women&collection=new', label: 'Всі новинки', highlight: true },
          { to: '/shop/women?gender=women&collection=new&category=Tracksuits', label: 'Спортивні костюми' },
          { to: '/shop/women?gender=women&collection=new&category=Pants%20%26%20Leggings', label: 'Штани та легінси' },
          { to: '/shop/women?gender=women&collection=new&category=Blouses%20%26%20Shirts', label: 'Блузки та сорочки' },
          { to: '/shop/women?gender=women&collection=new&category=Dresses', label: 'Сукні' },
          { to: '/shop/women?gender=women&collection=new&category=Sweaters%20%26%20Cardigans', label: 'Светри та кардигани' },
          { to: '/shop/women?gender=women&collection=new&category=Jackets%20%26%20Vests', label: 'Піджаки та жилетки' },
          { to: '/shop/women?gender=women&collection=new&category=Outerwear', label: 'Верхній одяг' },
          { to: '/shop/women?gender=women&collection=new&category=Hoodies%20%26%20Sweatshirts', label: 'Кофти' },
          { to: '/shop/women?gender=women&collection=new&category=Co-ords', label: 'Комплекти' },
          { to: '/shop/women?gender=women&collection=new&category=Jeans', label: 'Джинси' }
        ]
      },
      {
        title: 'Сезонні',
        links: [
          { to: '/shop/women?gender=women&collection=summer', label: 'Всі сезонні', highlight: true },
          { to: '/shop/women?gender=women&collection=summer&category=Tracksuits', label: 'Спортивні костюми' },
          { to: '/shop/women?gender=women&collection=summer&category=Pants%20%26%20Leggings', label: 'Штани та легінси' },
          { to: '/shop/women?gender=women&collection=summer&category=Shorts', label: 'Шорти' },
          { to: '/shop/women?gender=women&collection=summer&category=T-shirts%20%26%20Tank%20Tops', label: 'Футболки і майки' },
          { to: '/shop/women?gender=women&collection=summer&category=Blouses%20%26%20Shirts', label: 'Блузки та сорочки' },
          { to: '/shop/women?gender=women&collection=summer&category=Dresses', label: 'Сукні' },
          { to: '/shop/women?gender=women&collection=summer&category=Skirts', label: 'Спідниці' },
          { to: '/shop/women?gender=women&collection=summer&category=Jackets%20%26%20Vests', label: 'Піджаки та жилетки' },
          { to: '/shop/women?gender=women&collection=summer&category=Co-ords', label: 'Комплекти' },
          { to: '/shop/women?gender=women&collection=summer&category=Jumpsuits', label: 'Комбінезони' },
          { to: '/shop/women?gender=women&collection=summer&category=Jeans', label: 'Джинси' }
        ]
      },
      {
        title: 'Одяг',
        links: [
          { to: '/shop/women', label: 'Всі товари', highlight: true },
          { to: '/shop/women?category=Tracksuits', label: 'Спортивні костюми' },
          { to: '/shop/women?category=Pants%20%26%20Leggings', label: 'Штани та легінси' },
          { to: '/shop/women?category=Shorts', label: 'Шорти' },
          { to: '/shop/women?category=Socks', label: 'Шкарпетки' },
          { to: '/shop/women?category=T-shirts%20%26%20Tank%20Tops', label: 'Футболки і майки' },
          { to: '/shop/women?category=Blouses%20%26%20Shirts', label: 'Блузки та сорочки' },
          { to: '/shop/women?category=Dresses', label: 'Сукні' },
          { to: '/shop/women?category=Skirts', label: 'Спідниці' },
          { to: '/shop/women?category=Sweaters%20%26%20Cardigans', label: 'Светри та кардигани' },
          { to: '/shop/women?category=Jackets%20%26%20Vests', label: 'Піджаки та жилетки' },
          { to: '/shop/women?category=Coats', label: 'Пальта' },
          { to: '/shop/women?category=Outerwear', label: 'Верхній одяг' },
          { to: '/shop/women?category=Hoodies%20%26%20Sweatshirts', label: 'Кофти' },
          { to: '/shop/women?category=Co-ords', label: 'Комплекти' },
          { to: '/shop/women?category=Jumpsuits', label: 'Комбінезони' },
          { to: '/shop/women?category=Jeans', label: 'Джинси' }
        ]
      }
    ]
  },
  {
    label: 'ЧОЛОВІКИ',
    sections: [
      {
        title: 'Новинки',
        links: [
          { to: '/shop/men?gender=men&collection=new', label: 'Всі новинки', highlight: true },
          { to: '/shop/men?gender=men&collection=new&category=Tracksuits', label: 'Спортивні костюми' },
          { to: '/shop/men?gender=men&collection=new&category=Pants', label: 'Штани' },
          { to: '/shop/men?gender=men&collection=new&category=Shorts', label: 'Шорти' },
          { to: '/shop/men?gender=men&collection=new&category=Socks', label: 'Шкарпетки' },
          { to: '/shop/men?gender=men&collection=new&category=Shirts', label: 'Сорочки' },
          { to: '/shop/men?gender=men&collection=new&category=Sweaters', label: 'Светри' },
          { to: '/shop/men?gender=men&collection=new&category=Hoodies%20%26%20Sweatshirts', label: 'Худі та кофти' }
        ]
      },
      {
        title: 'Сезонні',
        links: [
          { to: '/shop/men?gender=men&collection=summer', label: 'Всі сезонні', highlight: true },
          { to: '/shop/men?gender=men&collection=summer&category=T-shirts%20%26%20Polos', label: 'Футболки та поло' },
          { to: '/shop/men?gender=men&collection=summer&category=Beachwear', label: 'Пляжний одяг' }
        ]
      },
      {
        title: 'Одяг',
        links: [
          { to: '/shop/men', label: 'Всі товари', highlight: true },
          { to: '/shop/men?category=Tracksuits', label: 'Спортивні костюми' },
          { to: '/shop/men?category=Pants', label: 'Штани' },
          { to: '/shop/men?category=Shorts', label: 'Шорти' },
          { to: '/shop/men?category=Socks', label: 'Шкарпетки' },
          { to: '/shop/men?category=T-shirts%20%26%20Polos', label: 'Футболки та поло' },
          { to: '/shop/men?category=Shirts', label: 'Сорочки' },
          { to: '/shop/men?category=Sweaters', label: 'Светри' },
          { to: '/shop/men?category=Beachwear', label: 'Пляжний одяг' },
          { to: '/shop/men?category=Suits%20%26%20Blazers', label: 'Костюми та піджаки' },
          { to: '/shop/men?category=Coats', label: 'Пальта' },
          { to: '/shop/men?category=Outerwear', label: 'Верхній одяг' },
          { to: '/shop/men?category=Hoodies%20%26%20Sweatshirts', label: 'Худі та кофти' },
          { to: '/shop/men?category=Sets', label: 'Комплекти' },
          { to: '/shop/men?category=Jeans', label: 'Джинси' }
        ]
      }
    ]
  },
  { to: '/about', label: 'ПРО НАС' },
];