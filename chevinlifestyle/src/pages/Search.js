import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues]=useSearch();
  return (
   <Layout title={'search results'}>
    <div className='containrer'>
      <div className='text-center'>
        <h1>Search results</h1>
        <h6>{values?.results.length<1? "no products found" :`found ${values?.results.length}`}</h6>
        <div className="d-flex flex-wrap mt-4">
        {values?.results.map(p=>(
                    
                      <div className="card m-2" style={{ width: "16rem" }} key={p._id}> 
                      <img src={`/api/v1/product/get-product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                        <strike className="strike">₹{p.original_price}</strike> <span className='price'>₹{p.selling_price}</span> <span className='discount'>({p.discount}% OFF)</span>
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

export default Search
