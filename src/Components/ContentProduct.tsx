import { TextSlicer } from "./functions/Functions";
// import { Iproduct } from "./Interfaces";

interface IProps {}

const ContentProduct = ({}: IProps) => {
  //   console.log(products);
  return (
    <div className="flex flex-col gap-2 text-start">
      <span className="text-2xl">title</span>
      <span>
        {TextSlicer(
          " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nemomollitia? Saepe minima adipisci ullam aut quia, magni reiciendisdoloremque veritatis architecto quasi, quidem delectus recusandae eaquefugiat, beatae repudiandae."
        )}
      </span>
    </div>
  );
};

export default ContentProduct;
