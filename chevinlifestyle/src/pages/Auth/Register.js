import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [answer,setAnswer]=useState("")
    const navigate=useNavigate();
    const handleSubmit= async (e)=>{
       e.preventDefault()
       try{
         const res= await axios.post('/api/v1/auth/register',{name,email,password,phone,answer});
         if(res && res.data.success){
          toast.success(res.data.message)
          navigate("/login")
         }
         else{
          toast.error(res.data.message)
         }
          
       }
       catch(e){
        console.log(e)
        toast.error("something went wrong")
       }
    };
    console.log(process.env.REACT_APP_API)
  return (
   <Layout title={"Register-Chevin lifestyle"}>
    <h1 className='register-now' >Register here</h1>
    <div className='register'>
    
    <div className='register-box'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">
      Name
    </label>
    <input
      type="text"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder='enter your name'
      required
      />
    
  </div>
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
      Password
    </label>
    <input
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="form-control"
      id="exampleInputPassword1"
      placeholder='enter your password'
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">
      Phone Number
    </label>
    <input
      type="text"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder='enter your mobile number'
      required
      />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">
      Security Question
    </label>
    <input
      type="text"
      value={answer}
      onChange={(e)=>setAnswer(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder='what is your favorite color'
      required
      />
    
  </div>
 
  
  
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
</div>
<h4 className='already-a-user'>Already a user? <span><Link className="login-here"to="/login">Login here</Link></span></h4>
    </div>
    
     
   </Layout>
  )
}

export default Register;
