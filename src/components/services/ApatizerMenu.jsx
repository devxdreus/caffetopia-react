import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Asset
import tahuGejrot from "../../assets/tahuGejrot.png";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; 

const ApatizerMenu = () => {
  const { auth } = useAuth();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/products');
        const products = response.data.payload;
        setMenus(products);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // State untuk mengelola item yang ditambahkan ke keranjang
  const [cart, setCart] = useState([]);

  // Fungsi untuk menangani penambahan item ke keranjang
  const handleOrderClick = (product) => {
    if (!auth?.accessToken) {
      // Menampilkan alert jika user belum login
      Swal.fire({
        title: "Silahkan sign in untuk memesan pesanan!",
        icon: "info",
        confirmButtonText: "Ok",
      });
    } else {
      // Menambahkan produk yang dipilih ke keranjang
      setCart([...cart, product]);
      // Menampilkan alert sukses
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
            {/* Loop melalui setiap produk dan tampilkan dalam bentuk baris */}
            {menus.map((product, index) => (
              <tr
                key={index}
                className="flex w-[100%] justify-start items-center"
              >
                <td className="basis-1/4">
                  {/* Menampilkan gambar produk */}
                  <img
                    src={tahuGejrot}
                    alt={product.name}
                    className="mx-2 w-[100px] sm:mx-10 my-5 sm:w-[130px]"
                  />
                </td>
                <td className="basis-1/4">
                  {/* Menampilkan nama produk */}
                  <p className="mx-5 sm:text-start text-center text-xs sm:text-base sm:mx-10 my-5">
                    {product.name}
                  </p>
                </td>
                <td className="basis-1/4">
                  {/* Menampilkan harga produk */}
                  <p className="mx-5 sm:text-start text-center text-xs sm:text-base sm:mx-10 my-5">
                    {product.price}
                  </p>
                </td>
                {auth.roles?.includes('admin')
                  ?
                  <td className="basis-1/4 flex justify-around p-4">
                    <div className="flex">
                        <button
                            // onClick={() => handleDelete(product)}
                            className="bg-[#F41A1A] text-black w-7 h-7 rounded mr-2"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <Link to="/updateproduct">
                            <button
                                onClick={() => handleOrderClick(product, "edit")}
                                className="bg-[#3fff00] text-black w-7 h-7 rounded"
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </Link>
                    </div>
                  </td>
                  :
                  <td className="basis-1/4">
                    {/* Tombol untuk menambahkan produk ke keranjang */}
                    <button
                      onClick={() => handleOrderClick(product)}
                      className="rectangle w-[40px] h-[40px] bg-[#F4991A] border border-[#747474] mx-4 sm:mx-12 my-5"
                    >
                      <p className="text-2xl text-white">+</p>
                    </button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pe-10 w-[100%] my-5">
        {/* Link ke halaman checkout */}
        <Link
          to={`${auth.roles?.includes('admin') ? '/addproduct' : '/checkout'}`}
          className="text-base sm:text-2xl font-bold bg-[#F4991A] border border-[#321313] w-[120px] h-[40px] flex justify-center items-center"
        >
          <p>{auth.roles?.includes('admin') ? 'Add' : 'Next'} &gt;</p>
        </Link>
      </div>
    </>
  );
};

export default ApatizerMenu;
