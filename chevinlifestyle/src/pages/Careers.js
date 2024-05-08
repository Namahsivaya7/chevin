import React  from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
const Careers=()=>{
    return(
        <Layout title={"careers-Chevin lifestyle"}>
        <div className="careers">
            <div className="career-img-container">
                <img className="career-img" src="/images/career.jpg" alt="careerimg"/>
            </div>
            <div className="career-info"></div>
            <h3 className="career-info">
            Join the Noventa Lifestyle family and be part of shaping the journey with Chevin, our dynamic brand dedicated to providing a casual range of backpacks and travel gear.<br/><br/>
We are always on the lookout for talented individuals who are passionate about their work and eager to contribute to our brand’s growth.
<br/><br/>
Get in touch with us at <Link><span>careers@chevinlifestyle.com </span></Link>to learn more about potential career opportunities at Chevin
            </h3>
        </div>
        </Layout>
    )
}
export default Careers;