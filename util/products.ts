export const products = [
  {
    id: 1,
    name: 'Manual Winding Tourbillon Alain Prost Carbon',
    price: 1727500,
    brand: ' Richard Mille ',
    imageURL: '/images/products/alain_prost.png',
  },
  {
    id: 2,
    name: 'Royal Oak Tourbillon',
    price: 1192590,
    brand: 'Audemars Piguet ',
    imageURL: '/images/products/royal_oak.png',
  },
  {
    id: 3,
    name: 'Classique Complications',
    price: 1098615,
    brand: ' Breguet  ',
    imageURL: '/images/products/classique_complications.png',
  },
  {
    id: 4,
    name: '765LT Spider',
    price: 611843,
    brand: ' McLaren  ',
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
