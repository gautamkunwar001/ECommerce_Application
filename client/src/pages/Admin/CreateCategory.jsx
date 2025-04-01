import React , { useEffect, useState } from 'react'; 
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from "axios";
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from "antd";

 function CreateCategory() {
    const [categories , setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible ] = useState(false);
    const [updatedName, setUpdatedName] = useState(null); 
    const [ selected, setSelected ] = useState("");
    // hadle form 
    const handleSubmit = async (e) => {
        e.preventDefault() ;
        try {
            const { data } = await axios.post("/api/v1/category/create-category",{
                name
            });
            if(data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error (data.message);
            }
        }
         catch(error) {
            console.log(error);
            toast.error("something went wrong in input form");
         }
    }
    // get all category
    const getAllCategory = async() => {
        try {
            const { data }  = await axios.get("/api/v1/category/get-category");
            if(data?.success) {
                setCategories(data?.category);
            }
        }  catch(error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    // useeffect for 
    useEffect(() => {
        getAllCategory();
    }, []);

    // update category
    const handlUpdate = async(e)  => {
        e.preventDefault();
        try{
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if(data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        }
        catch(error) {
            toast.error("something went wrong");
        }
    }    

    // delete category
    const handleDelete = async(pid)  => {
        try{
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pid}`,
            );
            if(data.success) {
                toast.success(`category  is deleted`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        }
        catch(error) {
            toast.error("something went wrong");
        }
    }

  return (
    <Layout title={"Dahsboard - Create product"}>
        <div className="containner-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
            <AdminMenu />
        </div>
        <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
                <CategoryForm  handleSubmit = {handleSubmit} 
                value={name} 
                setValue={setName}
                />
            </div>
            <div className="w-75">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {categories.map((c) => ( 
        <>
         <tr>
        <td key={c._id}>{c.name}</td>
        <td>
       <button className="btn btn-primary ms-2" 
       onClick={() => {setVisible(true);
        setUpdatedName(c.name);
        setSelected(c); 
        }
       }>Edit</button>
       <button className="btn btn-danger ms-2" 
       onClick = {() => {
        handleDelete(c._id)
       }}
       >Delete</button>
        </td>
        </tr>
      </>
      ))}
  </tbody>
</table>
            <Modal 
            onCancel={() => setVisible(false)} 
            footer={null}
            visible={visible}
            >
                <CategoryForm value={updatedName} 
                setValue={setUpdatedName}
                handleSubmit={handlUpdate} />
                </Modal>    
        </div>
        </div>
        </div>
    </div>
   </Layout>
  )
}

export default CreateCategory;
