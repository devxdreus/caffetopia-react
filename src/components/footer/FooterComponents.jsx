import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo2.png";
import iconIg from "../../assets/icon-ig.png";
import iconWa from "../../assets/icon-wa.png";

const FooterComponents = () => {
  return (
    <div className="w-full bg-[#F2F2F2] flex flex-col sm:flex-row px-5 py-2">
      {/* Bagian kiri footer */}
      <div className="sm:basis-1/2 flex flex-col px-5">
        {/* Link ke halaman utama untuk logo */}
        <NavLink
          to="/"
          className="flex justify-center sm:justify-start items-center m-0 p-0"
        >
          <img src={logo} alt="" width={180} />
        </NavLink>
        {/* Deskripsi singkat coffetopia */}
        <p className="text-[#707070] text-base sm:text-lg sm:my-2">
          Coffetopia is a store sells some good meals, <br /> and especially
          coffee. We provide high quality beans.
        </p>
        {/* Icon Sosmed */}
        <div className="icon-footer flex my-2">
          <a
            className="eclipse-wa w-[45px] h-[45px] bg-[#321313] rounded-full flex justify-center items-center"
            href="https://wa.me/+6282314792231"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconWa} alt="WhatsApp" width={25} />
          </a>
          <a
            className="eclipse-ig w-[45px] h-[45px] bg-[#321313] rounded-full flex justify-center items-center ms-2"
            href="https://www.instagram.com/coffetopia_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconIg} alt="Instagram" width={24} />
          </a>
        </div>
        <p className="text-[#707070] text-base sm:text-lg my-2">
          (c) 2024 Coffetopia
        </p>
      </div>

      {/* Bagian kanan footer */}
      <div className="sm:basis-1/2 flex justify-evenly sm:justify-end">
        <div className="right-footer w-[90%] sm:w-[70%] flex text-[#707070] text-base sm:text-lg mt-2 sm:mt-0">
          <div className="basis-1/2 flex flex-col justify-center">
            <h5 className="font-bold mb-3">Product</h5>
            <Link>Download</Link>
            <Link>Pricing</Link>
            <Link>Locations</Link>
            <Link>Countries</Link>
            <Link>Blog</Link>
          </div>
          <div className="basis-1/2 flex flex-col justify-center">
            <h5 className="font-bold mb-3">Engage</h5>
            <Link>Coffe Shop?</Link>
            <Link>FAQ</Link>
            <Link to={'/about'}>About Us</Link>
            <Link>Privacy Policy</Link>
            <Link>Terms of Services</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponents;
