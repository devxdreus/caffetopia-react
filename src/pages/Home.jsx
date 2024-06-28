// Component
import BannerComponents from "../components/banner/BannerComponents";
import CustomerComponents from "../components/customer/CustomerComponents";
import FooterComponents from "../components/footer/FooterComponents";
import BestCoffeeForYouComponents from "../components/services/BestCoffeeForYouComponents";
// Asset
import bestCoffee from "../assets/best-coffee-icon.png";

const Home = () => {
  return (
    <div className="w-full">
      {/* Landing Page */}
      <BannerComponents />

      {/* Discover Best Coffee */}
      <div className="flex flex-col sm:flex-row w-full my-7 sm:my-10 sm:py-7">
        <div className="best-coffee-icon basis-1/2 flex justify-center items-center">
        <img src={bestCoffee} alt="" className="w-[300px] sm:w-[450px]" />
        </div>
        <div
          className="best-coffee-content basis-1/2 flex justify-center items-center flex-col"
          data-aos="fade-down"
          data-aos-delay="250"
        >
         <h3 className="text-[#603809] text-lg sm:text-4xl font-extrabold text-center ">
          Discover The Best Coffee
        </h3>
        <p className="text-[#321313] text-xs sm:text-xl font-medium text-center mt-3 w-[80%]">
          Coffetopia is a coffee shop that provides you with quality coffee
          that helps boost your productivity and helps build your mood. Having
          a cup of coffee is good, but having a cup of real coffee is greater.
          There is no doubt that you will enjoy this coffee more than others
          you have ever tasted.
        </p>
        </div>
      </div>
      {/* Best Coffee For You */}
      <BestCoffeeForYouComponents />
      {/* Loved By Customers */}
      <CustomerComponents />
      {/* Footer */}
      <FooterComponents />
    </div>
  );
};

export default Home;
