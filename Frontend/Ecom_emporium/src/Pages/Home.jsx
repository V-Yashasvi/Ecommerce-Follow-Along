import Card from '../components/Card';
import { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Home = () => {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
  let [productData, setProductData]=useState([])
  // let email=useSelector((state)=>state.user.email)

  useEffect(()=>{
    fetch("http://localhost:8084/product").then((res)=>res.json()).then((res)=>{
      console.log(res)
      if(res.message=="Login Pls"){
        alert("Login first")
        navigate('/login')
      }
      setProductData(res.data)
      setLoading(false);
    }).catch((err)=>{
      console.log(err)
      setLoading(false); 
    })
  },[])

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Token");
    if (token == null) {
      alert("login first");
      navigate("/login");
      return 
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      let response = await axios.delete(
        `http://localhost:8084/product/delete/${id}`
      );
      console.log(response.data.message);
      const filtered_data = productData.filter((e) => e._id !== id);
      setProductData(filtered_data);
      setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7D1CD] text-[#735D78]">
      <Navbar />
      <div className="container mx-auto mt-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {productData?.map((product, index) => (
            <Card key={index} product={product} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home
