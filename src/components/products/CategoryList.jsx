/* eslint-disable react/prop-types */
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UseDeleteCategory } from './handleDelete';
import { ProductContext } from "../../context/ProductContext";

export default function CategoryList() {
  const { categories } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleDelete = UseDeleteCategory();

  return (
    <div className="basis-1/3 flex flex-col sm:border">
    <div className="basis-1/4 flex flex-col p-4 space-y-4">
    <h1 className="text-lg sm:text-2xl text-center text-[#321313] font-bold my-1">
          Manage Category & Add Product
        </h1>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => navigate("/addcategory")}
          className="bg-[#F4991A] border-1 border-[#321313] p-4 rounded text-[#321313] font-bold"
        >
          Add Category
        </button>
        <button
          onClick={() => navigate("/addproduct")}
          className="bg-[#F4991A] border-1 border-[#321313] p-4 rounded text-[#321313] font-bold"
        >
          Add Product
        </button>
      </div>
      <div className="text-center space-y-2">
        <p className="font-bold">Kategori</p>
        {categories.map((category, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <button className="p-2 font-medium text-[#591E0A] border border-[#591E0A] rounded">
              {category.name}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate(`/category/update/${category.id}`)}
                className="bg-[#3fff00] rounded"
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button onClick={() => handleDelete(category)} className="bg-[#F41A1A] rounded">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
