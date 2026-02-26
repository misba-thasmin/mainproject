import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgService from "./img/trash.png";
import officer from "./img/bg-img/officer.png";
import feedback from "./img/bg-img/feedback.png";
import view from "./img/view.png";
import imgPla from "./img/plastic.png";
import viewcomplaints from "./img/bg-img/review.png";
import workreport from "./img/bg-img/accountability.png";
import userdetails from "./img/user.png";
import imgReq from "./img/customerjourney.png";
import imgFeed from "./img/feedback.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import image1 from '../assets/img/judgment.png'

const AdminHome = () => {
  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'black'}}><img src={imgSmall} alt=""/> <strong><Title /> </strong></div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">Online Complaint Management System</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-center">
          <h3><div style={{color:"#00008B"}}>Admin Home</div></h3>
          </div>
         
          

            <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={officer} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/post_location">
                   Add Location</Link> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={officer} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/post_officer">
                   Add Officer</Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>
           

            <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={view} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/view_officer_admin">
                   View Officer's Profile</Link> 
                    </div>
                </div>
              </div>
            </div>
            
           
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={workreport} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/view_complaint_report">
                   All Reports</Link> 
                    </div>
                </div>
              </div>
            </div>

           
            
            </div>

            <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={feedback} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/view_feedback">
                   View Feedbacks</Link> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><i class="lni lni-user" style={{fontSize:'65px', color:'grey' }}></i>{" "}
                  <Link  style={{color:"#000435"}} to="/view_user_admin">
                    View User's profile</Link> 
                    </div>
                </div>
              </div>
            </div>
         </div>
         <div className="row g-3">
         <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={userdetails} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/admin_profile">
                   My profile</Link> 
                    </div>
                </div>
              </div>
            </div>
                    

                <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={image1} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"#00008B"}} to="/view_advocate_admin">
                   Approve advocate's Profile</Link> 
                    </div>
                </div>
              </div>
            </div>      


         </div>
            
            </div>


            </div>
            </div>
            </div>

            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/admin_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>

  )
}

export default AdminHome