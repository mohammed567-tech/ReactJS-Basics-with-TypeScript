import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import Button from "./Components/ui/Button";
import { Colors, FormInputsList, Products } from "./data/data";
import Input from "./Components/ui/Input";
import { Iproduct } from "./Components/Interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./Components/ErrorMsg";
import CircleColor from "./Components/ui/CircleColor";
import { v4 as uuid } from "uuid";

function App() {
  const defualtProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageUrl: "" },
  };
  const [productList, setProductList] = useState<Iproduct[]>(Products);
  const defaultErrs = { title: "", description: "", imageURL: "", price: "" };
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Iproduct>(defualtProductObj);
  const [errors, serErrors] = useState(defaultErrs);
  const [tempColor, setTempColor] = useState<string[]>([]);

  const open = () => {
    setIsOpen(true);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    serErrors({ ...errors, [name]: "" });
  };
  // console.log(tempColor);
  const closeModal = () => {
    setIsOpen(false);
  };
  const onCancel = () => {
    closeModal();
    setProduct(defualtProductObj);
    setTempColor([]);
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });
    const hasErrMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasErrMsg);

    if (!hasErrMsg) {
      serErrors(errors);
      return;
    }
    // console.log("sent ");
    setProductList((prev) => [
      { ...product, id: uuid(), colors: tempColor },
      ...prev,
    ]);
    setProduct(defualtProductObj);
    closeModal();
    setTempColor([]);
  };

  const renderProductist = productList.map((product: Iproduct) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <>
      <div className="text-center  space-y-4">
        <Button className={"bg-indigo-500"} onClick={open}>
          Add
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderProductist}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
          <form className="space-y-3 " onSubmit={onSubmitHandler}>
            {FormInputsList.map((input) => (
              <div className="flex flex-col gap-2" key={input.id}>
                <label htmlFor={input.id}>{input.label}</label>
                <Input
                  type="text"
                  id={input.id}
                  name={input.name}
                  value={product[input.name]}
                  onChange={onChangeHandler}
                />
                <ErrorMsg msg={errors[input.name]} />
              </div>
            ))}
            <div className="colors flex gap-2 ">
              {Colors.map((color) => (
                <CircleColor
                  Color={color}
                  key={color}
                  onClick={() => {
                    if (tempColor.includes(color)) {
                      setTempColor((prev) =>
                        prev.filter((item) => item !== color)
                      );
                      return;
                    }
                    setTempColor((prev) => [...prev, color]);
                  }}
                />
              ))}
            </div>
            <div className="display-colors  flex flex-wrap gap-2 items-center">
              {tempColor.map((color) => (
                <span
                  key={color}
                  className={`h-6 p-1  rounded-md flex items-center text-white`}
                  style={{ backgroundColor: color }}
                >
                  {color}{" "}
                </span>
              ))}
            </div>

            <div className="flex  gap-2 ">
              <Button className={"bg-indigo-500"}>submit</Button>
              <Button className={"bg-gray-500 "} onClick={onCancel}>
                Close
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default App;
