import { useState } from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import Button from "./Components/ui/Button";
import { FormInputsList } from "./data/data";
import Input from "./Components/ui/Input";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="text-center ">
        <Button className={"bg-indigo-500"} onClick={open}>
          submit
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
          <div className="space-y-3 ">
            {FormInputsList.map((input) => (
              <div className="flex flex-col gap-2">
                <label htmlFor={input.id}>{input.label}</label>
                <Input type="text" id={input.id} name={input.name} />
              </div>
            ))}

            <div className="flex  gap-2 ">
              <Button className={"bg-indigo-500"}>submit</Button>
              <Button className={"bg-gray-500 "} onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
