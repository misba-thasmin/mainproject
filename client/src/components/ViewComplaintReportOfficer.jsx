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

const ViewComplaintReportOfficer = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState([]);
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
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/complaint/`);
        if (response.status === 200) {
          setBusinessData(response.data);
          setLoading(false);
        } else {
          console.error('Error fetching business data:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching business data:', error.message);
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  // Filter data based on the search term
  const filteredData = businessData.filter((business) => {
    const isMatch = Object.values(business).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return isMatch;
  });

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  // Helper function to return proper badge colors based on status
  const getStatusBadgeClass = (status) => {
    if (!status) return 'bg-secondary';
    const s = status.toLowerCase();
    if (s.includes('pending')) return 'bg-warning text-dark';
    if (s.includes('resolved') || s.includes('completed')) return 'bg-success';
    if (s.includes('progress') || s.includes('working')) return 'bg-info text-dark';
    if (s.includes('rejected')) return 'bg-danger';
    return 'bg-primary';
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
        <div className="container-fluid" style={{ maxWidth: '1400px' }}>

          <div className="section-heading d-flex flex-column align-items-center justify-content-center mb-4">
            <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              Complaint <span>Report</span>
            </h2>
            <p className="text-muted text-center" style={{ maxWidth: '600px' }}>View and filter all system complaints globally.</p>
          </div>

          {/* Improved Search Bar */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="position-relative">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Search globally across all fields..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '30px', paddingLeft: '20px', paddingRight: '50px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                />
                <i className="fa fa-search position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
              </div>
            </div>
          </div>

          {filteredData.length > 0 ? (
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ backgroundColor: '#ffffff', minWidth: '1000px' }}>
                  <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                    <tr>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px', width: '60px' }}>#</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}><i className="fa fa-user me-2"></i>Name</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}><i className="fa fa-map-marker me-2"></i>City / Area</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}><i className="fa fa-tags me-2"></i>Type</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px', minWidth: '130px' }}><i className="fa fa-calendar me-2"></i>Date</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px', minWidth: '250px' }}><i className="fa fa-align-left me-2"></i>Complaint</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}><i className="fa fa-info-circle me-2"></i>Status</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px', minWidth: '150px' }}><i className="fa fa-comment me-2"></i>Reason & Notes</th>
                      <th className="px-4 py-3 text-uppercase text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px', textAlign: 'center' }}><i className="fa fa-paperclip me-2"></i>Proofs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((complaint, index) => (
                      <tr key={complaint._id} style={{ transition: 'all 0.2s', borderBottom: '1px solid #f8fafc' }}>
                        <td className="px-4 py-3 text-muted" style={{ fontWeight: '500' }}>{index + 1}</td>
                        <td className="px-4 py-3">
                          <span className="fw-bold d-block" style={{ color: '#1e293b' }}>{complaint.name}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span style={{ color: '#475569' }}>{complaint.location}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="badge bg-light text-dark border">{complaint.department}</span>
                        </td>
                        <td className="px-4 py-3 text-muted" style={{ fontSize: '0.85rem' }}>
                          {new Date(complaint.dateCreated).toLocaleDateString('en-GB')}<br />
                          <small>{new Date(complaint.dateCreated).toLocaleTimeString('en-GB', timeOptions)}</small>
                        </td>
                        <td className="px-4 py-3">
                          <p className="mb-0 text-truncate" style={{ maxWidth: '300px', color: '#334155' }} title={complaint.writecomplaint}>
                            {complaint.writecomplaint}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge ${getStatusBadgeClass(complaint.status)} rounded-pill`} style={{ fontWeight: '500', padding: '0.4em 0.8em' }}>
                            {complaint.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {complaint.reason || complaint.remedies || complaint.notes ? (
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              {complaint.reason && <div className="text-truncate" style={{ maxWidth: '180px' }} title={complaint.reason}><strong>R:</strong> {complaint.reason}</div>}
                              {complaint.notes && <div className="text-truncate" style={{ maxWidth: '180px' }} title={complaint.notes}><strong>N:</strong> {complaint.notes}</div>}
                            </div>
                          ) : (
                            <span className="text-muted" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>None</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex justify-content-center gap-2">
                            {complaint.image1 && (
                              <a href={`http://localhost:4000/${complaint.image1}`} target="_blank" rel="noopener noreferrer" title="View Primary Proof">
                                <img src={`http://localhost:4000/${complaint.image1}`} alt="Proof" className="rounded border shadow-sm" style={{ width: '40px', height: '40px', objectFit: 'cover', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                              </a>
                            )}
                            {complaint.imagePath && (
                              <a href={`http://localhost:4000/${complaint.imagePath}`} target="_blank" rel="noopener noreferrer" title="View Resolution Proof">
                                <img src={`http://localhost:4000/${complaint.imagePath}`} alt="Resolution" className="rounded border shadow-sm border-success" style={{ width: '40px', height: '40px', objectFit: 'cover', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                              </a>
                            )}
                            {!complaint.image1 && !complaint.imagePath && (
                              <span className="text-muted" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="mb-3 text-muted" style={{ fontSize: '3rem' }}><i className="fa fa-folder-open-o"></i></div>
              <h5 className="text-secondary">No complaint records found.</h5>
              <p className="text-muted">Adjust your search terms or verify database connectivity.</p>
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

export default ViewComplaintReportOfficer;