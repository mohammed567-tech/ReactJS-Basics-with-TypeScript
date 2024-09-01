export interface Iproduct {
  id?: string | undefined; // or string, depending on your API
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: { name: string; imageURL: string };
}

export interface IformInput {
  id: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
  type: string;
}
export interface Icategory {
  id: string;
  name: string;
  imageURL: string;
}
