import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
import "./css/Landing.css"; // Import the light theme styles

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const Customers = () => {
  const navigate = useNavigate();
  const [complaintData, setComplaintData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Apply Light Theme Background explicitly
  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/user/`);
        if (response.status === 200) {
          setComplaintData(response.data);
          setLoading(false);
        } else {
          console.error('Error fetching user data:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setLoading(false);
      }
    };

    fetchComplaintData();
  }, []);

  // Filter data based on the search term
  const filteredData = complaintData.filter((user) => {
    const isMatch = Object.values(user).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return isMatch;
  });

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Fallback to generate a colorful avatar if no image exists
  const getAvatarInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e'];
    let hash = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
    }
    return colors[Math.abs(hash) % colors.length];
  };

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

      <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2rem 0 6rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>

          <div className="section-heading d-flex flex-column align-items-center justify-content-center mb-4">
            <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              Registered <span>Users</span>
            </h2>
            <p className="text-muted text-center" style={{ maxWidth: '600px' }}>View and manage registered system citizens.</p>
          </div>

          {/* Improved Search Bar */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="position-relative">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Search by Name, Email, or City..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '30px', paddingLeft: '20px', paddingRight: '50px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                />
                <i className="fa fa-search position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
              </div>
            </div>
          </div>

          {/* Modern Users Grid */}
          {filteredData.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredData.map((user) => (
                <div key={user._id} className="col">
                  <div className="card h-100 user-profile-card shadow-sm border-0" style={{ backgroundColor: '#ffffff', borderRadius: '16px', transition: 'all 0.3s ease', overflow: 'hidden' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>

                    <div className="card-body p-4 text-center">
                      {/* Avatar */}
                      <div className="mb-3 position-relative d-inline-block">
                        {user.image1 ? (
                          <img src={`http://localhost:4000/${user.image1}`} alt={user.name}
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: getAvatarColor(user.name), fontSize: '1.5rem', border: '3px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            {getAvatarInitials(user.name)}
                          </div>
                        )}
                        <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle" style={{ width: '15px', height: '15px' }} title="Active user"></span>
                      </div>

                      {/* Header Info */}
                      <h5 className="mb-1 fw-bold text-dark">{user.name}</h5>
                      <span className="badge bg-light text-secondary border mb-4 px-3 py-2 rounded-pill" style={{ letterSpacing: '0.5px' }}>CITIZEN</span>

                      {/* Details List */}
                      <ul className="list-unstyled text-start mb-0">
                        <li className="d-flex align-items-center mb-3">
                          <div className="icon-box rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '36px', height: '36px' }}>
                            <i className="fa fa-envelope text-primary small"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</small>
                            <span className="text-dark small fw-medium text-truncate d-block" style={{ maxWidth: '180px' }} title={user.email}>{user.email}</span>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mb-3">
                          <div className="icon-box rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '36px', height: '36px' }}>
                            <i className="fa fa-phone text-success small"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mobile</small>
                            <span className="text-dark small fw-medium">{user.phone}</span>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mb-3">
                          <div className="icon-box rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '36px', height: '36px' }}>
                            <i className="fa fa-map-marker text-danger small"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>City</small>
                            <span className="text-dark small fw-medium">{user.city || 'Not specified'}</span>
                          </div>
                        </li>
                        <li className="d-flex align-items-center">
                          <div className="icon-box rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '36px', height: '36px' }}>
                            <i className="fa fa-id-card text-info small"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aadhaar</small>
                            <span className="text-dark small fw-medium">{user.aadhaarNumber ? `**** **** ${user.aadhaarNumber.slice(-4)}` : 'Not provided'}</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Action Footer */}
                    <div className="card-footer bg-transparent border-0 px-4 pb-4 pt-0">
                      <div className="mt-3 pt-3 text-center" style={{ borderTop: '1px solid #f1f5f9' }}>
                        <Link to="/view_complaint_report_officer" className="btn btn-sm btn-outline-primary rounded-pill px-4 py-2 w-100 fw-medium">
                          <i className="fa fa-history me-2"></i>View Activity
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="mb-3 text-muted" style={{ fontSize: '3rem' }}><i className="fa fa-users"></i></div>
              <h5 className="text-secondary">No citizens found.</h5>
              <p className="text-muted">Adjust your search criteria or ensure citizens are registered in the database.</p>
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

export default Customers;