import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import ProductForm from "./pages/ProductForm";
import EditProducts from "./pages/EditProducts";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AddressForm from "./pages/AddressForm";
import Addresses from "./pages/Addresses";
import MyOrders from "./pages/MyOrders";
import FirstPage from "./pages/FirstPage";
import Confirmation from "./pages/Confirmation";
import PayPal from "./pages/PayPal";

const RoutesComp = () => {
    return (
    <Routes>
        <Route path="/firstpage" element={<FirstPage />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/add-product" element={<ProductForm />}></Route>
        <Route path="/edit-product/:id" element={<EditProducts />}></Route>
        <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/add-address" element={<AddressForm />}></Route>
        <Route path="/addresses" element={<Addresses />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route>
        <Route path="/orders" element={<MyOrders />}></Route>
        <Route path="/paypal" element={<PayPal />}></Route>
    </Routes>
    );
}

export default RoutesComp
