import star from "../../assets/star.png";
import person from "../../assets/person.png";

const CustomerComponents = () => {
  return (
    <div className="w-full my-5 sm:my-20">
      {/* Teks animasi fade-up */}
      <div
        className="text-center py-5 sm:py-10"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h3 className="text-[#844934] text-xl sm:text-4xl font-bold text-center">
          Loved by Customer of
        </h3>
        <h3 className="text-[#844934] text-xl sm:text-4xl sm:mt-4 font-bold text-center">
          Happy Customer
        </h3>
        <p className="text-sm sm:text-base text-[#707070] sm:mt-5">
          These are the stories of our customers who have visited us with great
          pleasure
        </p>
      </div>

      {/* Kontainer kartu review */}
      <div className="container-stories-customer flex flex-wrap justify-center">
        <div
          className="card-stories-customer p-3 w-[330px] h-[250px] border border-[#844934] rounded-xl m-5 flex flex-col"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <div className="upper-stories flex justify-between items-center">
            <div className="profile-customer w-[70px] h-[70px] bg-[#B5B5B5] rounded-full flex justify-center items-center">
              <img src={person} alt="" width={35} />
            </div>
            <div className="name-customer">
              <h5 className="text-xl font-bold">Nabilla Rifda R</h5>
              <p className="text-sm">Tegal, Jawa Tengah</p>
            </div>
            <div className="rating-customer flex justify-center items-center h-[30px]">
              <p className="text-base me-1">4.9</p>
              <img src={star} alt="" width={18} className="pb-1" />
            </div>
          </div>
          <div className="comment-stories text-center mt-3">
            <p>
              “Coffetopia cozy atmosphere, friendly staff, fantastic coffe, and
              great pastries, loved the cappuccino and cold brew. Excellent
              service and reasonable prices. Highly recommended!”
            </p>
          </div>
        </div>
        <div
          className="card-stories-customer p-3 w-[330px] h-[250px] border border-[#844934] rounded-xl m-5 flex flex-col"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <div className="upper-stories flex justify-between items-center">
            <div className="profile-customer w-[70px] h-[70px] bg-[#B5B5B5] rounded-full flex justify-center items-center">
              <img src={person} alt="" width={35} />
            </div>
            <div className="name-customer">
              <h5 className="text-xl font-bold">Kamila I. Ilyasa</h5>
              <p className="text-sm">Malang, Jawa Timur</p>
            </div>
            <div className="rating-customer flex justify-center items-center h-[30px]">
              <p className="text-base me-1">4.6</p>
              <img src={star} alt="" width={18} className="pb-1" />
            </div>
          </div>
          <div className="comment-stories text-center mt-3">
            <p>
              “I like it because i like to travel for and still can make my day
              better just by drinking their Caffe Latte.”
            </p>
          </div>
        </div>
        <div
          className="card-stories-customer p-3 w-[330px] h-[250px] border border-[#844934] rounded-xl m-5 flex flex-col"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          <div className="upper-stories flex justify-between items-center">
            <div className="profile-customer w-[70px] h-[70px] bg-[#B5B5B5] rounded-full flex justify-center items-center">
              <img src={person} alt="" width={35} />
            </div>
            <div className="name-customer">
              <h5 className="text-xl font-bold">Alvin Yusuf R</h5>
              <p className="text-sm">Semarang, Jawa Tengah</p>
            </div>
            <div className="rating-customer flex justify-center items-center h-[30px]">
              <p className="text-base me-1">4.7</p>
              <img src={star} alt="" width={18} className="pb-1" />
            </div>
          </div>
          <div className="comment-stories text-center mt-3">
            <p>
              “This is very unusual for my taste, i havent liked coffee before
              but their coffee is the best! and yup, you have to order the
              Spaghetti Carbonara, the best in town.”
            </p>
          </div>
        </div>
        <div
          className="card-stories-customer p-3 w-[330px] h-[250px] border border-[#844934] rounded-xl m-5 flex flex-col"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <div className="upper-stories flex justify-between items-center">
            <div className="profile-customer w-[70px] h-[70px] bg-[#B5B5B5] rounded-full flex justify-center items-center">
              <img src={person} alt="" width={35} />
            </div>
            <div className="name-customer">
              <h5 className="text-xl font-bold">Annisa M</h5>
              <p className="text-sm">Banjarmasin, KalSel</p>
            </div>
            <div className="rating-customer flex justify-center items-center h-[30px]">
              <p className="text-base me-1">4.8</p>
              <img src={star} alt="" width={18} className="pb-1" />
            </div>
          </div>
          <div className="comment-stories text-center mt-3">
            <p>
              “The atmosphere is cozy, with aesthetically pleasing decor and
              relaxing music, it makes every cup of coffee feel special.”
            </p>
          </div>
        </div>
        <div
          className="card-stories-customer p-3 w-[330px] h-[250px] border border-[#844934] rounded-xl m-5 flex flex-col"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <div className="upper-stories flex justify-between items-center">
            <div className="profile-customer w-[70px] h-[70px] bg-[#B5B5B5] rounded-full flex justify-center items-center">
              <img src={person} alt="" width={35} />
            </div>
            <div className="name-customer">
              <h5 className="text-xl font-bold">Moch Adim</h5>
              <p className="text-sm">Jember, Jawa Timur</p>
            </div>
            <div className="rating-customer flex justify-center items-center h-[30px]">
              <p className="text-base me-1">4.5</p>
              <img src={star} alt="" width={18} className="pb-1" />
            </div>
          </div>
          <div className="comment-stories text-center mt-3">
            <p>
              “Their espresso is absolutely amazing! I love how they serve it so
              consistently every time I visit.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerComponents;
