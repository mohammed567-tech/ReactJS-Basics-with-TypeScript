// import { useEffect, useState } from "react";

import ContentProduct from "./ContentProduct";
// import { TextSlicer } from "./functions/Functions";
import Image from "./Image";
import { Iproduct } from "./Interfaces";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";
// import Modal from "./ui/Modal";

interface IProps {
  product: Iproduct;
}

const ProductCard = ({ product }: IProps) => {
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
        imageSrc={product.imageURL}
        alt="producr image"
        className="rounded-xl "
      />
      {/* CONTENT */}
      <ContentProduct product={product} />
      {/* <p>{TextSlicer(txt)}</p> */}
      {/* COLOR */}
      <div className="colorProduct flex gap-3">
        {product.colors.map((color) => (
          <CircleColor Color={color} key={color} />
        ))}
      </div>
      {/* PRICE */}
      <div className="price flex justify-between items-center ">
        <span>{product.price}</span>
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
