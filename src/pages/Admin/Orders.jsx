import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import BackgroundAbout from "../../components/background/BackgroundAbout";
import axios from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = axios.get("/orders");
        const data = (await response).data.payload;
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  // Function to calculate total price and return object containing total and products list
  // const calculateTotalPrice = () => {
  //   const totalPrice = orders.products.reduce((total, product) => total + (product.price * product.amount), 0);
  //   return { total: totalPrice, products: orders.products };
  // };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  const safeParseJSON = (jsonString) => {
    try {
      const unescapedString = JSON.parse(jsonString);
      const parsed = JSON.parse(unescapedString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return [];
    }
  };

  return (
    <div className="font-poppins">
      <BackgroundAbout>
        <div className="container py-20 px-4 sm:px-0">
          {orders?.map((order, index) => (
            <div
              key={index}
              className="p-4 bg-white border-1 border-[#321313] rounded-md m-2 mx-auto"
            >
              <h3 className="text-2xl text-[#603809] text-center font-bold mb-4 border-b border-gray-200">
                Products
              </h3>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-37 text-left font-bold">
                  Order ID: {order.id}
                </h3>
                <h3 className="text-37 text-right font-bold">
                  {order.dining_option}
                </h3>
              </div>
              <div className="flex flex-col text-left font-bold mb-4">
                <h3 className="text-37">Name: {order.user?.username}</h3>
                <h3 className="text-47">Table No : {order.table_number}</h3>
              </div>
              <table className="w-full" id="productTable">
                <thead>
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-left p-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {safeParseJSON(order.products).map((product, index) => (
                    <tr key={index}>
                      <td className="p-4">{product.name}</td>
                      <td className="p-4 text-center">{product.quantity}</td>
                      <td className="p-4 text-right">{`IDR ${product.price.toLocaleString(
                        "id-ID"
                      )}`}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="p-4 text-left">
                      <div className="mt-4" />
                      <h3 className="text-1x text-left font-normal mb-4 border-2 rounded- w-44 py-1 float-right">
                        {order.note}
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="border-b border-gray-200 mb-4"></div>
              <h3 className="text-2xl  text-[#603809] text-center font-bold mb-4">
                Order Summary
              </h3>
              <table className="w-full">
                <tbody>
                  {safeParseJSON(order.products).map((product, index) => (
                    <tr key={index}>
                      <td className="p-4">{product.name}</td>
                      <td className="p-4 text-center">{product.quantity}</td>
                      <td className="p-2 text-right">{`IDR ${(
                        product.price * product.quantity
                      ).toLocaleString("id-ID")}`}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td className="p-2" colSpan="2">
                      Total
                    </td>
                    <td className="p-2 text-right">{`IDR ${order.amount.toLocaleString(
                      "id-ID"
                    )}`}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="border-b border-gray-200 mb-4"></div>
             
              <div className="flex justify-center">
                <button
                  onClick={handlePrint}
                  className="w-24 text-[#321313] font-bold bg-[#F4991A] rounded-md p-2 md:p-2 text-center flex items-center justify-center mt-4 mr-auto"
                >
                  Print
                </button>
                <Link
                  to="/report"
                  className="w-24 text-[#321313] font-bold bg-[#F4991A] rounded-md p-2 md:p-2 text-center flex items-center justify-center mt-4 ml-auto"
                >
                  Report
                </Link>
              </div>
            </div>
          ))}
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default Orders;
