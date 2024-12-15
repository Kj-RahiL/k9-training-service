export type TProduct = {
  name: string;
  price: number;
  size: 'S' | 'M' | 'L'| 'XL' | 'XXL' ;
  color:'black' | 'white' | 'green' | 'orange';
  quantity: number;
  description: string;
};