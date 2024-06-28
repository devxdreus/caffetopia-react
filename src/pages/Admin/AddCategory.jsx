import { useNavigate } from "react-router-dom";
import BackgroundAbout from "../../components/background/BackgroundAbout";
import { useState } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/category", category);
      if (!response.status) {
        Swal.fire({
          title: "Failed",
          text: response.data.message,
          icon: "error",
        });
      }
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        navigate("/products");
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="font-poppins">
      <BackgroundAbout>
        <div className="container px-4 py-20 sm:px-0">
          <div className="p-4">
            <div className="p-4 bg-white border-1 border-[#321313] rounded-md mt-0">
              <h3 className="text-xl text-center text-[#321313] font-bold mb-0 p-4">
                Add Category
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-[#321313] font-bold"
                >
                  Name:
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  id="name"
                  placeholder="enter ur category name"
                  className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-[#321313] font-bold"
                >
                  Description:
                </label>
                <input
                  onChange={handleChange}
                  name="description"
                  type="text"
                  id="description"
                  placeholder="enter ur category"
                  className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <button
                  onClick={handleSubmit}
                  className="w-full text-white bg-[#591E0A] font-bold rounded-md p-3 md:p-3 text-center flex items-center justify-center mb-4"
                >
                  Add Category
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full text-[#321313] font-bold bg-[#F4991A] rounded-md p-3 md:p-3 text-center flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default AddCategory;
