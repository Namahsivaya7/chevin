
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PagenotFound from './pages/PagenotFound';
import New from './pages/New';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Careers from './pages/Careers';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import Admindashboard from './pages/Admin/Admindashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import EditProfile from './pages/user/EditProfile';
import Orders from './pages/user/Orders';
import Shop from './pages/user/Shop';
import Addresses from './pages/user/Addresses';
import Wishlist from './pages/user/Wishlist';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import CategoryProduct from './pages/CategoryProduct';
import Cart from './pages/Cart';


function App() {
  return (
    <>
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:slug" element={<ProductDetail/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/category/:slug" element={<CategoryProduct/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/careers' element={<Careers/>}/>
       <Route path='/search' element={<Search/>}/> 

      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/edit-profile' element={<EditProfile/>}/>
        <Route path='user/wishlist' element={<Wishlist/>}/>
        <Route path='user/addresses' element={<Addresses/>}/>
        <Route path='user/shop' element={<Shop/>}/>
        <Route path='user/orders' element={<Orders/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<Admindashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route  path="admin/users" element={<Users/>}/>
      </Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/newarrivals" element={<New/>}/>
      
      <Route path="/*" element={<PagenotFound/>}/>
    </Routes>

   
    </>
  );
}

export default App;
