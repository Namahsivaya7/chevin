import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
const Login = () => {
   
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth();

    const navigate=useNavigate();
    const location=useLocation();
    const handleSubmit= async (e)=>{
       e.preventDefault()
       try{
         const res= await axios.post('/api/v1/auth/login',{email,password});
         if(res && res.data.success){
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          });
          localStorage.setItem('auth', JSON.stringify(res.data));
          navigate(location.state||"/")
         }
         else{
          toast.error(res.data.message)
         }
          
       }
       catch(e){
        console.log(e)
        toast.error("something went wrong, please check your email and password")
       }
    };
    console.log(process.env.REACT_APP_API)
  return (
    <Layout title={"Register-Chevin lifestyle"}>
    <h1 className='register-now' >Login page</h1>
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
  
  
  
  <button type="submit" className="btn btn-primary">
    Login
  </button>
</form>
<h4 className='already-a-user'>Forgot password? <span><Link className="login-here"to="/forgot-password">Reset password</Link></span></h4>
</div>
    </div>
    
     
   </Layout>
  )
}

export default Login;
