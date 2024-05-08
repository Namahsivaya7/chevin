import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import {useNavigate} from "react-router-dom"
const Cart = () => {
    const [auth,setAuth]=useAuth()
    const [cart,setCart]=useCart()
    const  navigate=useNavigate()
  return (
    <Layout>
       <div className="container">
        <div className="row">
            <div className="col-md-12">
              <h1 className="text-center ">
                {`hello ${auth.token && auth?.user?.name}`}
              </h1>
            </div>
        </div>
       </div>
    </Layout>
      
    
  )
}

export default Cart
