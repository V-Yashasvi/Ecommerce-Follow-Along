import { Link } from "react-router-dom";

const Navbar = () => {
    return (
    <div>
        <nav className="flex justify-end p-8 bg-blue-400 text-white">
        <button className="px-6 py-2 mx-2 text-lg font-semibold bg-blue-800 rounded-lg hover:bg-blue-700">
            <Link to={"/"}>Home</Link>
        </button>
        <button className="px-6 py-2 mx-2 text-lg font-semibold bg-blue-800 rounded-lg hover:bg-blue-700">
            <Link to={"/"}>My-Products</Link>
        </button>
        <button className="px-6 py-2 mx-2 text-lg font-semibold bg-blue-800 rounded-lg hover:bg-blue-700">
            <Link to={"/login"}>Login</Link>
        </button>
        <button className="px-6 py-2 mx-2 text-lg font-semibold bg-green-700 rounded-lg hover:bg-green-600">
            <Link to={"/signup"}>Sign Up</Link>
        </button>
        <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
            <Link to={"/add-product"}>Add Product</Link>
        </button>
        <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
            <Link to={"/cart"}>Cart</Link>
        </button>
        <button className="px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
            <Link to={"/profile"}>Profile</Link>
        </button>
        </nav>
    </div>
    );  
}

export default Navbar
