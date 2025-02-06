// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import ProductForm from './components/ProductForm'
import EditProducts from './components/EditProducts'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/add-product' element={<ProductForm/>}></Route>
        <Route path='/edit-product/:id' element={<EditProducts/>}></Route>
      </Routes>
      {/* <ProductForm></ProductForm> */}
    </>
  )
}

export default App
