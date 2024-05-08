import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { FaBasketShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IconContext } from 'react-icons';
import toast from 'react-hot-toast';

const UserMenu = () =>{
    
    const [auth,setAuth]=useAuth();
    const handleLogout=()=>{
      setAuth({
        ...auth,
        user:null,
        token:"",
      });
      localStorage.removeItem("auth");
      toast.success(" Account Logout successfully")
    }
  return (
    <>
    <div className="user-dashboard-heading">
        <h1> {auth?.user?.name}'s Dashboard</h1>
        </div>
    <div className="user-dashboard-items">

        <div className='user-dashboard-item'>
                <div className="user-dashboard-item1">
                    <NavLink to="/dashboard/user/shop"><IconContext.Provider value={{ color: "black", size:"60px", className: "global-class-name" }}>
                        <div>
                        <FaBasketShopping />
                        </div>
                    </IconContext.Provider>
                    </NavLink> 
                </div>
                <div className="user-dashboard-item2">
                    <NavLink to="/dashboard/user/shop" className="active-dashboard">
                        <h3 className='active-dashboard'>Shop</h3>
                    </NavLink> 
                    <h6>Enter Shop</h6>
                </div>
            </div>
        
        
        <div className='user-dashboard-item'>
            <div className="user-dashboard-item1">
                <NavLink to="/dashboard/user/wishlist"><IconContext.Provider value={{ color: "black", size:"60px", className: "global-class-name" }}>
                    <div>
                    <FaHeart />
                    </div>
                 </IconContext.Provider>
                </NavLink> 
            </div>
            <div className="user-dashboard-item2">
                 <NavLink to="/dashboard/user/wishlist" className="active-dashboard">
                       <h3 className='active-dashboard'>Wishlist</h3>
                 </NavLink> 
                 <h6>Favorite Items</h6>
            </div>
        </div>
        <div className='user-dashboard-item'>
            <div className="user-dashboard-item1">
                <NavLink to="/dashboard/user/addresses"><IconContext.Provider value={{ color: "black", size:"60px", className: "global-class-name" }}>
                    <div>
                    <FaHome />
                    </div>
                 </IconContext.Provider>
                </NavLink> 
            </div>
            <div className="user-dashboard-item2">
                 <NavLink to="/dashboard/user/addressses" className="active-dashboard">
                       <h3 className='active-dashboard'>Addresses</h3>
                 </NavLink> 
                 <h6>saved addresses</h6>
            </div>
        </div>
        <div className='user-dashboard-item'>
            <div className="user-dashboard-item1">
                <NavLink to="/dashboard/user/edit-profile"><IconContext.Provider value={{ color: "black", size:"60px", className: "global-class-name" }}>
                    <div>
                    <FaUserEdit />
                    </div>
                 </IconContext.Provider>
                </NavLink> 
            </div>
            <div className="user-dashboard-item2">
                 <NavLink to="/dashboard/user/edit-profile" className="active-dashboard">
                       <h3 className='active-dashboard'> Profile</h3>
                 </NavLink> 
                 <h6>Edit your Profile</h6>
            </div>
        </div>
        <div className='user-dashboard-item'>
            <div className="user-dashboard-item1">
                <NavLink to="/dashboard/user/orders"><IconContext.Provider value={{ color: "black", size:"60px", className: "global-class-name" }}>
                    <div>
                    <FaBoxOpen />
                    </div>
                 </IconContext.Provider>
                </NavLink> 
            </div>
            <div className="user-dashboard-item2">
                 <NavLink to="/dashboard/user/orders" className="active-dashboard">
                       <h3 className='active-dashboard'>Orders</h3>
                 </NavLink> 
                 <h6>Your Orders</h6>
            </div>
        </div>
        <div className='user-dashboard-item'>
            <div className="user-dashboard-item1">
                <NavLink onClick={handleLogout} to="/register"><IconContext.Provider value={{ color: "black", size:"60px", className: "global-class-name" }}>
                    <div>
                    <LuLogOut />
                    </div>
                 </IconContext.Provider>
                </NavLink> 
            </div>
            <div className="user-dashboard-item2">
                 <NavLink  onClick={handleLogout} to="/register" className="active-dashboard">
                       <h3 className='active-dashboard'>Logout</h3>
                 </NavLink> 
                 <h6>Account Logout</h6>
            </div>
        </div>
        


        
    </div>
    
    </>
    
  )
}

export default UserMenu;
