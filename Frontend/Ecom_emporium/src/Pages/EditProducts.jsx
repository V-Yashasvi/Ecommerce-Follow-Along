import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
    fetch(`http://localhost:8084/product/${id}`)
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
      await axios.put(`http://localhost:8084/product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="max-w-lg mt-24 mx-auto p-6 bg-blue-200 shadow-lg rounded-lg">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-800">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          placeholder="Enter Product Name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={product.productName}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium text-gray-800">
          Product Description
        </label>
        <input
          type="text"
          name="productDescription"
          placeholder="Enter Product Description"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={product.productDescription}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium text-gray-800">
          Product Price
        </label>
        <input
          type="text"
          name="productPrice"
          placeholder="Enter Product Price"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={product.productPrice}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium text-gray-800">
          Product Images
        </label>
        <input
          type="file"
          multiple
          className="mt-1 block w-full p-2 border border-gray-400 rounded"
          onChange={handleImageChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
