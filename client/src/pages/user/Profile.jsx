import React, {useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import  { useAuth } from  "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
function Profile() {
    // context
    const [ auth, setAuth ] = useAuth();
    // state
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    // get user data
    useEffect(() => {
        const {email, name, phone, address} = auth.user
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);

    },   [auth?. user]);

     // form submit function
     const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
              "/api/v1/auth/profile",
              {name,email,phone,password,address,answer }
            );
           if(data?.error) {
            toast.error(data?.error)
           } else {
            setAuth({...auth, user:data?.updatedUser})
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updatedUser;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated Succesfully");
           }
        }
        catch(error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };


  return (
    <Layout title={"your profile"}>
     <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu />
            </div>
            <div className="col-md-9">
            <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">User Profile</h1>
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
    //  required
     disabled
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
    // required 
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
  <button type="submit" class="btn btn-primary" >Update</button>
</form>
    </div>
            </div>
        </div>
     </div>
         </Layout>
  )
}

export default Profile;
