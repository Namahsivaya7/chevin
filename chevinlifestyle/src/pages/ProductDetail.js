import React from 'react'
import { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'

import axios from 'axios'
import { json, useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
    const params=useParams()
    const navigate=useNavigate();
    const [product,setProduct]=useState({})
    const [relatedProducts,setRelatedProducts]=useState([])
    //inistaldetails
    useEffect(()=>{
        if(params?.slug)getProduct()
    },[params?.slug])
    //getprodyct
    const getProduct=async()=>{
        try{
         const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
         setProduct(data?.product)
         getSimilarProducts(data?.product._id,data?.product.category._id);
        }
        catch(error){
            console.log(error)
        }
        
    }
    const getSimilarProducts=async(pid,cid)=>{
        try{
       const {data}=await axios.get(`/api/v1/product/related-products/${pid}/${cid}`)
       setRelatedProducts(data?.products)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <Layout>
        
       
        <div className="row container mt-2">
        <div className="col-md-6">
            <img 
            src={`/api/v1/product/get-product-photo/${product._id}`}
            className='card-img-top'
            alt="mage"
            height="600"
            
            />
        </div>
        <div className="col-md-6 ">
            <h1 className='text-center '>Product Details</h1>
            <h2>{product.name}</h2>
            <h5>{product?.category?.name}</h5>
            <h4>
            <strike className="strike" >₹{product.original_price}</strike> <span className='price'>₹{product.selling_price}</span> <span className='discount'>({product.discount}% OFF)</span>
                        </h4>
            <h5>{product.description}</h5>
            <a href="#" className="btn btn-primary addtocart">
                          Add to cart
                        </a>
            
            
        </div>
        <div className="row container">
        <h4>Similar products</h4>
        {relatedProducts.length<1 && <p>No similar products found</p>}
        <div className="d-flex flex-wrap">
        {relatedProducts?.map(p=>(
                    
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
       
        </div>
        </div>
    </Layout>
  )
}

export default ProductDetail
