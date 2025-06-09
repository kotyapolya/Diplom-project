export const categories = [
  { name: 'Піци' },
  { name: 'Сніданок' },
  { name: 'Закуски' },
  { name: 'Коктейлі' },
  { name: 'Напої' },
];

export const _ingredients = [
  {
    SKU: '400',
    name: 'Сирний бортик',
    price: 40,
    imageUrl:
      'https://i.postimg.cc/tCKTrkv9/17.png',
  },
  {
    SKU: '401',
    name: 'Вершкова моцарела',
    price: 35,
    imageUrl:
      'https://i.postimg.cc/x8K0BD4Y/18.png',
  },
  {
    SKU: '402',
    name: 'Сири чедер і пармезан',
    price: 40,
    imageUrl: 'https://i.postimg.cc/bvWTfN1J/image.png',
  },
  {
    SKU: '403',
    name: 'Гострий перець халапеньйо',
    price: 20,
    imageUrl:
      'https://i.postimg.cc/g2pwz4VN/19.png',
  },
  {
    SKU: '404',
    name: 'Ніжне курча',
    price: 35,
    imageUrl: 'https://i.postimg.cc/hvbbmL6z/image.png',
  },
  {
    SKU: '405',
    name: 'Шампіньйони',
    price: 20,
    imageUrl: 'https://i.postimg.cc/t4mdFCS5/image.png',
  },
  {
    SKU: '406',
    name: 'Шинка',
    price: 40,
    imageUrl: 'https://i.postimg.cc/8CJR4QxV/image.png',
  },
  {
    SKU: '407',
    name: 'Пікантна пепероні',
    price: 35,
    imageUrl: 'https://i.postimg.cc/5y18fHyx/image.png',
  },
  {
    SKU: '408',
    name: 'Гостра чорізо',
    price: 35,
    imageUrl: 'https://i.postimg.cc/vTzfTQx5/image.png',
  },
  {
    SKU: '409',
    name: 'Мариновані огірочки',
    price: 20,
    imageUrl: 'https://i.postimg.cc/NG71pxCL/image.png',
  },
  {
    SKU: '410',
    name: 'Свіжі томати',
    price: 25,
    imageUrl: 'https://i.postimg.cc/Fsr0qJwp/image.png',
  },
  {
    SKU: '411',
    name: 'Червона цибуля',
    price: 20,
    imageUrl: 'https://i.postimg.cc/qvgyBHJC/image.png',
  },
  {
    SKU: '412',
    name: 'Соковиті ананаси',
    price: 40,
    imageUrl: 'https://i.postimg.cc/8C6vWdrp/image.png',
  },
  {
    SKU: '413',
    name: 'Італійські трави',
    price: 15,
    imageUrl:
      'https://i.postimg.cc/9MPqgWps/image.png',
  },
  {
    SKU: '414',
    name: 'Солодкий перець',
    price: 25,
    imageUrl: 'https://i.postimg.cc/2yzLPP9y/image.png',
  },
  {
    SKU: '415',
    name: 'Кубики бринзи',
    price: 30,
    imageUrl: 'https://i.postimg.cc/05fwpyrw/image.png',
  },
  {
    SKU: '416',
    name: 'Мітболи',
    price: 30,
    imageUrl:
      'https://i.postimg.cc/CKXS1xyS/20.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    SKU: '201',
    name: 'Омлет з шинкою та грибами',
    imageUrl: 'https://i.postimg.cc/Hx6DfWpQ/5.webp',
    categoryId: 2,
   // price: 85,
  },
  {
    SKU: '202',
    name: 'Омлет з пепероні',
    imageUrl: 'https://i.postimg.cc/Wpfc84YV/6.webp',
    categoryId: 2,
   // price: 120,
  },
  {
    SKU: '103',
    name: 'Кава Латте',
    imageUrl: 'https://i.postimg.cc/cJTbJDVW/8.webp',
    categoryId: 2,
   // price: 60,
  },
  {
    SKU: '200',
    name: 'Сендвіч шинка і сир',
    imageUrl: 'https://i.postimg.cc/C560fhXF/3.webp',
    categoryId: 3,
   // price: 115,
  },
  {
    SKU: '303',
    name: 'Курячі нагетси (6 шт)',
    imageUrl: 'https://i.postimg.cc/J4fVw2Wd/7.webp',
    categoryId: 3,
   // price: 110,
  },
  {
    SKU: '304',
    name: 'Запечена картопля з соусом 🌱',
    imageUrl: 'https://i.postimg.cc/kGNjkfNL/13.webp',
    categoryId: 3,
   // price: 85,
  },
  {
    SKU: '305',
    name: 'Донер класичний',
    imageUrl: 'https://i.postimg.cc/DZL5XBNm/14.webp',
    categoryId: 3,
   // price: 130,
  },
  {
    SKU: '306',
    name: 'Гострий Донер',
    imageUrl: 'https://i.postimg.cc/52QzyjT2/15.webp',
    categoryId: 3,
   // price: 130,
  },
  {
    SKU: '107',
    name: 'Банановий молочний коктейль',
    imageUrl: 'https://i.postimg.cc/7hk3GfMM/1.png',
    categoryId: 4,
   // price: 85,
  },
  {
    SKU: '102',
    name: 'Карамельне яблуко молочний коктейль',
    imageUrl: 'https://i.postimg.cc/zBnWrqZL/2.png',
    categoryId: 4,
   // price: 65,
  },
  {
    SKU: '100',
    name: 'Молочний коктейль з печивом Oreo',
    imageUrl: 'https://i.postimg.cc/RVPt9P8T/4.png',
    categoryId: 4,
   // price: 85,
  },
  {
    SKU: '101',
    name: 'Класичний молочний коктейль ',
    imageUrl: 'https://i.postimg.cc/gjsZx40m/3.png',
    categoryId: 4,
   // price: 65,
  },
  {
    SKU: '108',
    name: 'Ірландський капучино',
    imageUrl: 'https://i.postimg.cc/nL8DDpfY/16.webp',
    categoryId: 5,
   // price: 90,
  },
  {
    SKU: '105',
    name: 'Кава Карамельний капучино',
    imageUrl: 'https://i.postimg.cc/5NqGGNnj/11.webp',
    categoryId: 5,
   // price: 75,
  },
  {
    SKU: '104',
    name: 'Латте на кокосовому молоці',
    imageUrl: 'https://i.postimg.cc/pLvvh615/10.webp',
    categoryId: 5,
   // price: 85,
  },
  {
    SKU: '106',
    name: 'Кава Американо',
    imageUrl: 'https://i.postimg.cc/25JXvq89/12.webp',
    categoryId: 5,
   // price: 55,
  },
];
