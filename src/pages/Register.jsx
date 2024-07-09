import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import COFFEE_IMAGE from "../assets/sign.jpeg";
import LOGO_IMAGE from "../assets/logo2.png";
import InputComponents from "../components/authentication/InputComponents";

// redux
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  }); // State untuk menyimpan username, email, dan password

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }; // Fungsi mengubah nilai state user ketika input berubah

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(user, navigate));
  };

  return (
    <div className="h-screen mx-auto flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full overflow-hidden">
        <img
          src={COFFEE_IMAGE}
          className="w-full h-full object-cover"
          alt="Cover"
        />
      </div>
      <div className="w-full md:w-1/2 h-3/4 md:h-full bg-white flex flex-col justify-center items-center p-10">
        <div className="w-11/12 md:w-2/3">
          <img src={LOGO_IMAGE} className="w-20 h-6 mb-4" alt="Logo" />
          <h3 className="text-2xl md:text-3xl text-[#321313] font-bold mb-4">
            Sign Up
          </h3>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <InputComponents
              label={"Username :"}
              type={"text"}
              name={"username"}
              onChange={handleChange}
              placeholder={"enter your username"}
            />

            <InputComponents
              label={"Email :"}
              type={"email"}
              name={"email"}
              onChange={handleChange}
              placeholder={"enter your email"}
            />

            <InputComponents
              label={"Password :"}
              type={"password"}
              name={"password"}
              onChange={handleChange}
              isPassword={true}
              placeholder={"enter your password"}
            />

            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white bg-[#591E0A] font-bold rounded-md p-2 md:p-3 text-center flex items-center justify-center"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="w-full flex items-center justify-center ">
            <p className="text-xs md:text-sm  text-[#321313] font-bold">
              Already have an account ?
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <Link
              to="/login"
              className="w-full text-[#321313] font-bold  bg-[#F4991A] rounded-md p-2 md:p-3 text-center flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
