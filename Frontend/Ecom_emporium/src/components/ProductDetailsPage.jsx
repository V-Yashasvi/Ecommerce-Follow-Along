import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProductDetailsPage = ({addToCart}) => {
    const {id}=useParams()
    const [product, setProduct]=useState(null)
    const [quantity, setQuantity]=useState(1)

    useEffect(()=>{
        fetch(`http://localhost:8084/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data.data)
            console.log(data.data)
        })
        .catch((err) => console.err("error fetching data", err));
    },[id])

    const handleAddToCart=()=>{
        addToCart({...product, quantity})
    }

    if(!product) return <p>Loading...</p>


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {product.productName}
            </h1>
            <img
                src={`http://localhost:8084/uploads/${product.productImage}`}
                alt={product.productName}
                className="w-full h-80 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 text-lg">{product.productDescription}</p>
            <p className="text-xl font-semibold text-green-600 mt-4">
                Price: ${product.productPrice}
            </p>

            <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">
                Quantity:
                </label>
                <input
                type="number"
                value={quantity}
                onChange={(e) =>
                    setQuantity(parseInt(e.target.value))
                }
                min="1"
                className="border border-gray-300 p-2 w-20 text-center rounded-md "
                />
            </div>

            <button
                onClick={handleAddToCart}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-600 transition"
            >
                Add to Cart
            </button>
            </div>
        </div>
    );
}

export default ProductDetailsPage
