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

const PostOfficer = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwordHash: '',
    mobile: '',
    location: '',
    city: '',
    address: '',
    officerId: '',
    department: '',
    designation: '',
    policeStation: '',
    district: '',
    state: '',
    experience: '',
    officeContact: '',
    joiningDate: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/location');
        if (response.ok) {
          const data = await response.json();
          setLocationList(data);
        } else {
          console.error('Error fetching location data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching location data:', error.message);
      }
    };

    fetchLocation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.name.trim()) { errors.name = 'Name is required'; isValid = false; }
    if (!formData.email.trim()) { errors.email = 'Email is required'; isValid = false; }
    if (!formData.passwordHash) { errors.passwordHash = 'Password is required'; isValid = false; }

    if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile must be a 10-digit number';
      isValid = false;
    }

    if (!formData.location) { errors.location = 'Please select a assigned location'; isValid = false; }
    if (!formData.officerId) { errors.officerId = 'Officer ID is required'; isValid = false; }

    setValidationErrors(errors);
    return isValid;
  };

  const postOfficerData = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
      return '';
    };
    const adminEmail = getCookie('adminemail');

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      submitData.append('adminemail', adminEmail);

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      const response = await fetch('http://localhost:4000/api/v1/officer/', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: submitData,
      });

      if (response.ok) {
        alert('Officer Profile Created Successfully!');
        navigate('/admin_home');
      } else {
        const errText = await response.text();
        alert('Registration failed: ' + errText);
      }
    } catch (error) {
      console.error('Error posting Officer data:', error.message);
      alert('Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    postOfficerData();
  };

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
                <i className="fa fa-tachometer me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                Dashboard
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/post_location" className="d-flex align-items-center text-secondary nav-item-hover" style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '500', transition: 'all 0.2s ease' }}>
                <i className="fa fa-map-marker me-3" style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
                Add Location
              </Link>
            </li>

            <li style={{ marginBottom: '0.25rem' }}>
              <Link to="/post_officer" className="d-flex align-items-center" style={{ color: '#3b82f6', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#eff6ff', fontWeight: '600', transition: 'all 0.2s ease' }}>
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
        <div className="container" style={{ maxWidth: '900px' }}>

          <div className="section-heading d-flex flex-column align-items-center justify-content-center mb-5">
            <h2 className="hero-title" style={{ fontSize: '2.2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              Officer <span>Registration</span>
            </h2>
            <p className="text-muted text-center" style={{ maxWidth: '600px' }}>Create a new professional profile for officers assigned to case management and investigation.</p>
          </div>

          <form onSubmit={handleSubmit} className="row g-4">

            {/* Section 1: Personal Information */}
            <div className="col-12">
              <div className="card shadow-sm border-0" style={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 px-md-5">
                  <div className="d-flex align-items-center">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px', minWidth: '45px' }}>
                      <i className="fa fa-user text-primary" style={{ fontSize: '18px' }}></i>
                    </div>
                    <h5 className="fw-bold mb-0 text-dark">Personal Information</h5>
                  </div>
                  <hr className="mt-3 mb-0" style={{ opacity: 0.1 }} />
                </div>

                <div className="card-body p-4 p-md-5 pt-4">

                  {/* Profile Picture Upload Row */}
                  <div className="mb-4 pb-4 border-bottom">
                    <label className="form-label fw-bold text-dark mb-2">Profile Picture</label>
                    <div className="d-flex align-items-center gap-4">
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center border" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                        {imageFile ? (
                          <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <i className="fa fa-user-circle text-muted" style={{ fontSize: '40px' }}></i>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
                        <div className="form-text mt-1">Upload a clear front-facing photograph.</div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Full Name *</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: validationErrors.name ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-id-card-o text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="John Doe" />
                      </div>
                      {validationErrors.name && <div className="text-danger small mt-1">{validationErrors.name}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Email Address *</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: validationErrors.email ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-envelope-o text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="officer@law.gov" />
                      </div>
                      {validationErrors.email && <div className="text-danger small mt-1">{validationErrors.email}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Password *</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: validationErrors.passwordHash ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-lock text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="passwordHash" value={formData.passwordHash} onChange={handleInputChange} type="password" placeholder="Create secure password" />
                      </div>
                      {validationErrors.passwordHash && <div className="text-danger small mt-1">{validationErrors.passwordHash}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Mobile Number *</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: validationErrors.mobile ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-phone text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="mobile" value={formData.mobile} onChange={handleInputChange} type="text" placeholder="10-digit number" />
                      </div>
                      {validationErrors.mobile && <div className="text-danger small mt-1">{validationErrors.mobile}</div>}
                    </div>

                    <div className="col-12 mt-3">
                      <h6 className="fw-bold mb-3 small text-muted text-uppercase">Residential Details</h6>
                    </div>

                    <div className="col-12 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Address</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-home text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Street layout/house details" />
                      </div>
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">City</label>
                      <input className="form-control shadow-sm border" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="City" />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">District</label>
                      <input className="form-control shadow-sm border" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} name="district" value={formData.district} onChange={handleInputChange} type="text" placeholder="District" />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">State</label>
                      <input className="form-control shadow-sm border" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} name="state" value={formData.state} onChange={handleInputChange} type="text" placeholder="State" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Official Information */}
            <div className="col-12">
              <div className="card shadow-sm border-0" style={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 px-md-5">
                  <div className="d-flex align-items-center">
                    <div className="icon-wrapper bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px', minWidth: '45px' }}>
                      <i className="fa fa-briefcase text-success" style={{ fontSize: '18px' }}></i>
                    </div>
                    <h5 className="fw-bold mb-0 text-dark">Official Information</h5>
                  </div>
                  <hr className="mt-3 mb-0" style={{ opacity: 0.1 }} />
                </div>

                <div className="card-body p-4 p-md-5 pt-4">
                  <div className="row g-3">

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Officer ID / Badge Number *</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: validationErrors.officerId ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-id-badge text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="officerId" value={formData.officerId} onChange={handleInputChange} type="text" placeholder="e.g. POL-12345" />
                      </div>
                      {validationErrors.officerId && <div className="text-danger small mt-1">{validationErrors.officerId}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Department</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-building-o text-muted"></i></span>
                        <select className="form-select border-0 bg-white" name="department" value={formData.department} onChange={handleInputChange}>
                          <option value="">Select Department</option>
                          <option value="Child welfare">Child Welfare</option>
                          <option value="Juvenile Justice">Juvenile Justice</option>
                          <option value="Cyber Crime">Cyber Crime</option>
                          <option value="Special Victims Unit">Special Victims Unit</option>
                          <option value="General Duties">General Duties</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Designation / Rank</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-star-o text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="designation" value={formData.designation} onChange={handleInputChange} type="text" placeholder="e.g. Inspector, Sub-Inspector" />
                      </div>
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Assigned Location Node *</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: validationErrors.location ? '1px solid #dc3545' : '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-map-marker text-muted"></i></span>
                        <select className="form-select border-0 bg-white" name="location" value={formData.location} onChange={handleInputChange}>
                          <option value="">Select Location</option>
                          {locationList.map(loc => (
                            <option key={loc._id} value={loc.location}>{loc.location}</option>
                          ))}
                        </select>
                      </div>
                      {validationErrors.location && <div className="text-danger small mt-1">{validationErrors.location}</div>}
                    </div>

                    <div className="col-md-12 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Police Station / Office Name</label>
                      <div className="input-group shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <span className="input-group-text bg-light border-0"><i className="fa fa-shield text-muted"></i></span>
                        <input className="form-control border-0 bg-white" name="policeStation" value={formData.policeStation} onChange={handleInputChange} type="text" placeholder="Primary operating station name" />
                      </div>
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Years of Experience</label>
                      <input className="form-control shadow-sm border" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} name="experience" value={formData.experience} onChange={handleInputChange} type="number" placeholder="Years" />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Office Contact No.</label>
                      <input className="form-control shadow-sm border" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} name="officeContact" value={formData.officeContact} onChange={handleInputChange} type="text" placeholder="Landline or ext." />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-bold text-dark small mb-1">Date of Joining</label>
                      <input className="form-control shadow-sm border" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} type="date" />
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="col-12 mt-4 text-end pb-3">
              <Link to="/admin_home" className="btn btn-light shadow-sm me-3 border fw-semibold px-4 py-2" style={{ borderRadius: '10px' }}>Cancel</Link>
              <button
                className="btn btn-primary shadow-sm px-5 py-2"
                type="submit"
                disabled={isSubmitting}
                style={{ borderRadius: '10px', fontWeight: 'bold', background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)', border: 'none' }}
              >
                {isSubmitting ? (
                  <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Registering...</span>
                ) : (
                  <span><i className="fa fa-paper-plane me-2"></i>Register Officer</span>
                )}
              </button>
            </div>

          </form>
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

export default PostOfficer;