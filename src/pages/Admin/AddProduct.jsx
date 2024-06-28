import { useNavigate } from "react-router-dom";
import BackgroundAbout from "../../components/background/BackgroundAbout";
import { useEffect, useState } from "react";
import axios, { axiosPrivate } from "../../api/axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category_id: null,
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "category_id" ? parseInt(value, 10) : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/categories");
        const fetchedCategories = response.data.payload;
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            category_id: fetchedCategories[0]?.id,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in product) {
      formData.append(key, product[key]);
    }

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await axiosPrivate.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.status) {
        Swal.fire({
          title: "Failed",
          text: response.data.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        }).then(() => {
          navigate("/products");
          window.location.reload();
        });
        navigate("/products");
      }
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
            <form
              encType="multipart/form-data"
              className="p-4 bg-white border-1 border-[#321313] rounded-md mt-0"
            >
              <h3 className="text-xl text-center text-[#321313] font-bold mb-0 p-4">
                Add Product
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
                  placeholder="enter your product name"
                  className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-[#321313] font-bold"
                >
                  Price:
                </label>
                <input
                  onChange={handleChange}
                  name="price"
                  type="text"
                  id="price"
                  placeholder="enter your product price"
                  className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-[#321313] font-bold"
                >
                  Category:
                </label>
                <select
                  onChange={handleChange}
                  name="category_id"
                  id="category"
                  className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4 focus:border-indigo-500"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-[#321313] font-bold"
                >
                  Description:
                </label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  id="description"
                  placeholder="enter your product description"
                  className="w-full text-[#321313] py-1 md:py-2 bg-white border border-[#321313] rounded-md p-3 md:p-4 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-[#321313] font-bold"
                >
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="px-2 py-1 border rounded"
                  onChange={handleFileChange}
                />
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button
                  onClick={handleSubmit}
                  className="w-full text-white bg-[#591E0A] font-bold rounded-md p-3 md:p-3 text-center flex items-center justify-center mb-4"
                >
                  Add Product
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full text-[#321313] font-bold bg-[#F4991A] rounded-md p-3 md:p-3 text-center flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </BackgroundAbout>
    </div>
  );
};

export default AddProduct;
