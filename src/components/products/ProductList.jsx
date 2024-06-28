/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { UseDeleteProduct } from "./handleDelete";
import { useContext } from "react";
import { ProductContext } from '../../context/ProductContext';

export default function ProductList({ category, isAdmin }) {
  const { products, addProductToCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const newProducts = products?.filter(product => product.category.name == category);
  const handleDelete = UseDeleteProduct();

  const handleOrderClick = (product) => {
    if (!localStorage.getItem("username")) {
      Swal.fire({
        title: "Silahkan sign in untuk memesan pesanan!",
        icon: "info",
        confirmButtonText: "Ok",
      });
    } else {
      addProductToCart(product);
      Swal.fire({
        title: "Product telah ditambahkan",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <div className="flex sm:justify-start justify-center w-[100%]">
        <table className="table-auto">
          <tbody className="flex flex-col w-[100%]">
            {newProducts?.map((product, index) => (
              <tr
                key={index}
                className="flex w-[100%] justify-start items-center"
              >
                <td className="basis-1/4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-2 w-[100px] sm:mx-10 my-5 sm:w-[130px]"
                  />
                </td>
                <td className="basis-1/4">
                  <p className="mx-5 sm:text-start text-center text-xs sm:text-base sm:mx-10 my-5">
                    {product.name}
                  </p>
                </td>
                <td className="basis-1/4">
                  <p className="mx-5 sm:text-start text-center text-xs sm:text-base sm:mx-10 my-5">
                    {product.price}
                  </p>
                </td>
                {isAdmin ? (
                  <td className="basis-1/4 flex justify-around p-4">
                    <div className="flex">
                      <button
                        onClick={() =>
                          handleDelete(product)
                        }
                        className="bg-[#F41A1A] text-black w-7 h-7 rounded mr-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <Link to={`/updateproduct/${product.id}`}>
                        <button className="bg-[#3fff00] text-black w-7 h-7 rounded">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </Link>
                    </div>
                  </td>
                ) : (
                  <td className="basis-1/4">
                    {/* Tombol untuk menambahkan produk ke keranjang */}
                    <button
                      onClick={() => handleOrderClick(product)}
                      className="rectangle w-[40px] h-[40px] bg-secondary border border-[#747474] mx-4 sm:mx-12 my-5"
                    >
                      <p className="text-2xl text-white">+</p>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isAdmin && (
        <div className="flex justify-end pe-10 w-[100%] my-5">
          <button
            onClick={() => navigate('/checkout')}
            className="text-base sm:text-2xl font-bold bg-[#F4991A] border border-[#321313] w-[120px] h-[40px] flex justify-center items-center"
          >
            Next &gt;
          </button>
        </div>
      )}
    </>
  );
}
