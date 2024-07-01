import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundAbout from '../../components/background/BackgroundAbout';
import moment from 'moment';
import './styles.css';

const ReportPrint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders = [], totalAmount = 0 } = location.state || {};
  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: 'Daily Report', // Optional: Add a document title
  });

  const handleCancel = () => {
    navigate('/report'); // Change '/report' to your report page path
  };

  return (
    <div className="font-poppins">
      <BackgroundAbout>
        <div className="max-w-screen-lg p-4 mx-auto">
          <div ref={reportRef}>
            <h3 className="text-xl text-[#321313] text-left font-bold">
              Daily Report
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white border rounded-md table-report">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">No</th>
                    <th className="px-4 py-2 border-b">Order ID</th>
                    <th className="px-4 py-2 border-b">Date</th>
                    <th className="px-4 py-2 border-b">Time</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id}>
                      <td className="px-4 py-2 text-center border-b">{index + 1}</td>
                      <td className="px-4 py-2 text-center border-b">{order.id}</td>
                      <td className="px-4 py-2 border-b">{order.date}</td>
                      <td className="px-4 py-2 text-center border-b">
                        {moment(order.createdAt).format('HH:mm')}
                      </td>
                      <td className="px-4 py-2 text-center border-b">{order.user?.username}</td>
                      <td className="px-4 py-2 border-b">
                        {order.amount.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-center border-b">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-[#F4991A] border rounded-md p-2 mt-4 max-w-xs">
              <span className="text-[#321313] font-bold">Total Amount:</span>{' '}
              {totalAmount.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
          </div>
          <div className="flex justify-between mt-4 no-print">
            <button
              onClick={handlePrint}
              className="w-24 text-[#321313] font-bold bg-[#F4991A] rounded-md p-2 md:p-2 text-center flex items-center justify-center"
            >
              Print
            </button>
            <button
              onClick={handleCancel}
              className="w-24 text-[#321313] font-bold bg-[#F4991A] rounded-md p-2 md:p-2 text-center flex items-center justify-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default ReportPrint;
