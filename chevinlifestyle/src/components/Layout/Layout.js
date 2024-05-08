import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

import {Toaster} from 'react-hot-toast'

const Layout = ({children,title}) => {
  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                
            </Helmet>
        <Header/>
        <main style={{minHeight:"80vh"}}>
        <Toaster/>
        {children}
        </main>
        <Footer/>
    </div>
  )
}
Layout.defaultProps={
  title:"Chevin Lifestyle"
}

export default Layout
