export interface Iproduct {
  id: number; // or string, depending on your API
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface IformInput {
  id: string;
  name: string;
  label: string;
  type: string;
}
