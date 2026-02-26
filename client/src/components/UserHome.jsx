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
import imgMech from "./img/mechanic.png";
import imgRequest from "./img/destination.png";
import imgProfile from "./img/user.png";
import newcomplaint from "./img/bg-img/complaint.png";
import viewcomplaint from "./img/bg-img/documents.png";
import imgfeedback from "./img/feedback.png";
import Logout from './Logout';
import Title from './Title';
import image1 from '../assets/img/advocate.png'

const UserHome = () => {
  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'black'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
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
            <h6 className="user-name mb-1">Online Complaint Registration</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h4><div style={{color:"darkblue"}}>User Home</div></h4>
          </div>
         
          <div className="row g-3">
            <div className="col-6 col-md-4">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={newcomplaint} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/post_complaint">
                   Post Complaint </Link> 
                    </div>
                </div>
              </div>
            </div>
           
         
          
            <div className="col-6 col-md-4">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={viewcomplaint} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/view_complaint_user">
                   View My Complaint </Link> 
                    </div>
                </div>
              </div>
            </div>
            

            <div className="col-6 col-md-4">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={image1} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/view_advocate">
                   View Advocates </Link> 
                    </div>
                </div>
              </div>
            </div>


           
            <div className="col-6 col-md-4">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><i class="lni lni-user" style={{fontSize:'65px', color:'grey' }}></i>{" "}
                  <Link  style={{color:"darkblue"}} to="/user_profile">
                   My Profile  </Link> 
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
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default UserHome