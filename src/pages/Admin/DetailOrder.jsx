import React, { useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link, useParams } from 'react-router-dom';
import BackgroundAbout from '../../components/background/BackgroundAbout';
import axios from '../../api/axios';
import './DetailOrder.css';

const DetailOrder = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/${id}`);
        setOrders(response.data.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [id]);

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

  const handlePrint = useReactToPrint({
    content: () => document.getElementById('reportContent'),
    documentTitle: 'Orders',
  });

  return (
    <div className="font-poppins">
      <BackgroundAbout>
        <div className="container px-4 py-20 sm:px-0">
          <div className="p-4 bg-white border-1 border-[#321313] rounded-md m-2 mx-auto">
            <div id="reportContent">
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
                      <td className="p-4 text-right">{`IDR ${product.price.toLocaleString('id-ID')}`}</td>
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
                      <td className="p-2 text-right">{`IDR ${(product.price * product.quantity).toLocaleString('id-ID')}`}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td className="p-2" colSpan="2">
                      Total
                    </td>
                    <td className="p-2 text-right">{`IDR ${orders?.amount.toLocaleString('id-ID')}`}</td>
                  </tr>
                </tfoot>
              </table>

            </div>
            <div className="flex justify-center">
              <button
                onClick={handlePrint}
                className="w-24 text-[#321313] font-bold bg-[#F4991A] rounded-md p-2 md:p-2 text-center flex items-center justify-center mt-4 mr-4 no-print"
              >
                Print
              </button>
              <Link
                to="/report"
                className="w-24 text-[#321313] font-bold bg-[#F4991A] rounded-md p-2 md:p-2 text-center flex items-center justify-center mt-4 ml-4 no-print"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default DetailOrder;
