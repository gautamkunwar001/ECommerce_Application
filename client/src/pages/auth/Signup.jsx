import React from 'react'
import { useState } from 'react';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import  "../../styles/AuthStyles.css";
// import 'react-toastify/dist/ReactToastify.css';
function Signup() {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [answer , setAnswer ] = useState("");
    const navigate = useNavigate();

   
   
    // form submit function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
              "/api/v1/auth/register",
              {name,email,phone,password,address,answer }
            );
            if(res && res.data.success) {
              toast.success(res.data && res.data.message);
              navigate('/login');
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <input type="text" 
    value = {name}
    onChange = {(e) => setName(e.target.value)}
    className="form-control" 
    id="exampleInputname" 
    placeholder="Enter name"
    required 
    autoFocus
    />
  </div>
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
    <input type="phone"
    value = {phone}
    onChange = {(e) => setPhone(e.target.value)}
    className="form-control" 
    id="exampleInputphone" 
    placeholder="Enter Phone number"
    autoComplete='off'
    required />
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
    <input type="address"
    value = {address}
    onChange={(e) => setAddress (e.target.value)}
     className="form-control" 
     id="exampleInputEmail1" 
     placeholder="Enter address" 
     autoComplete="off"
     required
     />
  </div>
  <div className="mb-3">
    <input type="text"
    value = {answer} 
    onChange={(e) => setAnswer (e.target.value)}
     className="form-control" 
     id="exampleInputEmail1" 
     placeholder="What is Your favourite sports " 
     autoComplete="off"
     required
     />
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>

        </div>
    </Layout>
  )
}

export default Signup;
