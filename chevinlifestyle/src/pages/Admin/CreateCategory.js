import React from 'react';
import { useState,useEffect } from 'react';
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'
const CreateCategory=()=>{
    const [categories,setCategories]=useState([])
    const [name,setName]=useState('');
    const [visible,setVisible]=useState(false)
    const [selected,setSelected]=useState(null)
    const [updatedName,setUpdatedName]=useState("")
    const handlesubmit= async(e)=>{
        e.preventDefault()
        try{
           const {data}=await axios.post("/api/v1/category/create-category",{name,})
            if(data?.success){
                toast.success(`${name} is created`);
                getAllCategories();

            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error)
            toast.error("something went wrong")
        }
    }
    //get all cats
    const getAllCategories=async()=>{
        try{
           const {data}=await axios.get('/api/v1/category/get-category');
           if(data?.success){
           setCategories(data?.category);
           }
        }
        catch(error){
           console.log(error)
           toast.error("somrthing went wronmg in getting categories")

           }
        };
    useEffect(()=>{
        getAllCategories();
    },[])

    //update cataegory
    const handleUpdate=async(e)=>{
        e.preventDefault()
        try{
          const  {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
          if(data.success){
            toast.success(`${updatedName} is updated`)
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategories();
          }
          else{
            toast.error(data.message);
          }
        }
        catch(error){
            toast.error("something went wromg")
        }
    }
    //DELETE CATS
    const handleDelete=async(pId)=>{
        
        try{
          const  {data}=await axios.delete(`/api/v1/category/delete-category/${pId}`);
          if(data.success){
            toast.success(`${name} is deleted`);
             getAllCategories();
          }else{
            toast.error(data.message);
          }
        }
        catch(error){
            toast.error("something went wromg")
        }
    }

    return(
       
        <Layout title={"Dashboard-Create Category"}>
            <div className="container-fluid p-3" id='adminCreateCategory' style={{marginTop:20}}>
                <div className="row" style={{marginTop:50}}>
                    <div className="col-md-3" style={{zIndex:1}}>
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                    <h1> Manage category</h1>
                    <div className='p-3 w-50' style={{margin:0}}>
                    <CategoryForm handlesubmit={handlesubmit} value={name} setValue={setName}/>
                    </div>
                    <>
                    <br/>
                    <br/>
                    </>
                    <div className='w-75'>
                    <h4>Existing Categories</h4>

                    <table className="table">
                        <thead>
                            <tr>
                            
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            
                             {categories?.map(c=>(
                                 <>
                                   <tr>
                                     <td key={(c._id)}>{c.name}</td>
                                     <td>
                                     <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);
                                                                                      setUpdatedName(c.name);
                                                                                      setSelected(c);
                                                                                      }} style={{margin:"5px 0"}}>
                                        Edit</button>
                                     <button className='btn btn-primary ms-2'onClick={()=>{handleDelete(c._id)}}>delete</button>
                                     </td>

                                   </tr>
                                </>
                            ))}
                        </tbody>
                        </table>

                    </div>
                    <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handlesubmit={handleUpdate}/>
                    </Modal>
                    </div>
                </div>
            </div>

        </Layout>
       
    )
}
export default CreateCategory