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

const MyFeedback = () => {
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
        const response = await axios.get(`http://localhost:4000/api/v1/feedback/`);
        if (response.status === 200) {
          setComplaintData(response.data);
          setLoading(false);
        } else {
          console.error('Error fetching Complaint data:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching Complaint data:', error.message);
        setLoading(false);
      }
    };

    fetchComplaintData();
  }, []);

  const officerLocation = document.cookie.replace(/(?:(?:^|.*;\s*)officerLocation\s*\=\s*([^;]*).*$)|^.*$/, '$1');

  // Filter data based on officerLocation and search term
  const filteredData = complaintData.filter((complaint) => {
    const isLocationMatch = officerLocation ? complaint.location.toLowerCase().includes(officerLocation.toLowerCase()) : true;
    const isSearchTermMatch = Object.values(complaint).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return isLocationMatch && isSearchTermMatch;
  });

  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Fallback to generate a colorful avatar if no user image exists
  const getAvatarInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
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

      <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2rem 1rem 6rem 1rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>

          <div className="section-heading d-flex flex-column align-items-center justify-content-center mb-4">
            <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              User <span>Feedback</span>
            </h2>
            <p className="text-muted text-center" style={{ maxWidth: '600px' }}>Review submitted feedback and structural requests.</p>
          </div>

          {/* Improved Search Bar */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="position-relative">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Search feedback by keyword, name, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '30px', paddingLeft: '20px', paddingRight: '50px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                />
                <i className="fa fa-search position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
              </div>
            </div>
          </div>

          {/* Modern Feedback Grid */}
          {filteredData.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {filteredData.map((feedback) => (
                <div key={feedback._id} className="col">
                  <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#ffffff', borderRadius: '16px', transition: 'transform 0.2s', padding: '1.5rem' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>

                    {/* Top Row: Avatar & Metadata */}
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                          style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: getAvatarColor(feedback.name), fontSize: '1rem', border: '2px solid #f8fafc' }}>
                          {getAvatarInitials(feedback.name)}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '1.05rem' }}>{feedback.name || 'Anonymous User'}</h6>
                          <span className="text-muted" style={{ fontSize: '0.8rem' }}>{feedback.useremail || 'No email provided'}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className="d-block text-muted" style={{ fontSize: '0.75rem', fontWeight: '500' }}>{new Date(feedback.dateCreated).toLocaleDateString('en-GB')}</span>
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>{new Date(feedback.dateCreated).toLocaleTimeString('en-GB', timeOptions)}</span>
                      </div>
                    </div>

                    {/* Highly stylized Feedback Callout Bubble */}
                    <div className="position-relative mt-2 mb-4 p-3 rounded" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <i className="fa fa-quote-left position-absolute text-muted opacity-25" style={{ top: '-10px', left: '15px', fontSize: '1.5rem', backgroundColor: '#ffffff', padding: '0 5px' }}></i>
                      <p className="mb-0 text-dark" style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#334155' }}>
                        "{feedback.feedback}"
                      </p>
                    </div>

                    {/* Location Footer Badge */}
                    <div className="mt-auto pt-2 border-top border-light d-flex align-items-center">
                      <span className="badge bg-light text-secondary border rounded-pill px-3 py-2 d-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '0.8rem' }}>
                        <i className="fa fa-map-marker text-danger"></i> {feedback.location || 'Location Not Specified'}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="mb-3 text-muted" style={{ fontSize: '3rem' }}><i className="fa fa-comments-o"></i></div>
              <h5 className="text-secondary">No user feedback found.</h5>
              <p className="text-muted">Adjust your search parameters or wait for new feedback submissions.</p>
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

export default MyFeedback;