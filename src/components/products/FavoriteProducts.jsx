import coffeeLate from "../../assets/kopi1.png";
import americano from "../../assets/Coffe2.png";
import cappucino from "../../assets/kopi5.png";

export default function FavoriteProducts() {
  return (
    <div className="basis-1/3 flex flex-col sm:border">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg sm:text-2xl font-bold my-1">
          Favorite Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#707070] my-2">
          The following are the favorite menus at Coffeetopia
        </p>
      </div>
      <div className="flex ms-10 sm:ms-5 items-center">
        <img
          src={coffeeLate}
          alt=""
          className="w-[75px] sm:w-[120px] m-1 me-4"
        />
        <h2 className="text-lg font-bold ms-4">Caffe Latte</h2>
      </div>
      <div className="flex justify-center my-2">
        <div className="line sm:w-[85%] h-[1px] bg-[#707070]"></div>
      </div>
      <div className="flex ms-10 sm:ms-5 items-center">
        <img
          src={americano}
          alt=""
          className="w-[90px] sm:w-[135px] m-1"
        />
        <h2 className="text-lg font-bold ms-4">Mochacinno</h2>
      </div>
      <div className="flex justify-center my-2">
        <div className="line sm:w-[85%] h-[1px] bg-[#707070]"></div>
      </div>
      <div className="flex ms-10 sm:ms-5 items-center">
        <img src={cappucino} alt="" className="w-[90px] sm:w-[125px]" />
        <h2 className="text-lg font-bold ms-4">Cappuccino</h2>
      </div>
    </div>
  )
}
