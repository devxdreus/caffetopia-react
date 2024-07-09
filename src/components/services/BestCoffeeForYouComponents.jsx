import { Link } from "react-router-dom";
import coffeeLate from "../../assets/kopi1.png";
import americano from "../../assets/Coffe2.png";
import cappucino from "../../assets/kopi5.png";

const BestCoffeeForYouComponents = () => {
  return (
    <div className="w-full sm:h-[80vh] my-7 sm:my-20">
      <h2 className="text-center text-xl sm:text-3xl pt-10 pb-20 sm:pb-32  text-[#603809] font-bold">
        Best Coffee For You
      </h2>
      <div className="container-coffee flex flex-col sm:flex-row sm:my-10">
        {/* Kartu Coffee Late */}
        <div
          className="basis-1/3 py-10 sm:p-0 flex justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="card-coffee bg-[#6B240C] w-[350px] h-[210px] flex flex-col justify-center items-center group relative">
            <div className="card-icon absolute bottom-32">
              <img
                src={coffeeLate}
                width={170}
                alt=""
                className="group-hover:scale-110 group-hover:rotate-12 duration-300"
              />
            </div>
            <div className="card-content flex flex-col justify-center items-center mt-8">
              <h5 className="text-lg sm:text-2xl mt-10 font-medium">
                Coffee Late
              </h5>
              <p className="text-base sm:text-lg my-1 font-medium">
                IDR 28.000
              </p>
              <Link
                to="/products"
                className="w-[110px] h-[40px] bg-[#F4991A] border border-black mt-1 rounded-lg text-lg font-bold text-[#000] flex justify-center items-center hover:bg-[#f3ad4b] duration-300"
              >
                <p>Order Now</p>
              </Link>
            </div>
          </div>
        </div>
        {/* Kartu Americano */}
        <div
          className="basis-1/3 py-20 sm:p-0 flex justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="350"
        >
          <div className="card-coffee bg-[#6B240C] w-[350px] h-[210px] flex flex-col justify-center items-center group relative">
            <div className="card-icon absolute bottom-32">
              <img
                src={americano}
                width={195}
                alt=""
                className="group-hover:scale-110 group-hover:rotate-12 duration-300"
              />
            </div>
            <div className="card-content flex flex-col justify-center items-center mt-8">
              <h5 className="text-lg sm:text-2xl mt-10 font-medium">
                Mochacino
              </h5>
              <p className="text-base sm:text-lg my-1 font-medium">
                IDR 24.000
              </p>
              <Link
                to="/products"
                className="w-[110px] h-[40px] bg-[#F4991A] border border-black mt-1 rounded-lg text-lg font-bold text-[#000] flex justify-center items-center hover:bg-[#f3ad4b] duration-300"
              >
                <p>Order Now</p>
              </Link>
            </div>
          </div>
        </div>
        {/* Kartu Cappuccino */}
        <div
          className="basis-1/3 py-10 sm:p-0 flex justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="card-coffee bg-[#6B240C] w-[350px] h-[210px] flex flex-col justify-center items-center group relative">
            <div className="card-icon absolute bottom-32">
              <img
                src={cappucino}
                width={170}
                alt=""
                className="group-hover:scale-110 group-hover:rotate-12 duration-300"
              />
            </div>
            <div className="card-content flex flex-col justify-center items-center mt-8">
              <h5 className="text-lg sm:text-2xl mt-10 font-medium">
                Cappuccino
              </h5>
              <p className="text-base sm:text-lg my-1 font-medium">
                IDR 26.000
              </p>
              <Link
                to="/products"
                className="w-[110px] h-[40px] bg-[#F4991A] border border-black mt-1 rounded-lg text-lg font-bold text-[#000] flex justify-center items-center hover:bg-[#f3ad4b] duration-300"
              >
                <p>Order Now</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCoffeeForYouComponents;
