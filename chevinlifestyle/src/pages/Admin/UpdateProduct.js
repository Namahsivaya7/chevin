import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState,useEffect } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import AdminMenu from '../../components/Layout/AdminMenu'
import {Select} from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
const {Option}=Select
const UpdateProduct = () => {
    const navigate=useNavigate();
    const params=useParams()
    const [categories,setCategories]=useState([]);
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [original_price,setOriginal_price]=useState("");
    const [selling_price,setSelling_price]=useState("");
    const [discount,setDiscount]=useState("");
    const [category,setCategory]=useState("");
    const [photo,setPhoto]=useState("");
    const [id,setId]=useState("")
  //get single product
  const getSingleProduct=async()=>{
  try{
   const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
   setName(data.product.name)
   setId(data.product._id)
   setDescription(data.product.description)
   setOriginal_price(data.product.original_price)
   setSelling_price(data.product.selling_price)
   setDiscount(data.product.discount)
   setCategory(data.product.category._id)
   
  }
  catch(error){
    console.log(error)
  }
  };
  useEffect(()=>{
  getSingleProduct();
  //eslint-disable-next-line
  },[])
  //get al cats
  const getAllCategories=async()=>{
    try{
       const {data}=await axios.get('/api/v1/category/get-category');
       if(data?.success){
       setCategories(data?.category);
       }
    }
    catch(error){
       console.log(error)
       toast.error("something went wronmg in getting categories")
       
       }
    };
   
    
    useEffect(()=>{
        getAllCategories();
    },[]);
    //create product
    const handleUpdate=async(e)=>{
        e.preventDefault()
        try{
            const productData=new FormData()
           
            productData.append("name",name)
            productData.append("description",description)
            productData.append("original_price",original_price)
            productData.append("selling_price",selling_price)
            productData.append("discount",discount)
            productData.append("category",category)
            photo && productData.append("photo",photo)
            const {data}=axios.put(`/api/v1/product/update-product/${id}`,productData)
            if(data?.success){
               
                toast.error(data?.message)
            }
            else{
                toast.success("product updated successfully")
                navigate("/dashboard/admin/products")
               
            }
        }
        catch(error){
            console.log(error)
            toast.error("something went wrong in creating product")
        }
    }
    //delete product
    const handleDelete=async()=>{
        try{
            let answer=window.prompt("Do you want to delete the product permanently?");
            if(!answer) return;
         const {data}=await axios.delete(`/api/v1/product/delete-product/${id}`)
         toast.success("product deleted successfully")
         navigate('/dashboard/admin/products')
        }
        catch(error){
            console.log(error)
            toast.error("error in deleting product")
        }
    }
  return (
    <Layout title={"Dashboard-update Product"}>
    <div className="container-fluid p-3">
    <div className="row" style={{marginTop:50}}>
        <div className="col-md-3">
        <AdminMenu/>
        </div>
        <div className="col-md-6">
        <h1>Update product</h1>
        <div className="m-1">
            <Select bordered={false} placeholder="select a catrgory" size="large" showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value);}} value={category}>
                {categories?.map((c)=>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
            </Select>
            <div className="mb-3">
                <label  className='btn btn-outline-secondary col-md-12'>
                    {photo ? photo.name:"update  photo"}
                    <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.file[0])}hidden/>
                </label>
            </div>
            <div className="mb-3">
                {photo?(
                    <div className='text-center'>
                        <img src={URL.createObjectURL(photo) } alt="product" height={"200px"}className='img img-responsive'/>
                    </div>
                ):(
                    <div className='text-center'>
                        <img src={`/api/v1/product/get-product-photo/${id}`} alt="product" height={"200px"}className='img img-responsive'/>
                    </div> 
                )}
            </div>
            <div className="mb-3">
                <input type="text" value={name} placeholder='write product name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <input type="text" value={description} placeholder='write product desciption' className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="mb-3">
                <input type="number" value={original_price} placeholder='enter original price' className='form-control' onChange={(e)=>setOriginal_price(e.target.value)}/>
            </div>
            <div className="mb-3">
                <input type="number" value={selling_price} placeholder='enter selling price' className='form-control' onChange={(e)=>setSelling_price(e.target.value)}/>
            </div><div className="mb-3">
                <input type="number" value={discount} placeholder='enter discount value' className='form-control' onChange={(e)=>setDiscount(e.target.value)}/>
            </div>
           <div className="mb-3">
            <button className='btn btn-primary m-5' onClick={handleUpdate}>Update product</button>
            <button className='btn btn-primary' onClick={handleDelete}>Delete product</button>
           </div>
        </div>
        </div>
    </div>
    </div>
    
 
</Layout>
  )
}

export default UpdateProduct
