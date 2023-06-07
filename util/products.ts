export const products = [
  {
    id: 1,
    name: 'Daytona Rainbow',
    price: 637329,
    brand: ' Rolex  ',
    imageURL: '/images/products/rolex.png',
  },
  {
    id: 2,
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
