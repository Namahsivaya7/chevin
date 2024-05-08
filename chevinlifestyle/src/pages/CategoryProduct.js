import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
const CategoryProduct=()=>{
    const params=useParams()
    const navigate=useNavigate()
    const [products,setProducts]=useState([]);
    const [category,setCategory]=useState([]);
    useEffect(()=>{
   if(params?.slug) getProductByCat()

    },[params?.slug])
    const getProductByCat=async()=>{
        try{
            const {data}=await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)

        }
        catch(error){
            console.log(error)
        }
    }
    

    return(
        <Layout>
            <div className="container mt-3">

         <h1 className="text-center">{category?.name}</h1>
         <h4 className="text-center">{products?.length} result found</h4>
         <div className="row">
         <div className="d-flex flex-wrap">
        {products?.map(p=>(
                    
                      <div className="card m-2" style={{ width: "16rem" }} key={p._id}> 
                      <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} onClick={()=>navigate(`/product/${p.slug}`)}/>
                      <div className="card-body" onClick={()=>navigate(`/product/${p.slug}`)}>
                        <h5 className="card-title" onClick={()=>navigate(`/product/${p.slug}`)}>{p.name}</h5>
                        <p className="card-text">
                        <strike className="strike" >₹{p.original_price}</strike> <span className='price'>₹{p.selling_price}</span> <span className='discount'>({p.discount}% OFF)</span>
                        </p>
                        <a href="#" className="btn btn-primary addtocart">
                          Add to cart
                        </a>
                      </div>
                    </div>
                    
                    ))}
        </div>
       
        {/* <div className='m-2 p-3'>
          {products && products.length <total &&(
            <button className='btn btn-primary'
            onClick={(e)=>{
              e.preventDefault();
              setPage(page +1);
            }}>
              {loading?"loading...":"Loadmore"}
            </button>
          )}
        </div> */}
         </div>
         </div>
        </Layout>
    )
}
export default CategoryProduct;