import Buttoncash from "../buttoncheckout/Buttoncash";

const PaymentMethod = () => {
  return (
    <div className="p-4 bg-white border rounded-md w-full sm:w-4/5 mt-0 border-white">
      <div>
        <Buttoncash />
      </div>
    </div>
  );
};

export default PaymentMethod;
