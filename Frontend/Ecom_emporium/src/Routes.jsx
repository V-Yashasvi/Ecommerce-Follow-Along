import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Route, Routes } from "react-router-dom";
import ProductForm from "./Pages/ProductForm";
import EditProducts from "./Pages/EditProducts";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Cart from "./Pages/Cart";
import AddressForm from "./Pages/AddressForm";
import Addresses from "./Pages/Addresses";
import MyOrders from "./Pages/MyOrders";
import FirstPage from "./Pages/FirstPage";
import PayPal from "./Pages/PayPal";
import Confirmation from "./Pages/Confirmation";
import Profile from "./Pages/Profile";

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
        <Route path="/confirmation" element={<Confirmation/>}></Route>
        <Route path="/orders" element={<MyOrders />}></Route>
        <Route path="/paypal" element={<PayPal />}></Route>
    </Routes>
    );
}

export default RoutesComp
