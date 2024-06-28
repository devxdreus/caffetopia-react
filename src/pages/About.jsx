import cafe from "../assets/cafe.png";
import time from "../assets/jam.jpg";
import BackgroundAbout from "../components/background/BackgroundAbout"; 

const About = () => {
  return (
    <div className="font-poppins">
      <BackgroundAbout>
        <div className="container mx-auto pt-10 pb-8 sm:pb-0">
          {" "}
          {/* Tambahkan margin auto untuk sentralisasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Text content section */}
            <div className="order-2 sm:order-1 flex flex-col justify-center gap-4 -mt-10 p-4 sm:p-0">
              {" "}
              {/* Tambahkan padding untuk margin responsif */}
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold pt-0">
                  Coffetopia
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-[#321313] font-bold mb-6">
                Celebrating the Enjoyment of Coffee from End to End of the World
                </p>
                <p className="text-xs sm:text-sm lg:text-base text-[#321313] font-bold">
                  Welcome to Coffetopia, your ultimate coffee destination where
                  passion meets flavor. Founded in 2024, Coffetopia was born out
                  of a love for exceptional coffee and a desire to create a
                  community of coffee enthusiasts. Our mission is to bring the
                  finest coffee experience to everyone, from seasoned
                  connoisseurs to those just beginning their journey into the
                  world of coffee.
                </p>
              </div>
            </div>
            {/* Image section */}
            <div className="order-1 sm:order-2 flex flex-col justify-center items-center my-4">
              <div data-aos="zoom-in">
                <img
                  src={cafe}
                  alt="Cafe"
                  className="w-[150px] sm:w-[300px] lg:w-[350px] sm:scale-110 m-auto"
                />
              </div>
              <div data-aos="zoom-in" className="mt-4">
                <img
                  src={time}
                  alt="time"
                  className="w-[150px] sm:w-[250px] lg:w-[350px] sm:scale-80 m-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default About;
