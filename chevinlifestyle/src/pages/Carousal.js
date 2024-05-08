import React from 'react';
import 'react-slideshow-image/dist/styles.css'

import {Fade} from 'react-slideshow-image'
import { Col, Row } from 'antd';

const slideImages=[
    {
    url:"/images/cb1.png"
    },
    {
    url:"/images/cb2.png"
    },
    {
    url:"/images/cb3.png"
    },
    
];
const divstyle={
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
    height:"545px",
    // width:"px",
    backgroundSize:"cover"
}
const Carousal = () => {
  return (
    <div className='slide-container'>
      {/* <Row><Col xs={24}> */}
        <Fade >
        {slideImages.map((image,index)=>(
            <div key={index}>
            <div style={{...divstyle,backgroundImage:`url(${image.url})`,backgroundSize:"100%",backgroundRepeat:"no-repeat"}}>

            </div>
            </div>
        ))}
      </Fade>
      {/* </Col></Row> */}
    </div>
  )
}

export default Carousal
