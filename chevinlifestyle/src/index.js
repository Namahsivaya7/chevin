import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
           <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
  
);


reportWebVitals();
// //============ 
// import React from "react";
// import  ReactDOM  from "react-dom/client";
// import Header from "./Header";
// import Body from "./Body";
// import About from "./About";
// import Contact from "./Contact";
// import Footer from "./Footer";
// import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
// const AppLayout=()=>{
//     return(
//         <div>
//            <Header/>
//            <Outlet/>
//            <Footer/>
//         </div>
//     )
// }
// const appRouter=createBrowserRouter([
//     {
//         path:"/",
//         element:<AppLayout/>,
//         children:[
//             {
//                 path:"/",
//                 element:<Body/>

//             },
//             {
//                 path:"/about",
//                 element:<About/>,

//             },
//             {
//                 path:"/contact",
//                 element:<Contact/>,

//             },
//            ]
//     }
// ])

// const root=ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={appRouter}/>)
