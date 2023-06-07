export const products = [
  {
    id: 1,
    name: 'Royal Oak Frosted Gold Double Balance...',
    price: 890520,
    brand: 'Audemars Piguet',
    imageURL: '/images/products/openworked.png',
  },
  {
    id: 2,
    name: 'Astronomia Clarity',
    price: 600000,
    brand: 'Jacob & CO ',
    imageURL: '/images/products/astronomia.png',
  },
  {
    id: 3,
    name: 'Daytona Rainbow',
    price: 637329,
    brand: ' Rolex  ',
    imageURL: '/images/products/rolex.png',
  },
  {
    id: 4,
    name: '765LT Spider',
    price: 611843,
    brand: 'McLaren',
    imageURL: '/images/products/spider_hd.png',
  },
];

export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  brand: string;
  imageURL: string;
}
