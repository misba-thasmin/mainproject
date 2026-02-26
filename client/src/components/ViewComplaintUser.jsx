import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewComplaintUser = () => {


  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////
 
  const [complaintId, setComplaintId,] = useState(''); 
 
  
  // Set the initial value accordingly
  // Function to get user location and update on the server
  const getUserLocation = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(`ID: ${complaintId}`);
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
   // Update location on the server
   async function updateLocationOnServer(latitude, longitude) {
  //  const complaintId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual complaint ID
    const url = `http://localhost:4000/api/v1/complaint/map/` + complaintId;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });
  
      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }
  // Trigger getUserLocation when complaintId changes
  useEffect(() => {
    if (complaintId) {
      getUserLocation();
    }
  }, [complaintId]);

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //////////////Update Delete Code ///////////////
  ////////////////////////////////////////////////

  const navigate = useNavigate();

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token');

        fetch("http://localhost:4000/api/v1/complaint/" + id, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
        }).then((res) => {
          //  alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

const LoadPhoto = (id) => {
  navigate("/photo_user/" + id);
}


{/*
const Feedbackfunction = (id) => {
  navigate("/feedback_user");
}

*/}


  // Set 
  const [cook_location, setCookLocation] = useState(''); // Set the initial value accordingly
  const [cook_department, setCookDepartment] = useState('');

  
  const Feedbackfunction = (location, department) => {
    // Update the state with the provided location and department
    setCookLocation(location);
    setCookDepartment(department);
  };


  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (cook_location && cook_department) {
            updateFeedback();
    }
  }, [cook_location, cook_department]);

  const updateFeedback = () => {
    
    // Store location department in cookies
    document.cookie = `cook_location=${cook_location}`;
    document.cookie = `cook_department=${cook_department}`;
    // For example, redirect to another page
    window.location.href = '/feedback_user';
  };


const UpdateLocation = (id) => {
  navigate("/geolocation/" + id);
}

  const [complaintData, setComplaintData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/complaint/');
    
        const data = await response.json();
         console.log(data);
        // Assuming 'useremail' is the key in cookies
        const useremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter Complaint data based on useremail
         const filteredComplaint = data.filter((complaint) => complaint.useremail === useremail);
         setComplaintData(filteredComplaint);
         setFilteredData(filteredComplaint);
         setLoading(false);
      } catch (error) {
        console.error('Error fetching Complaint data:', error.message);
        setLoading(false);
      }
    };

    fetchComplaintData();
  }, []);



  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = complaintData.filter((complaint) =>
      Object.values(complaint).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }


 


  const timeOptions = { hour: '2-digit', minute: '2-digit' };

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
            <h6 className="user-name mb-1">Online Complaint Registration</h6>
         
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
            <h6>View Complaints and Status</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            {/* Show if Null data in table */}

            {filteredData.length > 0 ? (
            <div className="row" style={{marginTop:10}}>
            {/* Get Details Map field and id */}          
                {filteredData.map((complaint) => (
              <div key={complaint._id} className="col-12 col-md-6">                                        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                <a className="product-title d-block">Date:{new Date(complaint.dateCreated).toLocaleDateString('en-GB',timeOptions)}  </a>
                      <a className="product-title d-block"  >Useremail :  <b> {complaint.useremail} </b></a>
                      <a className="product-title d-block"  >Name :  <b>  {complaint.name} </b></a>
                      <a className="product-title d-block"  >Mobile No :{complaint.mobile}  </a>
                      <a className="product-title d-block"  >Address : {complaint.address} </a>
                      <a className="product-title d-block"  >District:  {complaint.district} </a>	
                      <a className="product-title d-block"  >Location : {complaint.location} </a>
                      <a className="product-title d-block"  >Complaint type : {complaint.department} </a>
                      <a className="product-title d-block"  >Complaint level : {complaint.writecomplaint} </a>
                      <a className="product-title d-block"  >Lat : {complaint.lat}  </a>
                      <a className="product-title d-block"  >Long : {complaint.long}  </a>
                      <td>
  {/* Display the complaint image */}
  {complaint.image1 && (
    <a href={`http://localhost:4000/${complaint.image1}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">
      Complaint Proof: <br></br>
      <img src={`http://localhost:4000/${complaint.image1}`} alt="Complaint Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td><br></br><hr></hr>
                      <a className="product-title d-block" style={{color:'green'}}>Status : <b>{complaint.status}</b>  </a>
                      <a className="product-title d-block"  >Reason :<b> {complaint.reason}</b> </a>
                      <a className="product-title d-block"  >Remedies : <b>{complaint.remedies} </b></a>
                      <a className="product-title d-block"  >Notes : <b>{complaint.notes}</b> </a>
                      
                     
<td>
  {/* Display the resolved image */}
  {complaint.imagePath && (
    <a href={`http://localhost:4000/${complaint.imagePath}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">
      Resolved Proof: <br></br>
      <img src={`http://localhost:4000/${complaint.imagePath}`} alt="Resolved Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td>
            
                    </div>
                  </div>   
                  
                  
                 {/* <a className="btn btn-danger" onClick={() => { Removefunction(complaint.id) }}>Delete</a> */}
                 <a className="btn btn-danger" onClick={() => setComplaintId(complaint.id)}>Geo Map</a> 

                 <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${complaint.lat},${complaint.long}`}>
                  Show Map
                </a>
                <a className="btn btn-danger" onClick={() => { Feedbackfunction(complaint.location,complaint.department ) }}>Feedback</a>
                 <a className="btn btn-danger" onClick={() => { LoadPhoto(complaint.id) }}>Upload Photo</a>
                 
              </div>
              ))}
      
              
        </div>
                  ) : (
                    <p>No complaint details found for the specified user email or search term.</p>
            )}

           {/* Show if Null data in table */}

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
</div>
  )
}

export default ViewComplaintUser