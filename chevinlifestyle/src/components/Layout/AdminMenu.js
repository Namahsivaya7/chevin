import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu=()=>{
    return(
        <div className="text-center">
            {/* list-group-item-action*/}
            {/* list-group-item-action */}
            
<div className="list-group">
  <NavLink
    to="/dashboard/admin/create-category" className="list-group-item" activeclassname="active">
    Create Category
  </NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item  " activeclassname="active">
    Create product
  </NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item  " activeclassname="active">
    products
  </NavLink>
  <NavLink to="/dashboard/admin/users" className="list-group-item " activeclassname="active">
    Users
  </NavLink>
  <NavLink to="/" className="list-group-item " activeclassname="active">
    A fourth link item
  </NavLink>
  
</div>
        </div> 
  

        
    )
}
export default AdminMenu