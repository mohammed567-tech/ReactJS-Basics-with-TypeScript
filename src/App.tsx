import "./App.css";
import ProductCard from "./Components/ProductCard";

function App() {
  return (
    <>
      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default App;
