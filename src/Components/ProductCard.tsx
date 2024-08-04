import { useEffect, useState } from "react";
import ColorProduct from "./ColorProduct";
import ContentProduct from "./ContentProduct";
// import { TextSlicer } from "./functions/Functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {}

const ProductCard = ({}: IProps) => {
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     fetch("https://fakestoreapi.com/products")
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }, []);
  return (
    <div className="flex flex-col gap-5">
      {/* IMAGE */}
      <Image
        imageSrc="https://placehold.co/1200x600"
        alt="producr image"
        className="rounded-xl "
      />
      {/* CONTENT */}
      <ContentProduct />
      {/* <p>{TextSlicer(txt)}</p> */}
      {/* COLOR */}
      <div className="colorProduct flex gap-3">
        <ColorProduct Color="bg-indigo-500" />
        <ColorProduct Color="bg-red-500" />
      </div>
      {/* PRICE */}
      <div className="price flex justify-between items-center ">
        <span>500$</span>
        <Image
          imageSrc="https://placehold.co/30x30"
          alt="producr image"
          className="rounded-full items-center "
        />
      </div>
      {/* BUTTONS */}
      <div className="flex gap-2 ">
        <Button className=" bg-indigo-500 ">Edit</Button>
        <Button className=" bg-red-500">Cancel</Button>
      </div>
    </div>
  );
};

export default ProductCard;
