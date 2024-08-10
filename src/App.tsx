import { useState } from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import Modal from "./Components/ui/Modal";
import Button from "./Components/ui/Button";

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
      <div className="text-center">
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
          <Button className={"bg-indigo-500"}>submit</Button>
          <Button className={"bg-gray-500 mt-2"} onClick={closeModal}>
            close
          </Button>
        </Modal>
      </div>
    </>
  );
}

export default App;
