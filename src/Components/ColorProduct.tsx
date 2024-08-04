interface IProps {
  Color: string;
}

const ColorProduct = ({ Color }: IProps) => {
  return <span className={`w-6 h-6 rounded-full ${Color} cursor-pointer`} />;
};

export default ColorProduct;
