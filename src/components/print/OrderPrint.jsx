import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackgroundAbout from "../../components/background/BackgroundAbout";
import axios from "../../api/axios";

const [cashReceived, setCashReceived] = useState(0);

const calculateChange = () => {
    if (orders) {
      return cashReceived - orders.amount;
    }
    return 0;
  };
  

const OrderPrint = () => {
  const [orders, setOrders] = useState(null); // Inisialisasi dengan null
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/${id}`);
        console.log("Response from API:", response.data.payload); // Tambahkan console.log untuk debug
        setOrders(response.data.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [id]);

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  const safeParseJSON = (jsonString) => {
    try {
      if (typeof jsonString === "string") {
        const trimmedString = jsonString.trim();
        if (trimmedString.startsWith('"') && trimmedString.endsWith('"')) {
          jsonString = JSON.parse(jsonString);
        }
        const parsed = JSON.parse(jsonString);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return [];
    }
  };

  const products = safeParseJSON(orders?.products);

  console.log("Products:", products); // Tambahkan console.log untuk debug produk

  return (
    <div className="font-poppins">
      <BackgroundAbout>
        <div className="container px-4 py-20 sm:px-0">
          <div className="p-4 bg-white border-1 border-[#321313] rounded-md m-2 mx-auto">
            <h3 className="mb-4 text-[#603809] text-2xl font-bold text-center border-b border-gray-200">
              Products
            </h3>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-left text-37">
                Order ID: {orders?.id}
              </h3>
              <h3 className="font-bold text-right text-37">
                {orders?.dining_option}
              </h3>
            </div>
            <div className="flex flex-col mb-4 font-bold text-left">
              <h3 className="text-37">Name: {orders?.user.username}</h3>
              <h3 className="text-47">Table No : {orders?.table_number}</h3>
            </div>
            <table className="w-full" id="productTable">
              <thead>
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
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
                    <h3 className="float-right py-1 mb-4 font-normal text-left border-2 text-1x rounded- w-44">
                      {orders?.note}
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mb-4 border-b border-gray-200"></div>
            <h3 className="mb-4 text-[#603809] text-2xl font-bold text-center">
              Order Summary
            </h3>
            <table className="w-full">
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2 text-center">{product.quantity}</td>
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
                  <td className="p-2 text-right">{`IDR ${orders?.amount.toLocaleString(
                    "id-ID"
                  )}`}</td>
                </tr>
              </tfoot>
            </table>

            <div className="mb-4 border-b border-gray-200"></div>
<table className="w-full">
  <tbody>
    <tr className="font-bold">
      <td className="p-2">Payment Method</td>
      <td className="p-2 text-right"> Cash </td>
    </tr>
    <tr className="font-bold">
      <td className="p-2">Amount Paid</td>
      <td className="p-2 text-right">
        <input
          type="number"
          className="w-32 p-2 border rounded-md"
          value={cashReceived}
          onChange={(e) => setCashReceived(parseFloat(e.target.value))}
        />
      </td>
    </tr>
    <tr className="font-bold">
      <td className="p-2">Change</td>
      <td className="p-2 text-right">{`IDR ${calculateChange().toLocaleString(
        "id-ID"
      )}`}</td>
    </tr>
  </tbody>
</table>

    
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
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default OrderPrint;
