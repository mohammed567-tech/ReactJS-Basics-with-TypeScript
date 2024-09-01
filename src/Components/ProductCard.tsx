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
  setProductToEdit: (product: Iproduct) => void;
  openEditModal: () => void;
  setProductToEditIndex: (index: number) => void;
  index: number;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  setProductToEditIndex,
  index,
}: IProps) => {
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIndex(index);
  };
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     fetch("https://fakestoreapi.com/products")
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }, []);
  return (
    <div className="flex flex-col gap-5 bg-white/50 p-2 rounded-lg shadow-md">
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
        <span>{product.price} $</span>
        <Image
          imageSrc={product.category.imageURL}
          alt="producr image"
          className="rounded-full items-center "
        />
      </div>
      {/* BUTTONS */}
      <div className="flex gap-2 ">
        <Button className=" bg-indigo-500 " onClick={onEdit}>
          Edit
        </Button>
        <Button className=" bg-red-500">Cancel</Button>
      </div>
    </div>
  );
};

export default ProductCard;
