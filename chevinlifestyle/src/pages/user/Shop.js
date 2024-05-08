import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import { useAuth } from '../../context/auth'
import { useState,useEffect } from 'react'
import axios from 'axios';
import {Checkbox} from 'antd'
import { Prices } from '../../components/Prices.js';
import {Radio} from "antd"
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart.js';
import toast from "react-hot-toast"
const Shop = () => {
  const [cart,setCart]=useCart([]);
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  //get all categories
  const getAllCategories=async()=>{
    try{
      const {data}=await axios.get("/api/v1/category/get-category");
      if(data?.success){
        setCategories(data?.category);
      }

    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllCategories();
    getTotal();
  },[])
  //get all produxts
  const getAllProducts=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    }
    catch(error){
      setLoading(false);
      console.log(error)
    }
  }
  
  //get total count
const getTotal=async()=>{
  try{
   const {data}=await axios.get('/api/v1/product/product-count')
   setTotal(data?.total)
  }
  catch(error){
  console.log(error)
  }
} 
useEffect(()=>{
  if(page===1)return;
  loadMore();
},[page]);
//load more
const loadMore=async()=>{
  try{
    setLoading(true)
  const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
  setLoading(false)
  setProducts([...products,...data?.products])
  }
  catch(error){
    setLoading(false)
  }
}

  //filter by categories
  const handleFilter=async(value,id)=>{
    let all=[...checked]
    if(value){
      all.push(id)
    }
    else{
      all=all.filter(c=>c!==id)
    }
    setChecked(all);
  }
  useEffect(()=>{
    if(!checked.length|| !radio.length)getAllProducts();
    
  },[checked.length,radio.length])
  useEffect(()=>{
  if(checked.length||radio.length) filteredProducts()
  },[checked,radio])
  //get filtered products
  const filteredProducts=async()=>{
    try{
    const {data}=await axios.post('/api/v1/product/product-filters',{checked,radio})
    setProducts(data?.products)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    
    <Layout title={"Dashboard-Shop"}>
     <div className="row mt-3">
      <div className="col-md-3">
        <h4 className="text-center mt-4 ">Filter by Category</h4>
        <div className="d-flex flex-column ">
        {categories?.map(c=>(
          <Checkbox  key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
            {c.name}
          </Checkbox>
        ))}
        
         </div>
         {/*price filter */}
         <h4 className="text-center mt-4">Filter by Price</h4>
        <div className="d-flex flex-column ">
         <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
          {Prices?.map((p)=>(
            <div key={p._id}>
                 <Radio value={p.array}>{p.name}</Radio>
            </div>

          ))}
         </Radio.Group>
        
         </div>
         <div className='d-flex flex-column'>
          <button className='btn btn-primary reset' onClick={()=>window.location.reload()}>Reset</button>
         </div>
      </div>
      <div className="col-md-9">
        {/* {JSON.stringify(radio,null,4)} */}
        <h1 className='text-center'>all products</h1>
        
        <div className="d-flex flex-wrap">
        {products?.map(p=>(
                    
                      <div className="card m-2" style={{ width: "16rem" }} key={p._id}> 
                      <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} onClick={()=>navigate(`/product/${p.slug}`)}/>
                      <div className="card-body">
                        <h5 className="card-title" onClick={()=>navigate(`/product/${p.slug}`)}>{p.name}</h5>
                        <p className="card-text">
                        <strike className="strike" >₹{p.original_price}</strike> <span className='price'>₹{p.selling_price}</span> <span className='discount'>({p.discount}% OFF)</span>
                        </p>
                        <a href="#" className="btn btn-primary addtocart" onClick={()=>{setCart([...cart,p]);
                          toast.success("product added to cart")}}>
                          Add to cart
                        </a>
                      </div>
                    </div>
                    
                    ))}
        </div>
       
        <div className='m-2 p-3'>
          {products && products.length <total &&(
            <button className='btn btn-primary'
            onClick={(e)=>{
              e.preventDefault();
              setPage(page +1);
            }}>
              {loading?"loading...":"Loadmore"}
            </button>
          )}
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default Shop
