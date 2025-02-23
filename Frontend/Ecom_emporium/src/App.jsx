import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import ProductForm from './components/ProductForm'
import EditProducts from './components/EditProducts'
import ProductDetailsPage from './components/ProductDetailsPage'
import Cart from './components/Cart'
import Profile from './components/Profile'
import AddressForm from './Pages/AddressForm'

function App() {
  const [cart, setCart]=useState([])

  const addToCart=(product)=>{
    setCart([...cart, product])
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/add-product" element={<ProductForm />}></Route>
        <Route path="/edit-product/:id" element={<EditProducts />}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetailsPage addToCart={addToCart} />}
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/add-address" element={<AddressForm />}></Route>
      </Routes>
    </>
  );
}

export default App
