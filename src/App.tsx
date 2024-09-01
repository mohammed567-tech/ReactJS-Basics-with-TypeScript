import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import Button from "./Components/ui/Button";
import { Category, Colors, FormInputsList, Products } from "./data/data";
import Input from "./Components/ui/Input";
import { Iproduct } from "./Components/Interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./Components/ErrorMsg";
import CircleColor from "./Components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import { SelectMenu } from "./Components/ui/SelectMenu";
import { TproductName } from "./types";

function App() {
  const defualtProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageURL: "" },
  };
  const defaultErrs = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    color: "",
  };
  const [productList, setProductList] = useState<Iproduct[]>(Products);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isRemoveOpen, setRemoveIsOpen] = useState(false);
  const [product, setProduct] = useState<Iproduct>(defualtProductObj);
  const [productToEdit, setProductToEdit] =
    useState<Iproduct>(defualtProductObj);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [errors, serErrors] = useState(defaultErrs);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(Category[0]);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    serErrors({ ...errors, [name]: "" });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    serErrors({ ...errors, [name]: "" });
  };
  const open = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // Edit Model
  const openEditModal = () => {
    setEditIsOpen(true);
  };
  const closeEditModal = () => {
    setEditIsOpen(false);
  };
  const openRemoveModal = () => {
    setRemoveIsOpen(true);
  };
  const closeRemoveModal = () => {
    setRemoveIsOpen(false);
  };
  const onCancel = () => {
    closeModal();
    setProduct(defualtProductObj);
    setTempColor([]);
  };
  const onCancelEdit = () => {
    closeEditModal();
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      colors: tempColor,
    });
    const hasErrMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrMsg) {
      serErrors(errors);
      return;
    }

    setProductList((prev) => [
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defualtProductObj);
    closeModal();
    setTempColor([]);
  };
  const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;

    // Log the current product to edit
    console.log("Editing Product:", productToEdit);

    const colorsToValidate =
      tempColor.length > 0 ? tempColor : productToEdit.colors;

    const errors = productValidation({
      title: title,
      description: description,
      imageURL: imageURL,
      price: price,
      colors: colorsToValidate,
    });

    // Log validation errors
    console.log("Validation Errors:", errors);

    const hasErrMsg = Object.values(errors).some((value) => value !== "");

    if (hasErrMsg) {
      serErrors(errors);
      console.log("Errors found, edit operation aborted.");
      return;
    }

    console.log("No Errors, proceeding to update product.");

    const updatedProductList = [...productList];
    updatedProductList[productToEditIndex] = {
      ...productToEdit,
      colors: colorsToValidate,
    };
    setProductList(updatedProductList);

    console.log("Updated Product List:", updatedProductList);

    setProductToEdit(defualtProductObj);

    onCancelEdit();
    setTempColor([]);
  };

  const renderProductist = productList.map((product, index) => (
    <ProductCard
      key={product.id}
      index={index}
      setProductToEditIndex={setProductToEditIndex}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      openRemoveModal={openRemoveModal}
    />
  ));
  const renderProductEdit = (id: string, label: string, name: TproductName) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };
  const handleRemveItem = () => {
    console.log("Product to remove:", productToEdit);
    const filtered = productList.filter(
      (product) => product.id !== productToEdit.id
    );
    console.log("Filtered products:", filtered);

    setProductList(filtered);
    closeRemoveModal();
  };
  return (
    <>
      <div className="text-center  space-y-4">
        <Button className={"bg-indigo-500"} onClick={open}>
          Add
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderProductist}
        </div>
        {/* Buil New Product  */}
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
            <div className="flex flex-col gap-2">
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
                      serErrors((prevErrors) => ({ ...prevErrors, color: "" }));
                    }}
                  />
                ))}
              </div>
              <ErrorMsg msg={errors.color} />
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
            <SelectMenu
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            <div className="flex  gap-2 ">
              <Button className={"bg-indigo-500 text-white"}>submit</Button>
              <Button className={"bg-gray-500 text-white"} onClick={onCancel}>
                Close
              </Button>
            </div>
          </form>
        </Modal>
        {/* Edit Modal */}
        <Modal
          isOpen={isEditOpen}
          closeModal={closeEditModal}
          title="Edit Product"
        >
          <form className="space-y-3 " onSubmit={onSubmitEditHandler}>
            {renderProductEdit("title", "product Title ", "title")}
            {renderProductEdit(
              "Description",
              "product Description ",
              "description"
            )}
            {renderProductEdit("imageURL", "product imageURL ", "imageURL")}
            {renderProductEdit("price", "product price ", "price")}
            <div className="flex flex-col gap-2">
              <div className="colors flex gap-2 ">
                {Colors.map((color) => (
                  <CircleColor
                    Color={color}
                    key={color}
                    onClick={() => {
                      const isColorInTemp = tempColor.includes(color);
                      const isColorInProduct =
                        productToEdit.colors.includes(color);

                      if (isColorInTemp) {
                        setTempColor((prev) =>
                          prev.filter((item) => item !== color)
                        );
                      } else if (isColorInProduct) {
                        setProductToEdit({
                          ...productToEdit,
                          colors: productToEdit.colors.filter(
                            (item) => item !== color
                          ),
                        });
                      } else {
                        setTempColor((prev) => [...prev, color]);
                        serErrors((prevErrors) => ({
                          ...prevErrors,
                          color: "",
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="display-colors  flex flex-wrap gap-2 items-center">
              {tempColor.concat(productToEdit.colors).map((color) => (
                <span
                  key={color}
                  className={`h-6 p-1  rounded-md flex items-center text-white`}
                  style={{ backgroundColor: color }}
                >
                  {color}{" "}
                </span>
              ))}
            </div>
            <SelectMenu
              selected={productToEdit.category}
              setSelected={(value) =>
                setProductToEdit({ ...productToEdit, category: value })
              }
            />
            <div className="flex  gap-2 ">
              <Button className={"bg-indigo-500 text-white"}>submit</Button>
              <Button
                className={"bg-gray-500  text-white"}
                onClick={onCancelEdit}
              >
                Close
              </Button>
            </div>
          </form>
        </Modal>
        {/* Remove btn Modal */}
        <Modal
          isOpen={isRemoveOpen}
          closeModal={closeRemoveModal}
          title="Remove Item"
        >
          <div>
            <div className="p-3">
              <p>Do u Want To Remove </p>
            </div>
            <div className="flex  gap-2 ">
              <Button
                className={"bg-red-500 text-white"}
                onClick={() => handleRemveItem()}
              >
                Remove
              </Button>
              <Button
                className={"bg-gray-300  text-black"}
                onClick={closeRemoveModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
