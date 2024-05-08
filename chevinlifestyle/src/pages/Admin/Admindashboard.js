import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const Admindashboard = (navbarOpen) => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard-Admin"}>
      <div
        className="container-fluid p-3"
        id="admin_menu"
        // style={{ display: navbarOpen ? 'none' : 'block' }}
      >
        <div className="row" style={{marginTop:50}}>
          <div className="col-md-3" style={{zIndex:1}}>
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Hello, {auth?.user?.name}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Admindashboard;
