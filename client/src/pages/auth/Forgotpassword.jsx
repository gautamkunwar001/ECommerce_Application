import React from 'react'
import { useState } from 'react';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import  "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";
function Forgotpassword() { 

    const [email,setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    // const location  = useLocation();

    // form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        // API
        try {
            const res = await axios.post(
              "/api/v1/auth/forgot-password",
              {email,
                newPassword,
            answer
            }
            );
            if(res && res.data.success) {
              toast.success(res.data && res.data.message);
              navigate( "/login");
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
    <Layout title = {"Forgot Password -Ecommerce APP"}> 
      <div className="form-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="email"
        value = {email}
        onChange={(e) => setEmail (e.target.value)}
         className="form-control" 
         id="exampleInputEmail" 
         placeholder="Enter email" 
         autoComplete="off"
         required
         />
      </div>
      <div className="mb-3">
        <input type="password" 
        value = {newPassword}
        onChange = {(e) => setNewPassword(e.target.value)}
        className="form-control" 
        id="exampleInputPassword1" 
        placeholder="Enter new password"
         autoComplete='off'
        required/>
      </div>
      <div className="mb-3">
        <input type="password" 
        value = {answer}
        onChange = {(e) => setAnswer(e.target.value)}
        className="form-control" 
        id="exampleInputPassword1" 
        placeholder="Enter your answer"
         autoComplete='off'
        required/>
      </div>
      
      <button type="submit" class="btn btn-primary" >Reset</button>
    </form>
    
            </div>
    </Layout>
  )
}

export default Forgotpassword
