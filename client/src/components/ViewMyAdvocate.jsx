import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/style.css";
import "./css/Landing.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewMyAdvocate = () => {

  const [businessId, setBusinessId] = useState('');

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  async function updateLocationOnServer(latitude, longitude) {
    const url = `http://localhost:4000/api/v1/business/map/` + businessId;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });

      if (response.ok) {
        alert("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }

  useEffect(() => {
    if (businessId) {
      getUserLocation();
    }
  }, [businessId]);

  const navigate = useNavigate();

  const Removefunction = (id) => {
    if (window.confirm('Do you want to delete this service?')) {
      const token = localStorage.getItem('token');
      fetch("http://localhost:4000/api/v1/business/" + id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }).then((res) => {
        window.location.reload();
      }).catch((err) => {
        console.log(err.message);
      });
    }
  }

  const LoadEdit = (id) => {
    navigate("/update_business/" + id);
  }

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/business/');
        const data = await response.json();

        const advocateemail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)advocateemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
        const filteredBusiness = data.filter((business) => business.advocateemail === advocateemail);
        setBusinessData(filteredBusiness);
        setFilteredData(filteredBusiness);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching business data:', error.message);
        setLoading(false);
      }
    };
    fetchBusinessData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = businessData.filter((business) =>
      Object.values(business).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f8fafc' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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

          <div className="section-heading d-flex flex-column align-items-center justify-content-center mb-5">
            <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              My Advocate <span>Services</span>
            </h2>

            {/* Search Bar */}
            <div className="w-100 mt-2" style={{ maxWidth: '500px' }}>
              <div className="input-group shadow-sm" style={{ borderRadius: '50px', overflow: 'hidden' }}>
                <span className="input-group-text bg-white border-0 ps-4">
                  <i className="fa fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3 ps-2"
                  placeholder="Search your services..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ boxShadow: 'none' }}
                />
              </div>
            </div>
          </div>

          {filteredData.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {filteredData.map((business) => (
                <div key={business.id} className="col-12 col-lg-10">
                  <div className="card shadow-sm border-0" style={{ borderRadius: '20px', backgroundColor: '#ffffff', overflow: 'hidden', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
                    <div className="card-body p-4 p-md-5">

                      <div className="d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom">
                        <div>
                          <h4 className="fw-bold mb-1 text-dark d-flex align-items-center"><i className="fa fa-user-circle text-primary me-3"></i>{business.name}</h4>
                          <span className={`badge ${business.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'} px-3 py-2 rounded-pill mt-2`}>
                            {business.status}
                          </span>
                        </div>
                        <div className="d-flex gap-2 flex-wrap justify-content-end">
                          <button onClick={() => LoadEdit(business.id)} className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-bold shadow-sm" style={{ border: 'none', background: '#eff6ff' }}><i className="fa fa-edit me-1"></i> Edit Service</button>
                          <button onClick={() => Removefunction(business.id)} className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-bold shadow-sm" style={{ border: 'none', background: '#fef2f2' }}><i className="fa fa-trash me-1"></i> Delete</button>
                        </div>
                      </div>

                      <div className="row g-4">
                        <div className="col-sm-6">
                          <div className="d-flex align-items-start">
                            <div className="icon-wrapper bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="fa fa-briefcase text-success"></i>
                            </div>
                            <div>
                              <p className="text-muted small fw-bold mb-1">Services</p>
                              <p className="mb-0 fw-semibold text-dark">{business.service}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="d-flex align-items-start">
                            <div className="icon-wrapper bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="fa fa-clock-o text-warning"></i>
                            </div>
                            <div>
                              <p className="text-muted small fw-bold mb-1">Availability</p>
                              <p className="mb-0 fw-semibold text-dark">{business.available}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="d-flex align-items-start">
                            <div className="icon-wrapper bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="fa fa-map-marker text-info"></i>
                            </div>
                            <div>
                              <p className="text-muted small fw-bold mb-1">Location</p>
                              <p className="mb-0 fw-semibold text-dark">{business.address}, {business.locality}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="d-flex align-items-start">
                            <div className="icon-wrapper bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="fa fa-building text-secondary"></i>
                            </div>
                            <div>
                              <p className="text-muted small fw-bold mb-1">City</p>
                              <p className="mb-0 fw-semibold text-dark">{business.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="d-flex align-items-start">
                            <div className="icon-wrapper bg-dark bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <i className="fa fa-phone text-dark"></i>
                            </div>
                            <div>
                              <p className="text-muted small fw-bold mb-1">Contact Number</p>
                              <p className="mb-0 fw-semibold text-dark">{business.mobile}</p>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="mt-4 pt-4 border-top d-flex flex-wrap gap-2">
                        <button onClick={() => setBusinessId(business.id)} className="btn btn-secondary btn-sm rounded-pill px-3 py-2 shadow-sm fw-bold border-0" style={{ background: '#f1f5f9', color: '#475569' }}><i className="fa fa-map-pin me-1"></i> Update Geo Map</button>
                        {business.lat && business.long && (
                          <a target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${business.lat},${business.long}`} className="btn btn-success btn-sm rounded-pill px-3 py-2 shadow-sm fw-bold border-0"><i className="fa fa-map me-1"></i> Show on Maps</a>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 d-flex flex-column align-items-center">
              <div className="mb-4 bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                <i className="fa fa-folder-open-o text-muted" style={{ fontSize: '3rem', opacity: '0.5' }}></i>
              </div>
              <h4 className="fw-bold text-dark mb-2">No Services Found</h4>
              <p className="text-muted" style={{ maxWidth: '400px' }}>{searchTerm ? "No services match your search criteria. Try adjusting your vocabulary." : "You haven't added any advocate services yet."}</p>
              {!searchTerm && (
                <Link to="/post_advocate" className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-sm fw-bold" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)', border: 'none' }}>
                  <i className="fa fa-plus me-2"></i> Add New Service
                </Link>
              )}
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

export default ViewMyAdvocate;