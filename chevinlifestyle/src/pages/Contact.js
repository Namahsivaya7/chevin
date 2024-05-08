import React from 'react'
import Layout from '../components/Layout/Layout';

const Contact = () => {
  return (
    <Layout title={"contact us-Chevin Lifestyle"}>
    <div>
      <div className="aboutus-header">
            <h1 >Noventa Lifestyle pvt ltd</h1>
           </div>
           <div className='contact-boxes'>
            <div className='contact-box'>
              <img className=" callimg" src=" https://t4.ftcdn.net/jpg/02/41/59/15/360_F_241591549_GKnzteKFt3BMri5zHOFRFCQg8VmI7JaD.jpg " alt="call"></img>
              <h1 className='call-header'>Call us</h1>
              <h4 className='call-info'>9199022 66193</h4>
            </div>
            <div className='contact-box'>
            <img  className=" mailimg" src="https://cdn.iconscout.com/icon/free/png-256/free-mail-1437261-1216865.png" alt="mail"></img>
            <h1 className='mail-header'>Write to us</h1>
            <h4 className='mail-info'>customercare@chevinlifestyle.com</h4>
            </div>
            <div className='contact-box'>
          <a href=" https://maps.app.goo.gl/2MfcxVN61Hi8pcBRA">  <img className="locimg" src=" https://cdn-icons-png.freepik.com/256/684/684809.png" alt="location"></img></a>
           <h1 className='loc-header'  >Location</h1> 
           <h4 className='loc-info'>No.405, 2nd floor, BHEL Main Road, Pattanagere, Opposite Kittur Chennamma Park, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098</h4>

            </div>
           </div>
        

          <div className="maps">
   
          <iframe title=" loaction" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8649798656247!2d77.50569057507548!3d12.916398387393894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f645e637239%3A0xfe4354dd75c1fe8e!2sNoventa%20Lifestyle%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1708515888019!5m2!1sen!2sin" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
    </div>
    </Layout>
  )
}

export default Contact;
