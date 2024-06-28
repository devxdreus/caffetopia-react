import { useContext, useState, useEffect } from "react";
import COFFEE_IMAGE from "../assets/coffe.jpg";
import TambahButton from "../components/buttonaction/TambahButton";
import HapusButton from "../components/buttonaction/HapusButton";
import KurangButton from "../components/buttonaction/KurangButton";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethod from "../components/checkout/PaymentMethod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import axios from "../api/axios";

const Checkout = () => {
  const { cart, setCart, addProductOnCart, removeProductFromCart } =
    useContext(ProductContext);
  const navigate = useNavigate();

  const [tableNumber, setTableNumber] = useState("");
  const [diningOption, setDiningOption] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice +=
        parseInt(product.price, 10) * parseInt(product.quantity, 10);
    });
    setTotalPrice(totalPrice);
  }, [cart, isConfirmed]);

  useEffect(() => {
    setBookedTableNumbers(cart.map((product) => product.tableNumber));
  }, [cart]);
  
  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducts = [...cart];
        updatedProducts.splice(index, 1);
        setCart(updatedProducts);
        Swal.fire("Deleted!", "The order has been deleted.", "success");
      }
    });
  };

  const handleConfirm = () => {
    if (tableNumber !== "" && diningOption !== "") {
      const totalPrice = cart.reduce((total, product) => {
        return total + parseInt(product.price) * parseInt(product.quantity);
      }, 0);

      setTotalPrice(totalPrice);
      setIsConfirmed(true);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter table number and dining option.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCheckout = async () => {
    const order = {
      username: localStorage.getItem("username"),
      order: cart,
      amount: totalPrice,
      tableNumber: parseInt(tableNumber),
      diningOption,
      note,
    };

    console.log(order);

    try {
      const response = await axios.post("/checkout", order);
      console.log(response);

      // Menampilkan alert "Pesanan berhasil di checkout"
      Swal.fire({
        title: "Success!",
        text: "Pesanan berhasil di checkout.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset cart setelah checkout
      setCart([]);
      setIsConfirmed(false);
      setTableNumber("");
      setDiningOption("");
      setTotalPrice(0);
      setNote("");

      // Menonaktifkan tombol Checkout
      setIsCheckoutDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  //select meja yang di pesan 
  const [bookedTableNumbers, setBookedTableNumbers] = useState([]);


  return (
    <div className="font-poppins">
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-start text-[#321313]"
        style={{
          backgroundImage: `url(${COFFEE_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-20 px-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <h3 className="text-xl text-left text-[#321313] font-bold mb-0 p-4">
                Checkout your item now!
              </h3>
              <div className="p-4 bg-white border border-white rounded-md mt-0">
                <h3 className="text-3xl text-center font-bold mb-4 border-b border-gray-200">
                  Products
                </h3>
                <table className="w-full" id="productTable">
                  <thead>
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Quantity</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((product, index) => (
                        <tr key={index}>
                          <td className="p-4">{product.name}</td>
                          <td className="p-5 flex items-center">
                            {!isConfirmed && (
                              <KurangButton
                                onClick={() =>
                                  removeProductFromCart(product.id)
                                }
                              />
                            )}
                            {product.quantity}
                            {!isConfirmed && (
                              <TambahButton
                                onClick={() => addProductOnCart(product.id)}
                              />
                            )}
                          </td>
                          <td className="p-4">{`IDR ${product.price.toLocaleString(
                            "id-ID"
                          )}`}</td>
                          <td className="p-4 flex justify-start items-center">
                            {!isConfirmed && (
                              <HapusButton
                                onClick={() => handleDelete(index)}
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-4 text-center">
                          No products in cart
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex items-center space-x-2 mt-8">
                  <label
                    htmlFor="tableNumber"
                    className="text-sm text-[#321313]"
                  >
                    Table No :
                  </label>
                  <select  
  id="tableNumber"
  className="bg-white border border-[#321313] text-[#321313] text-xs rounded-md p-1 w-52"
  value={tableNumber}
  onChange={(e) => setTableNumber(e.target.value)}
  required
>
  <option value="">select a table number</option>
  {[1, 2, 3].filter((number) => !bookedTableNumbers.includes(number)).map((number) => (
    <option key={number} value={number}>
      Table {number}
    </option>
  ))}
</select>

                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <label
                    htmlFor="diningOption"
                    className="text-sm text-[#321313]"
                  >
                    Dining Option:
                  </label>
                  <select
                    id="diningOption"
                    className="bg-white border border-[#321313] text-[#321313] text-xs rounded-md p-1 w-44"
                    value={diningOption}
                    onChange={(e) => setDiningOption(e.target.value)}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Dine-In">Dine In</option>
                    <option value="Take-Away">Take Away</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <input
                    type="text"
                    id="notes"
                    onChange={(e) => setNote(e.target.value)}
                    className="bg-white border border-[#321313] text-[#321313] text-xs rounded-md p-2 w-72"
                    placeholder="Notes..."
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex justify-start w-full mb-4 sm:mb-4 mt-8">
                    {!isConfirmed && (
                      <button
                        type="submit"
                        onClick={() => navigate("/products")}
                        className="text-white bg-[#591E0A] hover:bg-[#693828] focus:ring-4 focus:outline-none focus:ring-[#a15941] font-bold rounded-lg text-sm w-32 sm:w-auto px-5 py-2.5 text-center"
                      >
                        Add Menu
                      </button>
                    )}
                  </div>
                  <div className="flex justify-end w-full mb-4 sm:mb-4 mt-8">
                    {!isConfirmed && (
                      <button
                        type="submit"
                        onClick={handleConfirm}
                        className="text-white bg-[#F4991A] hover:bg-[#f6aa40] focus:ring-4 focus:outline-none focus:ring-[#facc8d] font-bold rounded-lg text-sm w-24 sm:w-auto px-5 py-2.5 text-center"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl text-left text-white font-bold mb-0 p-4">
                Order Summary
              </h3>
              {isConfirmed && (
                <>
                  <OrderSummary
                    confirmedOrder={cart}
                    totalPrice={totalPrice}
                    tableNumber={tableNumber}
                    diningOption={diningOption}
                    note={note}
                  />
               
                  <div className="p-4 mt-4">
                    <button
                      type="submit"
                      className="text-white bg-[#F4991A] hover:bg-[#f6aa40] focus:ring-4 focus:outline-none focus:ring-[#facc8d] font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      onClick={handleCheckout}
                      disabled={isCheckoutDisabled} // Menambahkan disabled={isCheckoutDisabled}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
