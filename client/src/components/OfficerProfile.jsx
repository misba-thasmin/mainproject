import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
import "./css/Landing.css"; // Import the light theme styles

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const OfficerProfile = () => {
  const navigate = useNavigate();
  const [filteredData, setBinData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Apply Light Theme Background explicitly
  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/officer/');
        const data = await response.json();
        const officeremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)officeremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
        const filteredBin = data.filter((officer) => officer.email === officeremail);

        if (response.status === 200) {
          setBinData(filteredBin);
          setLoading(false);
        } else {
          console.error('Error fetching officer data:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching officer data:', error.message);
        setLoading(false);
      }
    };

    fetchBinData();
  }, []);

  const getAvatarInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'OF';
  };

  const timeOptions = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

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
              <Link to="/officer_home" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
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

      <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2rem 1rem 6rem 1rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>

          {filteredData.length > 0 ? (
            filteredData.map((officer) => (
              <div key={officer._id}>

                {/* Profile Hero Header */}
                <div className="card shadow-sm border-0 mb-4 position-relative" style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>
                  {/* Top Actions Link */}
                  <Link to={`/edit_officer_profile/${officer._id}`} className="btn btn-light position-absolute border-0 shadow-sm" style={{ top: '15px', right: '15px', zIndex: 10, borderRadius: '50px', padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, color: '#3b82f6' }}>
                    <i className="fa fa-pencil me-2"></i> Edit Profile
                  </Link>

                  <div style={{ height: '120px', backgroundColor: '#3b82f6', background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' }}></div>
                  <div className="card-body text-center position-relative pt-0 px-4 pb-4">
                    <div className="d-flex justify-content-center mb-3" style={{ marginTop: '-50px' }}>
                      <div className="d-flex align-items-center justify-content-center text-white fw-bold shadow"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#1e293b', fontSize: '2.5rem', border: '4px solid #ffffff' }}>
                        {getAvatarInitials(officer.name)}
                      </div>
                    </div>
                    <h3 className="fw-bold text-dark mb-1">{officer.name}</h3>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <span className="badge bg-primary px-3 py-2 rounded-pill" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                        <i className="fa fa-shield me-2"></i> {officer.designation || 'Assigned Officer'}
                      </span>
                      {officer.officerId && (
                        <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                          ID: {officer.officerId}
                        </span>
                      )}
                    </div>
                    <p className="text-muted small mx-auto mb-0" style={{ maxWidth: '500px' }}>
                      Government representative responsible for managing and resolving registered civilian complaints within designated jurisdictions.
                    </p>
                  </div>
                </div>

                {/* Information Grid: Two Columns (Personal vs Official) */}
                <div className="row g-4">

                  {/* Left Column: Personal Information */}
                  <div className="col-12 col-md-6">
                    <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}>
                      <div className="card-header bg-transparent border-bottom-0 pt-4 pb-0 px-4">
                        <h5 className="fw-bold text-dark mb-0"><i className="fa fa-user-circle text-primary me-2"></i>Personal Information</h5>
                      </div>
                      <div className="card-body p-4">
                        <ul className="list-unstyled mb-0">
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-envelope text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Email Address</small>
                              <span className="text-dark fw-medium">{officer.email}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-mobile text-success" style={{ fontSize: '1.2rem' }}></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Mobile Number</small>
                              <span className="text-dark fw-medium">{officer.mobile}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-danger bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-map-marker text-danger"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>City / Location</small>
                              <span className="text-dark fw-medium">{officer.location || 'Not Specified'}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-warning bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-map text-warning"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>District & State</small>
                              <span className="text-dark fw-medium">{officer.district || 'District N/A'}, {officer.state || 'State N/A'}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="icon-box rounded bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-home text-secondary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Residential Address</small>
                              <span className="text-dark fw-medium">{officer.address || 'Address Not Provided'}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Official Information */}
                  <div className="col-12 col-md-6">
                    <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}>
                      <div className="card-header bg-transparent border-bottom-0 pt-4 pb-0 px-4">
                        <h5 className="fw-bold text-dark mb-0"><i className="fa fa-building text-info me-2"></i>Official Details</h5>
                      </div>
                      <div className="card-body p-4">
                        <ul className="list-unstyled mb-0">
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-info bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-sitemap text-info"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Department</small>
                              <span className="text-dark fw-medium">{officer.department || 'Not Assigned'}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-dark bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-university text-dark"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Police Station / Office</small>
                              <span className="text-dark fw-medium">{officer.policeStation || 'Not Specified'}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-phone-square text-success"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Office Contact Number</small>
                              <span className="text-dark fw-medium">{officer.officeContact || 'Not Available'}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-4 pb-2 border-bottom border-light">
                            <div className="icon-box rounded bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-briefcase text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Years of Experience</small>
                              <span className="text-dark fw-medium">{officer.experience ? `${officer.experience} Years` : 'Not Specified'}</span>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="icon-box rounded bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="fa fa-calendar-check-o text-secondary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Date of Joining</small>
                              <span className="text-dark fw-medium">{officer.joiningDate || new Date(officer.dateCreated).toLocaleDateString('en-GB') || 'Not Listed'}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 mt-5">
              <i className="fa fa-user-times text-muted mb-3" style={{ fontSize: '4rem' }}></i>
              <h4 className="text-secondary">Profile Null</h4>
              <p className="text-muted">No officer data sequence could be retrieved.</p>
            </div>
          )}

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav-area glass-nav" id="footerNav" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '0 1rem', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: 'none', height: '60px', borderRadius: '0', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.9)' }}>
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0 mb-0" style={{ listStyle: 'none', width: '100%' }}>
              <li className="active">
                <Link to="/officer_home" style={{ color: '#3b82f6', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
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

export default OfficerProfile;