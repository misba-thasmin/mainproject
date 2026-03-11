import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
import "./css/Landing.css"; // Ensure light theme

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const EditOfficerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State initialization matching the 10+ custom properties
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        location: '',
        officerId: '',
        department: '',
        designation: '',
        policeStation: '',
        district: '',
        state: '',
        experience: '',
        officeContact: '',
        joiningDate: '',
        address: ''
    });

    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // Apply Light Theme Background explicitly
    useEffect(() => {
        document.body.style.backgroundColor = '#f8fafc';
        return () => {
            document.body.style.backgroundColor = '';
        }
    }, []);

    // Fetch Existing Data
    useEffect(() => {
        const fetchOfficerData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/officer/${id}`);
                // Map available data to local state, avoiding undefined outputs overriding default '' strings
                const p = response.data;
                setFormData({
                    name: p.name || '',
                    email: p.email || '',
                    mobile: p.mobile || '',
                    location: p.location || '',
                    officerId: p.officerId || '',
                    department: p.department || '',
                    designation: p.designation || '',
                    policeStation: p.policeStation || '',
                    district: p.district || '',
                    state: p.state || '',
                    experience: p.experience || '',
                    officeContact: p.officeContact || '',
                    joiningDate: p.joiningDate || '',
                    address: p.address || ''
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching officer details:', error);
                setErrorMsg('Failed to load profile parameters.');
                setLoading(false);
            }
        };
        fetchOfficerData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/officer/${id}`, formData);
            if (response.status === 200) {
                // Redirection on successful backend save
                navigate('/officer_profile');
            }
        } catch (error) {
            console.error('Submission failed:', error);
            setErrorMsg('A server error occurred, could not update profile.');
        }
    };

    const getAvatarInitials = (name) => {
        return name ? name.substring(0, 2).toUpperCase() : 'OF';
    };

    if (loading) {
        return <div className="text-center mt-5">Loading form data...</div>;
    }

    return (
        <div className="landing-container">

            {/* Modern Glassmorphism Header */}
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

            {/* Offcanvas Sidebar Menu */}
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
                        <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                            <Link to="/officer_profile" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="lni lni-user"></i>My Profile
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

            {/* Central Profile Editing Workflow Container */}
            <div className="page-content-wrapper" style={{ minHeight: 'calc(100vh - 140px)', padding: '2rem 1rem 6rem 1rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>

                    {/* Visual Back Navigation */}
                    <div className="mb-4 d-flex align-items-center">
                        <Link to="/officer_profile" className="btn btn-sm btn-light border-0 shadow-sm rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa fa-arrow-left text-primary"></i>
                        </Link>
                        <h5 className="mb-0 fw-bold text-dark">Edit Profile</h5>
                    </div>

                    {errorMsg && (
                        <div className="alert alert-danger" role="alert">
                            <i className="fa fa-exclamation-triangle me-2"></i>{errorMsg}
                        </div>
                    )}

                    <div className="card shadow-sm border-0" style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>

                        {/* Form Hero */}
                        <div style={{ height: '80px', backgroundColor: '#3b82f6', background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' }}></div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '-40px' }}>
                            <div className="d-flex align-items-center justify-content-center text-white fw-bold shadow"
                                style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#1e293b', fontSize: '2rem', border: '4px solid #ffffff' }}>
                                {getAvatarInitials(formData.name)}
                            </div>
                        </div>

                        {/* Registration Form Core */}
                        <div className="card-body p-4 p-md-5 pt-4">
                            <form onSubmit={handleSubmit}>

                                <h6 className="text-primary text-uppercase fw-bold mb-4" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    <i className="fa fa-user-circle me-2"></i>Personal Details
                                </h6>

                                <div className="row g-3 mb-4">
                                    {/* Full Name */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Full Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-user text-primary"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="name" value={formData.name} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    {/* Email (Readonly) */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Email Address <span className="text-secondary fw-normal">(Cannot be altered)</span></label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-envelope text-secondary"></i></span>
                                            <input type="email" className="form-control border-start-0 ps-0 bg-light text-secondary" name="email" value={formData.email} readOnly />
                                        </div>
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Mobile Number</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-phone text-success"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="mobile" value={formData.mobile} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    {/* Address String */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Residential Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-home text-secondary"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="address" value={formData.address} onChange={handleChange} placeholder="House No, Street, Landmark" />
                                        </div>
                                    </div>

                                    {/* Core Location */}
                                    <div className="col-12 col-md-4">
                                        <label className="form-label text-muted small fw-bold">City / Post</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-map-marker text-danger"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="location" value={formData.location} onChange={handleChange} placeholder="E.g. Chennai" />
                                        </div>
                                    </div>
                                    {/* District */}
                                    <div className="col-12 col-md-4">
                                        <label className="form-label text-muted small fw-bold">District</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-map text-warning"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="district" value={formData.district} onChange={handleChange} placeholder="E.g. Ernakulam" />
                                        </div>
                                    </div>
                                    {/* State */}
                                    <div className="col-12 col-md-4">
                                        <label className="form-label text-muted small fw-bold">State</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-flag text-primary"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="state" value={formData.state} onChange={handleChange} placeholder="E.g. Kerala" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-5 opacity-25" />

                                <h6 className="text-info text-uppercase fw-bold mb-4" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    <i className="fa fa-building me-2"></i>Official Profile Data
                                </h6>

                                <div className="row g-3 mb-4">
                                    {/* Office / PS */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Police Station / Branch</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-university text-dark"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="policeStation" value={formData.policeStation} onChange={handleChange} placeholder="Police Station Name" />
                                        </div>
                                    </div>

                                    {/* Department */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Department</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-sitemap text-info"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="department" value={formData.department} onChange={handleChange} placeholder="E.g. Cyber Crime" />
                                        </div>
                                    </div>

                                    {/* Designation */}
                                    <div className="col-12 col-md-4">
                                        <label className="form-label text-muted small fw-bold">Designation</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-shield text-primary"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="designation" value={formData.designation} onChange={handleChange} placeholder="E.g. Inspector" />
                                        </div>
                                    </div>

                                    {/* Office Contact Number */}
                                    <div className="col-12 col-md-4">
                                        <label className="form-label text-muted small fw-bold">Office Contact Number</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-phone-square text-success"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="officeContact" value={formData.officeContact} onChange={handleChange} placeholder="Landline or official mobile" />
                                        </div>
                                    </div>

                                    {/* Years of Experience */}
                                    <div className="col-12 col-md-4">
                                        <label className="form-label text-muted small fw-bold">Experience (Years)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-briefcase text-secondary"></i></span>
                                            <input type="number" min="0" className="form-control border-start-0 ps-0" name="experience" value={formData.experience} onChange={handleChange} placeholder="1" />
                                        </div>
                                    </div>

                                    {/* Identifying Badge Data / joiningDate / OfficerId */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Officer ID / Badge PIN</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-id-badge text-warning"></i></span>
                                            <input type="text" className="form-control border-start-0 ps-0" name="officerId" value={formData.officerId} onChange={handleChange} placeholder="ID String" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted small fw-bold">Date of Joining</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="fa fa-calendar text-primary"></i></span>
                                            <input type="date" className="form-control border-start-0 ps-0" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn btn-primary py-3 fw-bold rounded-pill shadow-sm hover-lift" style={{ letterSpacing: '1px' }}>
                                        <i className="fa fa-save me-2"></i> Save Profile Data
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sub-Footer Floating Navigation */}
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

export default EditOfficerProfile;
