import React from 'react'
import { useState } from 'react';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate, useLocation } from "react-router-dom";
import  "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

function Login() {
        const [email,setEmail] = useState("");
        const [password, setPassword] = useState("");
        const[auth,setAuth] = useAuth();

        const navigate = useNavigate();
        const location  = useLocation();

        const handleSubmit = async(e) => {
            e.preventDefault();
            // API
            try {
                const res = await axios.post(
                  "/api/v1/auth/login",
                  {email,password }
                );
                if(res && res.data.success) {
                  toast.success(res.data && res.data.message);
                  setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                  });
                  localStorage.setItem("auth", JSON.stringify(res.data));
                  navigate(location.state || "/");
                } else {
                  toast.error(res.data.message||"something went wrong");
                }
            }
            catch(error) {
              console.log(error);
              toast.error("Something went wrong");
            }
          };

  return (
    <Layout title ={"Sign Up"}>
            
            <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="email"
        value = {email}
        onChange={(e) => setEmail (e.target.value)}
         className="form-control" 
         id="exampleInputEmail1" 
         placeholder="Enter email" 
         autoComplete="off"
         required
         />
      </div>
      <div className="mb-3">
        <input type="password" 
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        className="form-control" 
        id="exampleInputPassword1" 
        placeholder="Enter password"
         autoComplete='off'
        required/>
      </div>
      <div className="mb-3">
      <button type="button"
       class="btn btn-primary"
       onClick={() => {
        navigate("/forgot-password");
       }}
      >
        Forgot password
      </button>
      </div>
      <button type="submit" class="btn btn-primary" >Submit</button>
    </form>
    
            </div>
        </Layout>
  )
}

export default Login
