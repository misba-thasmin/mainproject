import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
import "./css/Landing.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewOfficerAdmin = () => {
  const navigate = useNavigate();
  const [officerData, setOfficerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const LoadEdit = (id) => {
    navigate("/update_officer_admin/" + id);
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  useEffect(() => {
    const fetchOfficerData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/officer/`);
        if (response.status === 200) {
          setOfficerData(response.data);
        } else {
          console.error('Error fetching Officer data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching Officer data:', error.message);
      }
    };
    fetchOfficerData();
  }, []);

  const filteredData = officerData.filter((officer) => {
    return Object.values(officer).some((field) =>
      field ? field.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    );
  });

  const Removefunction = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this officer profile?')) {
      const token = localStorage.getItem('token');
      fetch("http://localhost:4000/api/v1/officer/" + id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }).then((res) => {
        alert('Officer profile removed successfully.')
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  return (
    <div className="landing-container">
      {/* Header Area */}
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

      {/* Offcanvas Sidebar */}
      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel" style={{ backgroundColor: '#ffffff', width: '280px', borderRight: '1px solid #e2e8f0', boxShadow: '4px 0 15px rgba(0,0,0,0.05)' }}>
        <button className="btn-close btn-close-dark text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close" style={{ margin: '1.5rem 1rem 0 auto', display: 'block' }}></button>
        <div className="offcanvas-body" style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>

          <div className="sidenav-profile" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', marginBottom: '1rem' }}>
            <div className="user-profile mb-3"><img src={imgBg} alt="Admin Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #eff6ff', padding: '3px' }} /></div>
            <div className="user-info">
              <h6 className="user-name mb-1" style={{ color: '#0f172a', fontWeight: '700' }}>Admin Control Panel</h6>
              <p className="text-muted small mb-0">Complaint Management</p>
            </div>
          </div>

          <ul className="sidenav-nav ps-0" style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/admin_home" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-tachometer me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/post_location" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-map-marker me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> Add Location
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/post_officer" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-user-plus me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> Add Officer
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_officer_admin" className="d-flex align-items-center" style={{ color: '#3b82f6', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#eff6ff', fontWeight: '600', transition: 'all 0.2s ease' }}>
                <i className="fa fa-id-badge me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> View Officer Profiles
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_complaint_report" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-file-text-o me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> All Reports
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_feedback" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-comments me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> View Feedbacks
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_user_admin" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-users me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> View User Profiles
              </Link>
            </li>
            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_advocate_admin" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-gavel me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> Approve Advocate Profiles
              </Link>
            </li>
            <li style={{ marginTop: '0.5rem', marginBottom: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
              <Link to="/admin_profile" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-user-circle me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i> My Profile
              </Link>
            </li>
            <li style={{ marginTop: 'auto' }}>
              <div className="d-flex align-items-center text-danger nav-item-hover" style={{ padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                <Logout className="w-100" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2.5rem 0 6rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>

          {/* Header Section */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
            <div>
              <h2 className="hero-title m-0" style={{ fontSize: '2.2rem', color: '#1e293b' }}>Officer Directory</h2>
              <p className="text-muted m-0 mt-2">Manage and monitor all active designated officers in the system.</p>
            </div>

            {/* Search Bar */}
            <div className="search-bar-container w-100" style={{ maxWidth: '400px' }}>
              <div className="input-group shadow-sm bg-white" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <span className="input-group-text bg-white border-0 ps-3 pe-2 text-muted"><i className="fa fa-search"></i></span>
                <input
                  type="text"
                  className="form-control border-0 py-2 shadow-none"
                  placeholder="Search by name, ID, location, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Error / Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-5">
              <div className="d-inline-flex bg-white rounded-circle p-4 shadow-sm mb-3">
                <i className="fa fa-search text-muted" style={{ fontSize: '2rem' }}></i>
              </div>
              <h5 className="text-muted">No officers found matching "{searchTerm}"</h5>
              <p className="text-muted small">Try adjusting your search criteria or add a new officer.</p>
            </div>
          )}

          {/* Officers Grid */}
          <div className="row g-4">
            {filteredData.map((officer) => (
              <div key={officer._id} className="col-12 col-xl-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all" style={{ borderRadius: '16px', overflow: 'hidden' }}>

                  <div className="card-body p-0">
                    <div className="row g-0 h-100">

                      {/* Left Column: Avatar & Actions */}
                      <div className="col-sm-4 bg-light border-end d-flex flex-column align-items-center justify-content-center p-4">
                        <div className="avatar-wrapper mb-3 rounded-circle shadow-sm border border-2 border-white" style={{ width: '100px', height: '100px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                          {officer.image ? (
                            <img src={officer.image} alt={officer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div className="d-flex align-items-center justify-content-center h-100 w-100 bg-secondary text-white">
                              <i className="fa fa-user" style={{ fontSize: '40px' }}></i>
                            </div>
                          )}
                        </div>
                        <h5 className="fw-bold text-center mb-1 text-dark" style={{ fontSize: '1.1rem' }}>{officer.name}</h5>
                        <p className="text-muted text-center small mb-3">{officer.designation || 'Officer'}</p>

                        <div className="d-flex gap-2 w-100 mt-auto">
                          <button onClick={() => LoadEdit(officer.id)} className="btn btn-outline-primary btn-sm flex-fill" style={{ borderRadius: '8px', fontWeight: '500' }}>
                            <i className="fa fa-edit me-1"></i> Edit
                          </button>
                          <button onClick={() => Removefunction(officer.id)} className="btn btn-outline-danger btn-sm flex-fill" style={{ borderRadius: '8px', fontWeight: '500' }}>
                            <i className="fa fa-trash-o me-1"></i>
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Detailed Info Sections */}
                      <div className="col-sm-8 p-4 bg-white d-flex flex-column">

                        {/* Status / ID Row */}
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-light">
                          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill border border-primary border-opacity-25" style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                            <i className="fa fa-id-badge me-2"></i>{officer.officerId || 'ID Pending'}
                          </span>
                          <span className="text-muted small">
                            <i className="fa fa-calendar-o me-1"></i> Joined {officer.joiningDate ? new Date(officer.joiningDate).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>

                        {/* Official Info */}
                        <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Official Information</h6>
                        <div className="row g-3 mb-4">
                          <div className="col-12 d-flex align-items-start">
                            <i className="fa fa-building text-muted mt-1 me-3 w-15px text-center"></i>
                            <div>
                              <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>{officer.department || 'Unassigned Department'}</p>
                              <p className="text-muted small mb-0">Department</p>
                            </div>
                          </div>

                          <div className="col-6 d-flex align-items-start">
                            <i className="fa fa-map-marker text-muted mt-1 me-3 w-15px text-center"></i>
                            <div>
                              <p className="mb-0 fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>{officer.location || 'N/A'}</p>
                              <p className="text-muted small mb-0">Assigned Node</p>
                            </div>
                          </div>

                          <div className="col-6 d-flex align-items-start">
                            <i className="fa fa-shield text-muted mt-1 me-3 w-15px text-center"></i>
                            <div>
                              <p className="mb-0 fw-semibold text-dark text-truncate" style={{ fontSize: '0.9rem', maxWidth: '120px' }} title={officer.policeStation}>{officer.policeStation || 'N/A'}</p>
                              <p className="text-muted small mb-0">Station</p>
                            </div>
                          </div>

                          {officer.experience && (
                            <div className="col-12 d-flex align-items-start mt-2 pt-2 border-top border-light">
                              <i className="fa fa-star text-muted mt-1 me-3 w-15px text-center"></i>
                              <div>
                                <p className="mb-0 text-dark small">{officer.experience} Years of Experience</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Contact Info */}
                        <h6 className="text-uppercase text-muted fw-bold mb-3 mt-auto" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Contact Details</h6>
                        <div className="row g-2">
                          <div className="col-12 d-flex align-items-center">
                            <div className="bg-light rounded p-2 me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className="fa fa-envelope text-primary small"></i>
                            </div>
                            <span className="text-dark small text-truncate">{officer.email}</span>
                          </div>
                          <div className="col-12 d-flex align-items-center">
                            <div className="bg-light rounded p-2 me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className="fa fa-phone text-success small"></i>
                            </div>
                            <span className="text-dark small">{officer.mobile} {officer.officeContact && `• Ext: ${officer.officeContact}`}</span>
                          </div>
                          {(officer.city || officer.state) && (
                            <div className="col-12 d-flex align-items-center mt-1">
                              <div className="bg-light rounded p-2 me-3" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa fa-map text-secondary small"></i>
                              </div>
                              <span className="text-muted small text-truncate">
                                {[officer.city, officer.district, officer.state].filter(Boolean).join(', ')}
                              </span>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav-area glass-nav" id="footerNav" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '0 1rem', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: 'none', height: '60px', borderRadius: '0', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.9)' }}>
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0 mb-0" style={{ listStyle: 'none', width: '100%' }}>
              <li className="active">
                <Link to="/admin_home" style={{ color: '#3b82f6', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
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

export default ViewOfficerAdmin;