import { TextSlicer } from "./functions/Functions";
import { Iproduct } from "./Interfaces";
// import { Iproduct } from "./Interfaces";

interface IProps {
  product: Iproduct;
}

const ContentProduct = ({ product }: IProps) => {
  //   console.log(products);
  const productDescription = product.description;
  return (
    <div className="flex flex-col gap-2 text-start">
      <span className="text-2xl">{product.title}</span>
      <span>{TextSlicer(productDescription)}</span>
    </div>
  );
};

export default ContentProduct;
