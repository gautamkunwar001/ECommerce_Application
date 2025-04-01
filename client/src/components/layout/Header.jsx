import React from 'react';
import { AiFillShopping } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from "../../context/cart";
import  {Badge} from 'antd';

function Header() {
const[auth, setAuth] = useAuth();
const [ cart ] = useCart();
const categories = useCategory();
// to handle logout
const handleLogout = () => {
  setAuth({
    ...auth,
    user: null,
    token:"",
  });
  localStorage.removeItem("auth");
  toast.success("Logout Successfully");
};
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a className="navbar-brand " href="/"> <AiFillShopping /> ECommerce App</a>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item ">
          <a className="nav-link " aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="/categories"  data-bs-toggle="dropdown" aria-expanded="false">
    Categories
  </a>
  <ul className="dropdown-menu">
    <li>
      <a className ="dropdown-item" href= {"/categories" }> All Categories</a>
    </li>
   {categories?.map(c => (
   
    <li><a className="dropdown-item" href= {`/category/${c.slug}`}>{c.name}</a></li>
  
   ))}
  </ul>
</li>

        {/* // <li className="nav-item">
        //   <a className="nav-link " aria-current="page" href="/category">Category</a>
        // </li> */}
        {
          !auth.user ? (<>
          <li className="nav-item">
          <a className="nav-link " href="/SignUp">SignUp</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/login">Login</a>
        </li>
          </>) : (<>
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user?.name}
          </a>
          <ul class="dropdown-menu">
            <li><a className="dropdown-item"
             href={`/dashboard/${auth?.user?.role ===1 ? "admin" : "user"}` }
             > 
             Dashboard</a></li>
           <li>
           <a 
          onClick={handleLogout} 
          className="dropdown-item" href="/login">Logout</a>
           </li>
        </ul>
        </li>
          </>)
        }
        {/* use Badge for interactive cart count */}
        <li className="nav-item">
          <Badge count = {cart?.length} showZero>
          <a className="nav-link " href="/cart">
          cart </a>
          </Badge>
        </li>
       
      </ul>
        </div>
  </div>
</nav>

    </>
  )
}

export default Header
