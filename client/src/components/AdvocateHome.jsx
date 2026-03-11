import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
import "./css/Landing.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const AdvocateHome = () => {

  // Apply Light Theme Background explicitly
  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  return (
    <div className="landing-container">

      {/* Header Area styled with Glassmorphism */}
      <div className="header-area glass-nav" id="headerArea" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '1rem' }}>
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={imgSmall} alt="" style={{ height: '30px' }} />
            <span className="brand-text" style={{ fontSize: '1.25rem', fontWeight: 700 }}><Title /></span>
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ backgroundColor: 'white', height: '2px', width: '25px', display: 'block' }}></span>
            <span style={{ backgroundColor: 'white', height: '2px', width: '25px', display: 'block' }}></span>
            <span style={{ backgroundColor: 'white', height: '2px', width: '25px', display: 'block' }}></span>
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar with light styling */}
      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel" style={{ backgroundColor: '#ffffff' }}>
        <button className="btn-close btn-close-dark text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close" style={{ margin: '1rem' }}></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile" style={{ padding: '1rem', textAlign: 'center' }}>
            <div className="user-profile mb-3"><img src={imgBg} alt="" style={{ width: '80px', borderRadius: '50%' }} /></div>
            <div className="user-info">
              <h6 className="user-name mb-1" style={{ color: '#1e293b' }}>Complaint Management System</h6>
            </div>
          </div>
          <ul className="sidenav-nav ps-0" style={{ listStyle: 'none', padding: '1rem' }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <Link to="/advocate_home" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="lni lni-home"></i>Home
              </Link>
            </li>
            <li style={{ padding: '10px 0' }}>
              <div style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Logout />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2rem 0 6rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>

          <div className="section-heading d-flex align-items-center justify-content-center mb-5">
            <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0, textAlign: 'center' }}>
              Advocate <span>Dashboard</span>
            </h2>
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">

            {/* Create Advocate */}
            <div className="col">
              <Link to="/post_advocate" style={{ textDecoration: 'none' }}>
                <div className="card h-100 shadow-sm border-0 portal-card" style={{ backgroundColor: '#ffffff', borderRadius: '20px', transition: 'all 0.3s ease' }}>
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                      <i className="fa fa-user-plus text-primary" style={{ fontSize: '24px' }}></i>
                    </div>
                    <div>
                      <h5 className="card-title fw-bold text-dark mb-1">Create Advocate</h5>
                      <p className="card-text text-muted small mb-0">Register a new advocate profile in the system</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Update Advocate */}
            <div className="col">
              <Link to="/view_my_advocate" style={{ textDecoration: 'none' }}>
                <div className="card h-100 shadow-sm border-0 portal-card" style={{ backgroundColor: '#ffffff', borderRadius: '20px', transition: 'all 0.3s ease' }}>
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="icon-wrapper bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                      <i className="fa fa-edit text-success" style={{ fontSize: '24px' }}></i>
                    </div>
                    <div>
                      <h5 className="card-title fw-bold text-dark mb-1">Update Advocate</h5>
                      <p className="card-text text-muted small mb-0">Modify and manage existing advocate details</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* View Advocate Details */}
            <div className="col">
              <Link to="/view_advocate" style={{ textDecoration: 'none' }}>
                <div className="card h-100 shadow-sm border-0 portal-card" style={{ backgroundColor: '#ffffff', borderRadius: '20px', transition: 'all 0.3s ease' }}>
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="icon-wrapper bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                      <i className="fa fa-address-card-o text-warning" style={{ fontSize: '24px' }}></i>
                    </div>
                    <div>
                      <h5 className="card-title fw-bold text-dark mb-1">View Advocate Details</h5>
                      <p className="card-text text-muted small mb-0">Browse through the directory of all advocates</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav-area glass-nav" id="footerNav" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '0 1rem', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: 'none', height: '60px', borderRadius: '0', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.9)' }}>
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0 mb-0" style={{ listStyle: 'none', width: '100%' }}>
              <li className="active">
                <Link to="/advocate_home" style={{ color: '#3b82f6', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
                  <i className="lni lni-home" style={{ fontSize: '20px', marginBottom: '2px' }}></i>Home
                </Link>
              </li>
              <li>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748b' }}>
                  <Logout />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdvocateHome;