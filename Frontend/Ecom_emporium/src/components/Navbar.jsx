import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <div>
        <nav className="flex justify-end p-8 bg-[#D1B3C4] text-white">
          <button className="px-6 py-2 mx-2 text-lg font-semibold bg-[#735D78] rounded-lg hover:bg-[#B392AC]">
            <Link to={"/"}>Home</Link>
          </button>
          {/* <button className="px-6 py-2 mx-2 text-lg font-semibold bg-blue-800 rounded-lg hover:bg-blue-700">
            <Link to={"/"}>My-Products</Link>
          </button> */}
          {/* <button className="px-6 py-2 mx-2 text-lg font-semibold bg-blue-800 rounded-lg hover:bg-blue-700">
            <Link to={"/login"}>Login</Link> */}
          {/* </button> */}
          {/* <button className="px-6 py-2 mx-2 text-lg font-semibold bg-green-700 rounded-lg hover:bg-green-600">
            <Link to={"/signup"}>Sign Up</Link>
        </button> */}
          <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 border-[#B392AC] text-[#735D78] rounded-lg hover:bg-[#E8C2CA]">
            <Link to={"/add-product"}>Add Product</Link>
          </button>
          <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 border-[#B392AC] text-[#735D78] rounded-lg hover:bg-[#E8C2CA]">
            <Link to={"/cart"}>Cart</Link>
          </button>
          <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 border-[#B392AC] text-[#735D78] rounded-lg hover:bg-[#E8C2CA]">
            <Link to={"/orders"}>My Orders</Link>
          </button>
          <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 border-[#B392AC] text-[#735D78] rounded-full hover:bg-[#E8C2CA]">
            <Link to={"/profile"}>Profile</Link>
          </button>
        </nav>
      </div>
    );  
}

export default Navbar
