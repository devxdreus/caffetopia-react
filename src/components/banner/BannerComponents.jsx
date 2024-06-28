import heart from "../../assets/heart.png";
import maps from "../../assets/maps.png";
import banner from "../../assets/banner.png";
import person from "../../assets/person.png";

const BannerComponents = () => {
  return (
    <div className="flex flex-col bg-[#fff] relative sm:pb-20">
      {/* Gambar banner */}
      <img src={banner} alt="" />
      <div className="opacity-10 absolute z-5 left-0 right-0 bottom-0 top-0"></div>
      <div className="relative md:absolute z-7 flex justify-center bottom-0 w-full">
        <div className="landing-content rounded-none flex flex-col h-[250px] w-full md:flex-row md:w-[75%] md:h-[170px] bg-[#fff] md:rounded-3xl">
          <div className="basis-1/3 flex ms-20 sm:m-0 sm:justify-center items-center">
            {/* Menampilkan jumlah staff */}
            <div className="flex justify-center items-center">
              <div className="icon-content relative">
                <div className="eclipse bg-secondary w-[40px] h-[40px] sm:w-[65px] sm:h-[65px] rounded-full flex justify-center items-center">
                  <img src={person} alt="" className="w-[20px] sm:w-[30px]" />
                </div>
              </div>
              <div className="desc-content flex flex-col justify-center ms-4">
                <h3 className="font-extrabold text-sm sm:text-lg">55 +</h3>
                <p className="font-base text-sm sm:text-base">Staff</p>
              </div>
            </div>
          </div>
          {/* Menampilkan jumlah customer */}
          <div className="basis-1/3 flex ms-20 sm:m-0 sm:justify-between items-center">
            <div className="hidden sm:block line w-[2px] h-[120px] bg-[#D9D9D9]"></div>
            <div className="flex justify-center items-center">
              <div className="icon-content relative">
                <div className="eclipse bg-secondary w-[40px] h-[40px] sm:w-[65px] sm:h-[65px] rounded-full flex justify-center items-center">
                  <img src={heart} alt="" className="w-[25px] sm:w-[43px]" />
                </div>
              </div>
              <div className="desc-content flex flex-col justify-center ms-4">
                <h3 className="font-extrabold text-sm sm:text-lg">2.4K +</h3>
                <p className="font-base text-sm sm:text-base">Customer</p>
              </div>
            </div>
            <div className="hidden sm:block line w-[2px] h-[120px] bg-[#D9D9D9]"></div>
          </div>
          {/* Menampilkan jumlah toko */}
          <div className="basis-1/3 flex ms-20 sm:m-0 sm:justify-center items-center">
            <div className="flex justify-center items-center">
              <div className="icon-content relative">
                <div className="eclipse bg-secondary w-[40px] h-[40px] sm:w-[65px] sm:h-[65px] rounded-full flex justify-center items-center">
                  <img src={maps} alt="" className="w-[25px] sm:w-[45px]" />
                </div>
              </div>
              <div className="desc-content flex flex-col justify-center ms-4">
                <h3 className="font-extrabold text-sm sm:text-lg">200 +</h3>
                <p className="font-base text-sm sm:text-base">Stores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComponents;
