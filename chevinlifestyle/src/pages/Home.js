import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Carousal from "./Carousal";
import Aboutchevin from "./Aboutchevin";
import { useAuth } from "../context/auth";
import { Col, Row } from "antd";
 
const Home=()=>{
  const [auth,setAuth]=useAuth();
    return(
      // <Row><Col lg={24} md={24} sm={24} xs={24} style={{maxWidth:"100%"}}>
        <Layout title={"Chevin Lifetsyle"}>
          
        <div className="img-carousal">
          
          <Row><Col lg={24} md={24} xs={24} xxs={24} >
          <Carousal/>
          </Col></Row>
            {/* <div className="image1">
            <img src="/images/chevin.png" alt="bagimage"></img>
            </div> */}
            {/* <div
  id="carouselExampleIndicators"
  className="carousel slide"
  data-ride="carousel"
>
  <ol className="carousel-indicators">
    <li
      data-target="#carouselExampleIndicators"
      data-slide-to={0}
      className="active"
    />
    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/chevin.png" alt="First slide" />
    </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/banr.png" alt="Second slide" />
    </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/chevin.png" alt="Third slide" />
    </div>
  </div>
  <a
    className="carousel-control-prev"
    href="#carouselExampleIndicators"
    role="button"
    data-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#carouselExampleIndicators"
    role="button"
    data-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div> */}
{/* ================try */}
{/* <div
  id="carouselExampleControls"
  className="carousel slide"
  data-ride="carousel"
>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/chevin.png" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/banr.png" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/chevin.png" alt="Third slide" />
    </div>
  </div>
  <a
    className="carousel-control-prev"
    href="#carouselExampleControls"
    role="button"
    data-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#carouselExampleControls"
    role="button"
    data-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div> */}


            <div className="prod-explore">
                <h1 className="prod-explore-heading">DIVE AND EXPLORE OUR COLLECTIONS</h1>
                <div className="prod-explore-images">
                    <div className="prod-explore-image-container " onClick={()=>console.log("clicked")}>
                    <Link style={{color:'black',textDecoration:"none"}}to={`/category/casuals`}> <img className="prod-explore-image" src="/images/backpacks.jpg" alt="duffle"/>
                      {/* <button className="explore-now1"> →</button> */}
                      <h2 className="prod-explore-image-heading">Backpacks</h2></Link>
                    </div>
                    
                    <div className="prod-explore-image-container" onClick={()=>console.log("clicked")}>
                    <img className="prod-explore-image" src="/images/Duffle.png" alt="duffle"/>
                    {/* <button className="explore-now">EXPLORE NOW →</button> */}
                    <h2 className="prod-explore-image-heading">Duffle Bags</h2>
                    </div>
                    <div className="prod-explore-image-container" onClick={()=>console.log("clicked")}>
                    <Link style={{color:'black',textDecoration:"none"}}to={`/category/business-backpacks`}><img className="prod-explore-image" src="/images/laptop.png" alt="duffle"/>
                    {/* <button className="explore-now">EXPLORE NOW →</button> */}
                    <h2 className="prod-explore-image-heading">Laptop Bags</h2></Link>
                    </div>
                    <div className="prod-explore-image-container" onClick={()=>console.log("clicked")}>
                    <Link style={{color:'black',textDecoration:"none"}}to={`/category/daypacks`}><img className="prod-explore-image" src="/images/daypacks.png" alt="duffle"/>
                    {/* <button className="explore-now">EXPLORE NOW →</button> */}
                    <h2 className="prod-explore-image-heading">Daypacks </h2></Link>
                    </div>
                </div>
            </div>
            <h1 className="top-selling-heading">OUR TOP SELLING PRODUCTS</h1>
         <div className="top-selling">
       
            <div className="top-selling-prod-1-container">
            <Link to={`/product/Charm-Red-Daypack`}><img className="top-selling-prod-1-image"src="/images/top-selling1.png" alt="top1" onClick={()=>console.log("clicked")}/></Link>
            </div>
            <div className="top-selling-prod-2-container">
            <div className="top-selling-prod-2">
                <div>
                  <Link to={`/product/AYS-Mini-Grey`}> <img className="top-selling-prod-2-image1" src="/images/topselling2.jpg" alt="top2" onClick={()=>console.log("clicked")}/></Link> 
                </div>
               <div><h3 className="top-selling-prod-2-info">Indulge in a fusion of culture and convenience with our AYS Mini Navy Backpack. Embrace the spirit of exploration while showcasing your style, making a statement wherever your journey takes you. </h3></div>
            </div>
            <div className="top-selling-prod-3">
            <div>
              <Link to="/*">  <button  className=" shop-now-button"onClick={()=>console.log("clicked")}>SHOP NOW</button></Link>
            </div>
            <div>
               <Link to={`/product/AYS-Mini-Teal`}><img className="top-selling-prod-2-image2" src="/images/topselling3.jpg" alt="top3"onClick={()=>console.log("clicked")}/></Link> 
                </div>
               
            </div>

            </div>
            
         </div>
         <div>

         </div>
         {/* <div className="about-chevin"> */}
          <Aboutchevin/>
        {/* </div> */}
        </div>
        
        </Layout>
        // </Col></Row>
    )
}
export default Home;
