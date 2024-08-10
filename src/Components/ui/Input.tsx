interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: Iprops) => {
  return (
    <input
      className="border border-gray-600 rounded-lg p-2 shadow-md focus:outline-0 focus:border-green-500 focus:ring-2"
      {...rest}
    />
  );
};
export default Input;
