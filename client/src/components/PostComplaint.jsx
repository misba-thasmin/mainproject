import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
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

const PostComplaint = () => {
 //const useremail = (document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
  

  const [formData, setFormData] = useState({
    
    useremail: '',
    name: '',
    mobile: '',
    address: '',
    district: '',
    location: '',
    department: '',
    writecomplaint: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [location, setLocation] = useState([]);


  const postComplaintData = async () => {
    const token = localStorage.getItem('token');
    const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    try {
      const response = await fetch('http://localhost:4000/api/v1/complaint/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          
          useremail: userEmail,

        }),
      });

      if (response.ok) {
        console.log('Complaint data posted successfully!');
        // Handle success, e.g., redirect to another page
        alert('Complaint Registered Successfully!');
        window.location.href = "user_home";

      } else {
        console.error('Error posting Complaint data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting Complaint data:', error.message);
    }
  };



  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/location');
        if (response.ok) {
          const data = await response.json();
          setLocation(data);
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
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });

  };


 // Validation 
 const validateForm = () => {
  let isValid = true;
  const errors = {};

  // Validate phone number
  if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = 'Phone must be a 10-digit number';
    isValid = false;
  }
  setValidationErrors(errors);

  return isValid;
};


// OnForm Submit
const handleSubmit = (e) => {
e.preventDefault();

if (!validateForm()) {
// Validation failed, do not proceed with the submission
return;
}
// Else Validation passed 
postComplaintData();
};



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
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Post complaint</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>

              <div className="mb-3">
                  <div className="title mb-2"><span>Name:</span></div>
                  <input className="form-control"
                    name="name" id="name"
                    value={formData.name}
                    onChange={handleInputChange}    type="text"  />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>Mobile</span></div>
                  <input className="form-control" name="mobile" id="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}   type="text"/>
                </div>  
                {/* Validation for Mobile 10 Digits*/}
                {validationErrors.mobile && <p style={{ color: 'red' }}>{validationErrors.mobile}</p>}
      

                <div className="mb-3">
                  <div className="title mb-2"><span>Address:</span></div>
                  <input className="form-control"
                    name="address" id="address"
                    value={formData.address}
                    onChange={handleInputChange}    type="text"  />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>District:</span></div>
                  <input className="form-control"
                    name="district" id="district"
                    value={formData.district}
                    onChange={handleInputChange}    type="text"  />
                </div>
                 
             
<div className="mb-3">
<div className="title mb-2"><span>Select Location:</span></div>
<select name="location" value={formData.location} onChange={handleInputChange}>
  <option value="">Select Location</option>
  {location.map(location => (
    <option key={location._id} value={location.location}>{location.location}</option>
  ))}
</select></div>
<br></br>

                <div className="mb-3">
                  <div className="title mb-2"><span>Select Complaint type:</span></div>
                    <select name="department" id="department"
                    value={formData.department}
                    onChange={handleInputChange}>
                          <option value="">Select</option>
                          <option value="Education">Education</option>
                          <option value="Child health, care, welfare or child development">Child health, care, welfare or child development</option>
                          <option value="Law relating to Child Rights">Law relating to Child Rights</option>
                          <option value="Elimination of Child Labour">Elimination of Child Labour</option>
                          <option value="Juvenile Justice">Juvenile Justice</option>
                          <option value="GarChild Psychology or Sociologybage">Child Psychology or Sociology</option>
                          <option value="Harassment">Harassment</option>
                          

							        </select>
                </div><br></br>
                <div className="mb-3">
    <div className="title mb-2"><span>Write Complaint:</span></div>
    <textarea 
        className="form-control"
        name="writecomplaint" 
        id="writecomplaint"
        value={formData.writecomplaint}
        onChange={handleInputChange} 
        rows="4" // Specify the number of rows for the textarea
    ></textarea>
</div>


                <button className="btn btn-success w-100"  type="submit">Register</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostComplaint