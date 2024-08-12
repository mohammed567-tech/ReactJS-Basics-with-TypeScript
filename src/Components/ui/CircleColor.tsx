import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
  Color: string;
}
const CircleColor = ({ Color, ...rest }: Iprops) => {
  return (
    <span
      className={` block h-5 w-5 rounded-full cursor-pointer `}
      style={{ backgroundColor: Color }}
      {...rest}
    />
  );
};
export default CircleColor;
