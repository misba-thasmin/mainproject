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

const PostLocation = () => {
  const [formData, setFormData] = useState({
    adminemail: '',
    location: '',
  });

  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/update_location_admin/" + id);
  }

  const [validationErrors, setValidationErrors] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Apply light theme
  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/location/');
        if (response.status === 200) {
          setLocationData(response.data);
        } else {
          console.error('Error fetching location data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching location data:', error.message);
      }
    };

    fetchLocationData();
  }, []);

  const postLocationData = async () => {
    if (!formData.location.trim()) {
      setValidationErrors({ location: 'Location name is required' });
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    // Using a safer fallback for cookie parsing
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
      return '';
    };
    const adminEmail = getCookie('adminemail');

    try {
      const response = await fetch('http://localhost:4000/api/v1/location/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          adminemail: adminEmail,
        }),
      });

      if (response.ok) {
        alert('Location Registered Successfully!');
        window.location.reload();
      } else {
        console.error('Error posting Location data:', response.statusText);
        alert('Failed to register location');
      }
    } catch (error) {
      console.error('Error posting Location data:', error.message);
      alert('Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postLocationData();
  };

  const Removefunction = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      const token = localStorage.getItem('token');

      fetch("http://localhost:4000/api/v1/location/" + id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }).then((res) => {
        alert('Location Removed successfully.')
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
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
                <i className="fa fa-tachometer me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                Dashboard
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/post_location" className="d-flex align-items-center" style={{ color: '#3b82f6', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#eff6ff', fontWeight: '600', transition: 'all 0.2s ease' }}>
                <i className="fa fa-map-marker me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                Add Location
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/post_officer" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-user-plus me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                Add Officer
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_officer_admin" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-id-badge me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                View Officer Profiles
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_complaint_report" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-file-text-o me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                All Reports
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_feedback" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-comments me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                View Feedbacks
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_user_admin" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-users me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                View User Profiles
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/view_advocate_admin" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-gavel me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                Approve Advocate Profiles
              </Link>
            </li>

            <li style={{ marginTop: '0.5rem', marginBottom: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
              <Link to="/admin_profile" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-user-circle me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                My Profile
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
        <div className="container" style={{ maxWidth: '800px' }}>

          <div className="section-heading d-flex align-items-center justify-content-center mb-5">
            <h2 className="hero-title" style={{ fontSize: '2.2rem', marginBottom: 0, textAlign: 'center' }}>
              Manage <span>Locations</span>
            </h2>
          </div>

          <div className="row g-4">
            {/* Add New Location Card */}
            <div className="col-12">
              <div className="card shadow-sm border-0" style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}>
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                      <i className="fa fa-map-marker text-primary" style={{ fontSize: '22px' }}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1 text-dark">Add New Location</h4>
                      <p className="text-muted small mb-0">Register a new jurisdiction area to the system</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="location" className="form-label fw-bold text-dark mb-2">Location Name</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden', border: validationErrors.location ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0 px-3">
                          <i className="fa fa-map-pin text-muted"></i>
                        </span>
                        <input
                          className="form-control border-0 py-3"
                          name="location"
                          id="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="e.g. Downtown District, North Sector"
                          style={{ boxShadow: 'none' }}
                        />
                      </div>
                      {validationErrors.location && (
                        <div className="text-danger small mt-2 fw-semibold"><i className="fa fa-exclamation-circle me-1"></i>{validationErrors.location}</div>
                      )}
                    </div>

                    <button
                      className="btn btn-primary w-100 py-3 shadow-sm"
                      type="submit"
                      disabled={isSubmitting}
                      style={{ borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)', border: 'none' }}
                    >
                      {isSubmitting ? (
                        <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...</span>
                      ) : (
                        <span><i className="fa fa-plus-circle me-2"></i>Register Location</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Existing Locations Table Card */}
            <div className="col-12 mt-5">
              <div className="card shadow-sm border-0" style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}>
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <div className="icon-wrapper bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                      <i className="fa fa-list text-success" style={{ fontSize: '20px' }}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1 text-dark">Registered Locations</h4>
                      <p className="text-muted small mb-0">Total: {locationData.length} locations active</p>
                    </div>
                  </div>

                  {locationData.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0" style={{ minWidth: '500px' }}>
                        <thead className="table-light">
                          <tr>
                            <th scope="col" className="ps-3 border-0 py-3 text-secondary" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>#</th>
                            <th scope="col" className="border-0 py-3 text-secondary">Location Name</th>
                            <th scope="col" className="text-end pe-4 border-0 py-3 text-secondary" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locationData.map((location, index) => (
                            <tr key={location._id} style={{ transition: 'all 0.2s ease', cursor: 'default' }}>
                              <td className="ps-3 py-3 text-muted fw-semibold">{index + 1}</td>
                              <td className="py-3 fw-bold text-dark d-flex align-items-center gap-2">
                                <i className="fa fa-map-marker text-primary opacity-50"></i> {location.location}
                              </td>
                              <td className="text-end pe-3 py-3">
                                <div className="d-flex gap-2 justify-content-end">
                                  <button onClick={() => LoadEdit(location._id)} className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-sm" style={{ border: 'none', background: '#eff6ff', fontWeight: '600' }}>
                                    <i className="fa fa-edit me-1"></i> Edit
                                  </button>
                                  <button onClick={() => Removefunction(location._id)} className="btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm" style={{ border: 'none', background: '#fef2f2', fontWeight: '600' }}>
                                    <i className="fa fa-trash me-1"></i> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <div className="mb-3">
                        <i className="fa fa-map-o text-muted" style={{ fontSize: '3rem', opacity: '0.4' }}></i>
                      </div>
                      <h6 className="fw-bold text-dark">No Locations Found</h6>
                      <p className="text-muted small mb-0">Add a new location using the form above to get started.</p>
                    </div>
                  )}

                </div>
              </div>
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

export default PostLocation;