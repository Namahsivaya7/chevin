import Layout from "../components/Layout/Layout";

const About =()=>{
    return(
        <Layout title={"about us-Chevin Lifestyle"}>
        <div>
            <div className="aboutus-header">
            <h1 >About us</h1>
           </div>
           <div className="aboutus1">
                <div >
                <img  className="aboutus2img" src="/images/about2.png" alt="bag"/>
               
                </div>
                <div className="aboutus1info">
                    <h1>About Chevin</h1>
                    <h4>Whether you’re a school-attending youngster or an executive on the go, Chevin is your go-to travel companion for elegant and comfortable everyday journeys.
<p>Our diverse range covers all the bases – from spacious and sturdy school backpacks to casual styles seamlessly integrating into your everyday adventures. Make a statement with chic women’s backpacks, pack your spontaneity with versatile duffels, or get down to serious business with our top-notch business backpacks.</p></h4>

                </div>
           </div>
           <div className="aboutus2">
                
                <div className="aboutus2info">
              <h4> Chevin is more than just trendy designs; it’s a commitment to quality. We’re dedicated to delivering products that are not only fashionable but also durable and reliable<br/>
Proudly a part of Noventa Lifestyle, we carry forward the legacy of quality and excellence that defines our brand.

Discover the ideal balance of style and functionality with Chevin – because life’s journey is meant to be travelled in styl
             </h4>
                </div>
                <div >
               
                <img className="aboutus1img"src="/images/about1.jpg" alt="bag"/>
                </div>

           </div>
        </div>
        </Layout>
    )
}
export default About;