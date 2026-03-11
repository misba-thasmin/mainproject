import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

const UpdateOfficerAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [locations, setLocations] = useState([]);

  // Full extended state vector
  const [editedOfficer, setEditedOfficer] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    location: '',
    address: '',
    city: '',
    district: '',
    state: '',
    officerId: '',
    department: '',
    designation: '',
    policeStation: '',
    experience: '',
    officeContact: '',
    joiningDate: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Used to show current DB image initially
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  // Fetch Locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/location');
        setLocations(res.data);
      } catch (err) {
        console.error("Failed fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  // Fetch Current Officer Profile
  useEffect(() => {
    const fetchOfficerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/officer/${id}`);
        const data = response.data;

        // Render ISO date safely to string for HTML5 date input format (YYYY-MM-DD)
        const parsedJoiningDate = data.joiningDate ? new Date(data.joiningDate).toISOString().split('T')[0] : '';

        setEditedOfficer({
          name: data.name || '',
          email: data.email || '',
          password: '', // default empty for security handling
          mobile: data.mobile || '',
          location: data.location || '',
          address: data.address || '',
          city: data.city || '',
          district: data.district || '',
          state: data.state || '',
          officerId: data.officerId || '',
          department: data.department || '',
          designation: data.designation || '',
          policeStation: data.policeStation || '',
          experience: data.experience || '',
          officeContact: data.officeContact || '',
          joiningDate: parsedJoiningDate
        });

        if (data.image) {
          setPreviewImage(data.image);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching officer data:', error);
        setLoading(false);
      }
    };
    fetchOfficerDetails();
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOfficer(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a local preview blob URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  const handleUpdateOfficer = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();

      // Append all scalar fields
      Object.keys(editedOfficer).forEach(key => {
        // Optionally you can avoid sending empty password if backend supports it, but here we submit as requested
        formData.append(key, editedOfficer[key]);
      });

      // Append Image if modified
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`http://localhost:4000/api/v1/officer/${id}`, {
        method: 'PUT',
        body: formData, // Auto-sets multipart/form-data with proper boundary
      });

      if (response.ok) {
        alert("Officer Profile Successfully Updated!");
        navigate("/view_officer_admin");
      } else {
        const errData = await response.json();
        alert("Update failed: " + (errData.message || response.statusText));
      }
    } catch (error) {
      console.error("Submission error: ", error);
      alert("Network error: Could not reach the server.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary" role="status"></div></div>;
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
            <li style={{ marginTop: 'auto', paddingTop: '100px' }}>
              <div className="d-flex align-items-center text-danger nav-item-hover" style={{ padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                <Logout className="w-100" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2.5rem 0 6rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>

          {/* Visual Navigation Back to Table */}
          <div className="mb-4 d-flex align-items-center">
            <Link to="/view_officer_admin" className="btn btn-sm btn-light border-0 shadow-sm rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa fa-arrow-left text-primary"></i>
            </Link>
            <div>
              <h4 className="mb-0 fw-bold text-dark">Edit Officer Data File</h4>
              <p className="text-muted small mb-0">Modifying profile {editedOfficer.officerId ? `#${editedOfficer.officerId}` : 'record'}</p>
            </div>
          </div>

          <div className="card shadow-sm border-0" style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>

            {/* Form Banner */}
            <div style={{ height: '80px', backgroundColor: '#3b82f6', background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' }}></div>

            {/* Profile Picture Mod Section */}
            <div className="d-flex flex-column align-items-center" style={{ marginTop: '-40px' }}>
              <div className="position-relative">
                <div className="d-flex align-items-center justify-content-center bg-white shadow" style={{ width: '90px', height: '90px', borderRadius: '50%', border: '4px solid #ffffff', overflow: 'hidden' }}>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <i className="fa fa-user text-secondary" style={{ fontSize: '2.5rem' }}></i>
                  )}
                </div>
                {previewImage && (
                  <button type="button" onClick={clearImageSelection} className="btn btn-danger btn-sm rounded-circle position-absolute" style={{ top: '0', right: '-5px', width: '25px', height: '25px', padding: 0, fontSize: '10px' }} title="Remove Image">
                    <i className="fa fa-times"></i>
                  </button>
                )}
              </div>

              <div className="mt-3 text-center px-4 w-100" style={{ maxWidth: '300px' }}>
                <label htmlFor="officerPhoto" className="btn btn-outline-primary btn-sm rounded-pill w-100 fw-bold" style={{ cursor: 'pointer' }}>
                  <i className="fa fa-camera me-2"></i> Update Profile Photo
                </label>
                <input type="file" ref={fileInputRef} id="officerPhoto" className="d-none" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            <div className="card-body p-4 p-md-5 pt-4">
              <form onSubmit={handleUpdateOfficer}>

                {/* ============== SECTION 1: PERSONAL DETAILS ============== */}
                <h6 className="text-primary text-uppercase fw-bold mb-4" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                  <i className="fa fa-user-circle me-2"></i>Personal Details
                </h6>

                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Full Name <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-user text-primary"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="name" value={editedOfficer.name} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Email <span className="text-secondary fw-normal">(Read Only)</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-envelope text-secondary"></i></span>
                      <input type="email" className="form-control border-start-0 ps-0 text-muted bg-light" name="email" value={editedOfficer.email} readOnly />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Mobile Number <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-phone text-success"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="mobile" value={editedOfficer.mobile} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Password <span className="text-warning fw-normal">(Leave blank to keep existing)</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-lock text-warning"></i></span>
                      <input type="password" className="form-control border-start-0 ps-0" name="password" value={editedOfficer.password} onChange={handleInputChange} placeholder="••••••••" autoComplete="new-password" />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">Residential Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-home text-secondary"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="address" value={editedOfficer.address} onChange={handleInputChange} placeholder="Door No, Street Name, Area" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold small text-muted">City / Town</label>
                    <input type="text" className="form-control" name="city" value={editedOfficer.city} onChange={handleInputChange} placeholder="City Name" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small text-muted">District</label>
                    <input type="text" className="form-control" name="district" value={editedOfficer.district} onChange={handleInputChange} placeholder="District" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small text-muted">State</label>
                    <input type="text" className="form-control" name="state" value={editedOfficer.state} onChange={handleInputChange} placeholder="State" />
                  </div>
                </div>

                <hr className="my-5 opacity-25" />

                {/* ============== SECTION 2: OFFICIAL INFORMATION ============== */}
                <h6 className="text-info text-uppercase fw-bold mb-4" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                  <i className="fa fa-building me-2"></i>Official Information
                </h6>

                <div className="row g-4 mb-4">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Officer ID</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-id-badge text-primary"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="officerId" value={editedOfficer.officerId} onChange={handleInputChange} placeholder="E.g. OFF-8822A" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Date of Joining</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-calendar-check-o text-success"></i></span>
                      <input type="date" className="form-control border-start-0 ps-0" name="joiningDate" value={editedOfficer.joiningDate} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Department</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-sitemap text-info"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="department" value={editedOfficer.department} onChange={handleInputChange} placeholder="E.g. Juvenile Justice" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Designation / Rank</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-star text-warning"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="designation" value={editedOfficer.designation} onChange={handleInputChange} placeholder="E.g. Chief Inspector" />
                    </div>
                  </div>

                  {/* Key Location Assignments */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Assigned Node (Location) <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-map-marker text-danger"></i></span>
                      <select className="form-select border-start-0 ps-0" name="location" value={editedOfficer.location} onChange={handleInputChange} required>
                        <option value="">Select Primary Region</option>
                        {locations.map(loc => (
                          <option key={loc._id} value={loc.location}>{loc.location}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Police Station / Branch Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-shield text-dark"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="policeStation" value={editedOfficer.policeStation} onChange={handleInputChange} placeholder="Node Station Name" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Office Contact Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-phone-square text-secondary"></i></span>
                      <input type="text" className="form-control border-start-0 ps-0" name="officeContact" value={editedOfficer.officeContact} onChange={handleInputChange} placeholder="Landline or Intercom" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Years of Experience</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><i className="fa fa-briefcase text-secondary"></i></span>
                      <input type="number" min="0" className="form-control border-start-0 ps-0" name="experience" value={editedOfficer.experience} onChange={handleInputChange} placeholder="E.g. 5" />
                    </div>
                  </div>

                </div>

                {/* Form Action Buttons */}
                <div className="d-flex gap-3 mt-5">
                  <button type="button" onClick={() => navigate('/view_officer_admin')} className="btn btn-light py-3 px-4 fw-bold rounded-pill border w-50" disabled={isSaving}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary py-3 fw-bold rounded-pill shadow-sm hover-lift w-100" style={{ letterSpacing: '1px' }} disabled={isSaving}>
                    {isSaving ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...</>
                    ) : (
                      <><i className="fa fa-save me-2"></i> Update Officer Profile</>
                    )}
                  </button>
                </div>
              </form>
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

export default UpdateOfficerAdmin;