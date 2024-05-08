import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
        const {data}=await axios.get(`api/v1/product/search/${values.keyword}`);
        setValues({...values,results:data});
        navigate("/search");
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
  <input
    className="form-control search me-2"
    type="search"
    placeholder="Search for products"
    aria-label="Search"
    value={values.keyword}
    onChange={(e)=>setValues({...values,keyword:e.target.value})}
    style={{width:350}}
  />
  <button className="btn btn-outline-success search" type="submit" style={{marginRight:0}}>
  <FaSearch />
  </button>
</form>

    </div>
  )
}

export default SearchInput
