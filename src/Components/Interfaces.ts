export interface Iproduct {
  id?: number; // or string, depending on your API
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: { name: string; imageUrl: string };
}

export interface IformInput {
  id: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
  type: string;
}
