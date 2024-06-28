import { useState } from "react";
import EYE_IMAGE from "../../assets/eye.png";

// Komponen InputComponents yang menerima beberapa props
export default function InputComponents({
  label,
  name,
  type,
  onChange,
  isPassword,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  // Fungsi mengubah visibilitas password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="w-full flex items-start justify-between text-[#321313] font-bold text-xs md:text-sm mb-2"
      >
        {label}
      </label>
      {isPassword ? ( // Mengecek apakah input adalah password?
        <div className="relative w-full">
          <input
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder ? placeholder : "Enter your password"}
            onChange={onChange}
            className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4  focus:border-indigo-50 "
          />
          <img
            src={EYE_IMAGE}
            className="h-5 md:h-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
            alt="Toggle Password Visibility"
          />
        </div>
      ) : (
        // Jika bukan password, render input biasa
        <input
          id={name}
          type={type}
          name={name}
          placeholder={
            placeholder ? placeholder : `Enter your ${label.toLowerCase()}`
          }
          onChange={onChange}
          className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313]   rounded-md p-3 md:p-4  focus:border-indigo-500"
        />
      )}
    </div>
  );
}
