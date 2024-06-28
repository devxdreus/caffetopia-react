import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import person from "../../assets/person.png";
import { useState } from "react";
import Navlink from "./Navlink";
import useLogout from "../../hooks/useLogout";

// redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";

const Navbar = () => {
  const location = useLocation();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fungsi untuk membuka/menutup menu hamburger
  const openHamburger = () => setIsNavOpen((isNavOpen) => !isNavOpen);

  const signOut = async () => {
    try {
      dispatch(logoutUser());
      await logout();
      navigate("/login", { state: { from: { pathname: "/logout" } } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[70px] p-2 flex flex-row justify-between sm:justify-start">
      {/* Logo */}
      <div className="basis-2/4 sm:basis-1/4">
        <NavLink
          to="/"
          className="w-[100%] md:w-[70%] h-full flex items-center mt-1 ms-2"
          state={{ from: location.pathname }}
        >
          <img className="flex" src={logo} alt="" />
        </NavLink>
      </div>

      {/* Username */}
      <div className="icon-content relative flex sm:hidden justify-center items-center">
        <div className="eclipse bg-[#F4991A] w-[20px] h-[20px] sm:w-[35px] sm:h-[35px] rounded-full flex justify-center items-center">
          <img src={person} alt="" className="w-[10px] sm:w-[20px]" />
        </div>
        <p className="mx-2 text-lg font-bold">{username}</p>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger-menu sm:hidden flex items-center me-5">
        <button
          className="border rounded p-2 w-[35px] h-[35px] flex flex-col justify-between items-center"
          onClick={openHamburger}
        >
          <div className="line w-[20px] h-[2px] bg-[#e5e7eb]"></div>
          <div className="line w-[20px] h-[2px] bg-[#e5e7eb]"></div>
          <div className="line w-[20px] h-[2px] bg-[#e5e7eb]"></div>
        </button>
      </div>

      {/* Hamburger Content */}
      {isNavOpen ? (
        <div className="hamburger-content sm:hidden absolute active w-full h-[350px] bg-[#fff] z-20 left-0 right-0 card-hamburger">
          <div className="flex flex-col justify-center items-center relative">
            <button
              className="border rounded absolute p-2 w-[35px] h-[35px] flex flex-col justify-center items-center top-5 right-5"
              onClick={openHamburger}
            >
              <div className="line w-[20px] h-[2px] bg-[#e5e7eb] origin-center rotate-45"></div>
              <div className="line w-[20px] h-[2px] bg-[#e5e7eb] origin-center -rotate-45 -translate-y-2/3"></div>
            </button>
            {role == "admin" ? (
              <>
                <Navlink
                  pathname={"/products"}
                  text={"Products"}
                  type={"burger"}
                />
                <Navlink pathname={"/orders"} text={"Orders"} type={"burger"} />
                <Navlink pathname={"/report"} text={"Report"} type={"burger"} />
              </>
            ) : (
              <>
                <Navlink pathname={"/"} text={"Home"} type={"burger"} />
                <Navlink
                  pathname={"/products"}
                  text={"Products"}
                  type={"burger"}
                />
                <Navlink
                  pathname={"/checkout"}
                  text={"Checkout"}
                  type={"burger"}
                />
                <Navlink pathname={"/about"} text={"About"} type={"burger"} />
              </>
            )}
            {username ? (
              <div className="flex justify-center items-center font-bold h-full mt-4">
                <NavLink to="/logout" state={{ from: location.pathname }}>
                  <div className="text-center text-xs sm:text-sm px-2 md:text-lg md:px-5 md:py-1 py-2 bg-[#F4991A] rounded-2xl mx-1 sm:mx-2">
                    <p>Logout</p>
                  </div>
                </NavLink>
              </div>
            ) : (
              <div className="flex justify-center items-center font-bold h-full mt-4">
                <NavLink to="/login" state={{ from: location.pathname }}>
                  <div className="text-center text-xs sm:text-sm px-2 md:text-lg md:px-5 md:py-1 py-2 bg-white rounded-2xl mx-1 sm:mx-2">
                    <p>Sign In</p>
                  </div>
                </NavLink>
                <NavLink to="/register" state={{ from: location.pathname }}>
                  <div className="text-center text-xs sm:text-sm px-2 md:text-lg md:px-5 md:py-1 py-2 bg-[#F4991A] rounded-2xl mx-1 sm:mx-2">
                    <p>Sign up</p>
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Navigasi */}
      <div className="hidden sm:flex sm:basis-2/4 sm:justify-center">
        <div className="items-center bg-[#fff] hidden text-sm sm:flex text-[#707070] md:text-lg font-medium">
          {role == "admin" ? (
            <>
              <Navlink pathname={"/products"} text={"Products"} />
              <Navlink pathname={"/orders"} text={"Orders"} />
              <Navlink pathname={"/report"} text={"Report"} />
            </>
          ) : (
            <>
              <Navlink pathname={"/"} text={"Home"} />
              <Navlink pathname={"/products"} text={"Products"} />
              <Navlink pathname={"/checkout"} text={"Checkout"} />
              <Navlink pathname={"/about"} text={"About"} />
            </>
          )}
        </div>
      </div>

      {/* Tombol Autentikasi */}
      {username ? (
        <div className="hidden sm:block basis-3/4 sm:basis-1/4">
          <div className="flex justify-center items-center font-bold h-full">
            <div className="icon-content relative hidden sm:flex justify-center items-center">
              <div className="eclipse bg-[#F4991A] w-[20px] h-[20px] sm:w-[35px] sm:h-[35px] rounded-full flex justify-center items-center">
                <img src={person} alt="" className="w-[10px] sm:w-[20px]" />
              </div>
              <p className="mx-2 text-sm md:text-base font-bold">{username}</p>
            </div>
            <NavLink onClick={signOut}>
              <div className="text-center text-xs sm:text-sm px-2 md:text-lg md:px-5 md:py-1 py-2 bg-[#F4991A] rounded-2xl mx-1 sm:mx-2">
                <p>Logout</p>
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="hidden sm:block basis-3/4 sm:basis-1/4">
          <div className="flex justify-center items-center font-bold h-full">
            <NavLink to="/login" state={{ from: location.pathname }}>
              <div className="text-center text-xs sm:text-sm px-2 md:text-lg md:px-5 md:py-1 py-2 bg-white rounded-2xl mx-1 sm:mx-2">
                <p>Sign In</p>
              </div>
            </NavLink>
            <NavLink to="/register" state={{ from: location.pathname }}>
              <div className="text-center text-xs sm:text-sm px-2 md:text-lg md:px-5 md:py-1 py-2 bg-[#F4991A] rounded-2xl mx-1 sm:mx-2">
                <p>Sign up</p>
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
