import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: [],
  });
  useEffect(() => {
    fetch(`https://ecommerce-follow-along-mz95.onrender.com/product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setProduct({
            productName: res.data.productName || "",
            productDescription: res.data.productDescription || "",
            productPrice: res.data.productPrice || "",
            productImage: res.data.productImage || [],
          });
        }
      })
      .catch((err) => console.log("Error fetching product:", err));
  }, [id]);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files)
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImage: [...prevProduct.productImage, ...filesArray], 
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productDescription", product.productDescription);
    formData.append("productPrice", product.productPrice);
    product.productImage.forEach((image) => {
      formData.append("productImage[]", image);
    });
    try {
      await axios.put(
        `https://ecommerce-follow-along-mz95.onrender.com/product/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-lg mt-24 mx-auto p-6 bg-[#F7D1CD] shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-[#735D78] text-center mb-4">
        Edit Product
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-[#735D78]">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          placeholder="Enter Product Name"
          className="mt-1 block w-full p-2 border border-[#B392AC] rounded-lg focus:ring-2 focus:ring-[#735D78] outline-none"
          value={product.productName}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium text-[#735D78]">
          Product Description
        </label>
        <input
          type="text"
          name="productDescription"
          placeholder="Enter Product Description"
          className="mt-1 block w-full p-2 border border-[#B392AC] rounded-lg focus:ring-2 focus:ring-[#735D78] outline-none"
          value={product.productDescription}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium text-[#735D78]">
          Product Price
        </label>
        <input
          type="text"
          name="productPrice"
          placeholder="Enter Product Price"
          className="mt-1 block w-full p-2 border border-[#B392AC] rounded-lg focus:ring-2 focus:ring-[#735D78] outline-none"
          value={product.productPrice}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium text-[#735D78]">
          Product Images
        </label>
        <input
          type="file"
          multiple
          className="mt-1 block w-full p-2 border border-[#B392AC] rounded-lg cursor-pointer bg-white shadow-sm"
          onChange={handleImageChange}
        />

        <button
          type="submit"
          className="w-full bg-[#735D78] text-white py-2 px-4 rounded-lg text-lg hover:bg-[#B392AC] transition duration-300 font-semibold"
        >
          Edit Product
        </button>
      </form>
    </div>
    </>
  );
};

export default EditProducts;
