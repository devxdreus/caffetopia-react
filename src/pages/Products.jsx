import { useState, useContext, useEffect, } from "react";
import CategoryList from "../components/products/CategoryList";
import FavoriteProducts from "../components/products/FavoriteProducts";
import ProductList from "../components/products/ProductList";
import { ProductContext } from "../context/ProductContext";

const Products = () => {
  const { categories } = useContext(ProductContext);
  const [activeComponent, setActiveComponent] = useState('');
  const isAdmin = localStorage.getItem("role") == "admin" ? true : false;

  useEffect(() => {
    setActiveComponent(categories[0]?.name);
  }, [categories]);

  const handleCategoryClick = (category) => {
    setActiveComponent(category);
  };

  return (
    <div className="flex flex-col sm:flex-row mt-8">
      {/* Favorite Menu or Category List */}
      {localStorage.getItem("role") != "admin" ? (
        <FavoriteProducts />
      ) : (
        <CategoryList />
      )}
      {/* Content Menu*/}
      <div
        className={`${
          localStorage.getItem("role") == "admin"
            ? "sm:basis-3/4"
            : "sm:basis-2/3"
        } flex flex-col mt-5 sm:mt-0 p-3`}
      >
        {/* Categories button */}
        <div className="flex h-[50px] w-full sm:w-[70%] justify-evenly items-center">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`mx-2 text-base sm:text-lg ${
                category.name == activeComponent
                  ? "font-medium text-primary border-b border-primary"
                  : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <ProductList category={activeComponent} isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Products;
