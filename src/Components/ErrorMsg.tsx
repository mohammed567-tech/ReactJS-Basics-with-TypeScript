interface Iprops {
  msg: string;
}
const ErrorMsg = ({ msg }: Iprops) => {
  return msg ? (
    <span className=" block font-bold text-red-500 text-xs">{msg}</span>
  ) : null;
};
export default ErrorMsg;
