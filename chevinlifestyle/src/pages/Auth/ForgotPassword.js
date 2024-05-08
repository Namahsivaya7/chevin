import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

const ForgotPassword=()=>{
     
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [answer,setAnswer]=useState("")
  

    const navigate=useNavigate();
   
    const handleSubmit= async (e)=>{
       e.preventDefault()
       try{
         const res= await axios.post('/api/v1/auth/forgot-password',{email,newPassword,answer});
         if(res && res.data.success){
         
         
          navigate("/login")
         }
         else{
          toast.error(res.data.message)
         }
          
       }
       catch(e){
        console.log(e)
        toast.error("something went wrong, please check your email and answer")
       }
    };
    return(
        <>
        <Layout>
        <h1 className='register-now' >Reset Password</h1>
    <div className='register'>
    
    <div className='register-box'>
    <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">
      Email
    </label>
    <input
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder='enter your email'
      required
      />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
       New Password
    </label>
    <input
      type="password"
      value={newPassword}
      onChange={(e)=>setNewPassword(e.target.value)}
      className="form-control"
      id="exampleInputPassword1"
      placeholder='enter your password'
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
    Favorite color
    </label>
    <input
      type="text"
      value={answer}
      onChange={(e)=>setAnswer(e.target.value)}
      className="form-control"
      id="exampleInputPassword1"
      placeholder='enter your Favorite color'
      required
    />
  </div>
  
  
  
  <button type="submit" className="btn btn-primary">
    Login
  </button>
</form>

</div>
    </div>
    
          </Layout>
        </>
        
    )
}
export default ForgotPassword;