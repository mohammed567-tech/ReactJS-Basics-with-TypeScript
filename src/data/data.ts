import { Icategory, IformInput, Iproduct } from "../Components/Interfaces";
import { v4 as uuid } from "uuid";
export const Products: Iproduct[] = [
  {
    id: uuid(),
    title: "car11",
    description: "car car car car1 ",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
  {
    id: uuid(),
    title: "car2",
    description: "car car car car2 ",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
  {
    id: uuid(),
    title: "car3",
    description: "car car car car3 ",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
  {
    id: uuid(),
    title: "car4",
    description: "car car car car4 ",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
  {
    id: uuid(),
    title: "car5",
    description: "car car car car5 ",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
  {
    id: uuid(),
    title: "car6",
    description: "car car car car6 ",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
  {
    id: uuid(),
    title: "car7",
    description: "car car car car 7",
    imageURL: "https://placehold.co/1200x600",
    price: "40",
    colors: ["#6D5FA1", "#7F7CF0", "#7D0764"],
    category: { name: "car", imageURL: "https://placehold.co/30x30" },
  },
];
export const FormInputsList: IformInput[] = [
  {
    id: "title",
    name: "title",
    label: "Product Title",
    type: "text",
  },

  {
    id: "description",
    name: "description",
    label: "Product Description",
    type: "text",
  },
  {
    id: "image",
    name: "imageURL",
    label: "Product image",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "Product Price",
    type: "text",
  },
];
export const Colors: string[] = [
  "#6D5FA1",
  "#7F7CF0",
  "#7D0764",
  "#513D78",
  "#320C9F",
  "#326496",
  "#A146BE",
  "#71A2D2",
  "#0D0C25",
  "#9A88CA",
  "#C6B0F6",
  "#048E52",
  "#40B7F7",
  "#5B9E67",
];
export const Category: Icategory[] = [
  {
    id: uuid(),
    name: "car",
    imageURL: "https://picsum.photos/id/1/30/30",
  },
  {
    id: uuid(),
    name: "machine",
    imageURL: "https://picsum.photos/id/2/30/30",
  },
  {
    id: uuid(),
    name: "coffe",
    imageURL: "https://picsum.photos/id/3/30/30",
  },
  {
    id: uuid(),
    name: "motsycle",
    imageURL: "https://picsum.photos/id/4/30/30",
  },
  {
    id: uuid(),
    name: "t-shirt",
    imageURL: "https://picsum.photos/id/5/30/30",
  },
];
