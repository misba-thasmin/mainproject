import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// useremail  complaint mobile lat long status

const PostLocation = () => {
  const [formData, setFormData] = useState({
    adminemail: '',
    location: '',
  });

  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/update_location_admin/" + id);
  }
 // const [submittedLocation, setSubmittedLocation] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [locationData, setLocationData] = useState([]);

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
    const token = localStorage.getItem('token');
    const adminEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)adminemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
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
        console.log('Location data posted successfully!');
        alert('Location Registered Successfully!');
        // Reload the page to display the updated data
        window.location.href = '/post_location';
      } else {
        console.error('Error posting Location data:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error posting Location data:', error.message);
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
    if (window.confirm('Do you want to remove?')) {
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
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">Online Complaint Registration Management System </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>Post Location details</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>

              <div className="mb-3">
                  <div className="title mb-2"><span>Location:</span></div>
                  <input className="form-control"
                    name="location" id="location"
                    value={formData.location}
                    onChange={handleInputChange}    type="text"  />
                </div>

               


                <button className="btn btn-success w-100"  type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}
           {/* Submitted location 
           {submittedLocation && (
              <div className="submitted-location">
                <h6>Submitted Location:</h6>
                <p>{submittedLocation}</p>
              </div>
            )}*/}
<hr></hr>
            {/* Display all location data */}
<div className="all-location-data">
  <h6>All Location Data:</h6>
  <ul>
    {locationData.map((location) => (
      <li key={location._id}>
        <div className="location-item">
          <p className="loc">{location.location}</p>
          <div className="button-container">
            {/* PUT button */}
            <button className="btn btn-primary" onClick={() => LoadEdit(location._id)}>Edit Location</button>
            {/* DELETE button */}
            <button className="btn btn-delete" onClick={() => Removefunction(location._id)}>Delete</button>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
            

        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/admin_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostLocation