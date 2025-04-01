import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import Pagenotfound from "./pages/Pagenotfound";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Forgotpassword  from "./pages/auth/Forgotpassword";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPages from "./pages/CartPages";
// import { ToastContainer, toast } from 'react-toast';
// import React from 'react';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import Layout from "./components/layout/Layout";
function App() {
  return (
   <>
   <Routes>
    <Route path ='/' element={<Homepage />} />
    <Route path ='/product/:slug' element={<ProductDetails />} />
    <Route path ='/categories' element={<Categories />} />
    <Route path ='/cart' element={<CartPages />} />
    <Route path ='/category/:slug' element={<CategoryProduct />} />
    <Route path ='/search' element={<Search />} />
    <Route path ="/dashboard" element={<PrivateRoute />}>
    <Route path ="user" element={<Dashboard />} />
    <Route path ="user/orders" element={<Orders />} />
    <Route path ="user/profile" element={<Profile />} />
    </Route>
    <Route path = "/dashboard" element={<AdminRoute /> }>
    <Route path="admin" element={<AdminDashboard />} />
    <Route path="admin/create-category" element={<CreateCategory />} />
    <Route path="admin/create-product" element={<CreateProduct />} />
    <Route path="admin/product/:slug" element={<UpdateProduct />} />
    <Route path = "admin/products" element={<Products />} />
    <Route path ="admin/users" element ={<User />} />
    </Route>
    <Route path='/forgot-password' element={<Forgotpassword />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/policies' element={<Policies />} />
    <Route path='/*' element={<Pagenotfound />} />
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
    
   </Routes>
   </>
  );
}

export default App;
