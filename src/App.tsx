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
  const onCancel = () => {
    closeModal();
    setProduct(defualtProductObj);
    setTempColor([]);
  };
  const onCancelEdit = () => {
    closeEditModal();
    // setProduct(defualtProductObj);
    // setTempColor([]);
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
    // console.log(hasErrMsg);

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
  // const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   const { title, description, imageURL, price } = productToEdit;
  //   console.log("Editing Product:", productToEdit);
  //   const errors = productValidation({
  //     title: title,
  //     description: description,
  //     imageURL: imageURL,
  //     price: price,
  //     colors: tempColor,
  //   });
  //   console.log("Validation Errors:", errors);
  //   const hasErrMsg = Object.values(errors).some((value) => value !== "");

  //   if (hasErrMsg) {
  //     serErrors(errors);
  //     return;
  //   }
  //   console.log("No Errors, proceeding to update product.");
  //   // console.log(productList); // This will execute if there are no errors

  //   const UpdateProduct = [...productList];
  //   UpdateProduct[productToEditIndex] = productToEdit;
  //   setProductList(UpdateProduct);

  //   console.log("Updated Product List:", UpdateProduct);
  //   setProductToEdit(defualtProductObj);

  //   onCancelEdit();
  //   setTempColor([]);
  // };
  // const onSubmitEditHandler1 = (event: FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   const { title, description, imageURL, price } = productToEdit;

  //   // Log the current product to edit
  //   console.log("Editing Product:", productToEdit);

  //   const errors = productValidation({
  //     title: title,
  //     description: description,
  //     imageURL: imageURL,
  //     price: price,
  //     colors: tempColor,
  //   });

  //   // Log validation errors
  //   console.log("Validation Errors:", errors);

  //   const hasErrMsg = Object.values(errors).some((value) => value !== "");

  //   if (hasErrMsg) {
  //     serErrors(errors);
  //     console.log("Errors found, edit operation aborted.");
  //     return;
  //   }

  //   console.log("No Errors, proceeding to update product.");

  //   const UpdateProduct = [...productList];
  //   UpdateProduct[productToEditIndex] = {
  //     ...productToEdit,
  //     colors: tempColor.concat(productToEdit.colors),
  //   };
  //   setProductList(UpdateProduct);

  //   console.log("Updated Product List:", UpdateProduct);

  //   setProductToEdit(defualtProductObj);

  //   onCancelEdit();
  //   setTempColor([]);
  // };
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
  // console.log(productToEdit);
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
              <Button className={"bg-indigo-500"}>submit</Button>
              <Button className={"bg-gray-500 "} onClick={onCancel}>
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
                    // onClick={() => {
                    //   if (
                    //     tempColor.concat(productToEdit.colors).includes(color)
                    //   ) {
                    //     setTempColor((prev) =>
                    //       prev.filter((item) => item !== color)
                    //     );
                    //     return;
                    //   }
                    //   setTempColor((prev) => [...prev, color]);
                    //   serErrors((prevErrors) => ({ ...prevErrors, color: "" }));
                    // }}
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
              <Button className={"bg-indigo-500"}>submit</Button>
              <Button className={"bg-gray-500 "} onClick={onCancelEdit}>
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
