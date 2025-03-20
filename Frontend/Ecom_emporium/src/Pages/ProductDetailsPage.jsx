import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ProductDetailsPage = () => {
    const {id}=useParams()
    const [product, setProduct]=useState(null)
    const [quantity, setQuantity]=useState(1)
    const navigate=useNavigate()

    useEffect(()=>{
        fetch(`https://ecommerce-follow-along-mz95.onrender.com/product/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data.data);
            console.log(data.data);
          })
          .catch((err) => console.error("error fetching data", err));
    },[id])

    const handleAddToCart=()=>{
      const token=localStorage.getItem("Token")
      if(token==null){
        alert("Login first")
        navigate('/login')
        return
      }
      fetch("https://ecommerce-follow-along-mz95.onrender.com/cart/add", {
        method: "POST",
        body: JSON.stringify({ productId: product._id, quantity: quantity }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert("Product Added to cart");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if(!product) return <p>Loading...</p>


    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7D1CD] px-4 py-8">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-[#735D78] mb-4 text-center">
              {product.productName}
            </h1>
            <img
              src={`https://ecommerce-follow-along-mz95.onrender.com/uploads/${product.productImage}`}
              alt={product.productName}
              className="w-full h-80 object-cover rounded-xl mb-4 shadow-md"
            />
            <p className="text-[#735D78] text-lg text-justify">
              {product.productDescription}
            </p>
            <p className="text-2xl font-bold text-[#735D78] mt-4">
              Price:{" "}
              <span className="text-[#B392AC]">${product.productPrice}</span>
            </p>
            <div className="mt-6">
              <label className="block text-[#735D78] font-medium mb-2">
                Quantity:
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                className="border border-[#B392AC] p-2 w-20 text-center rounded-lg focus:ring-2 focus:ring-[#735D78] outline-none"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-[#735D78] text-white px-6 py-2 rounded-lg text-lg hover:bg-[#B392AC] transition duration-300 w-full font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </>
    );
}

export default ProductDetailsPage
