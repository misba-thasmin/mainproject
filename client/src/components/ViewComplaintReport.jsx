import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewComplaintReport = () => {
  
  let count = 0;
  const navigate = useNavigate();

  

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/complaint/`);
        if (response.status === 200) {
          setBusinessData(response.data);
        } else {
          console.error('Error fetching business data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchBusinessData();
  }, []);

   // Filter data based on the search term
   const filteredData = businessData.filter((business) =>{ 
        const isMatch = Object.values(business).some((field) =>
     field.toString().toLowerCase().includes(searchTerm.toLowerCase() )
     );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = bin.status.toLowerCase() === 'approved';

    return isMatch;
  });  
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
            <h6 className="user-name mb-1">Admin</h6>
         
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
        <div className="">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>View All Complaints</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="table-responsive">          
  <table className="table table-striped">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>City</th>
        <th>Complaint Type</th>
        <th>Complaint Register Date</th>
        <th>Complaint</th>
        <th>Status</th>
        <th>Reason</th>
        <th>Remedies</th>
        <th>Notes</th>
        <th>Complaint Proof</th>
        <th>Resolved Proof</th> {/* New column for the image */}
      </tr>
    </thead>
    <tbody>
      {filteredData.map((complaint) => (
        <React.Fragment key={complaint._id}>
          <tr>
            <td>{++count}</td>
            <td>{complaint.name}</td>
            <td>{complaint.location}</td>
            <td>{complaint.department}</td>
            <td style={{color:'blue'}}>{new Date(complaint.dateCreated).toLocaleDateString('en-GB', timeOptions)}</td>
            <td style={{color:'blue', borderRight: '2px solid green'}}>{complaint.writecomplaint}</td>
            {/* Add border-right to create vertical line */}
            <td ><b style={{color:'purple'}}>{complaint.status}</b></td>
            <td>{complaint.reason}</td>
            <td>{complaint.remedies}</td>
            <td>{complaint.notes}</td>
            <td>
              {/* Wrap the image with a link */}
              {complaint.image1 && (
                <a href={`http://localhost:4000/${complaint.image1}`} target="_blank" rel="noopener noreferrer">
                  <img src={`http://localhost:4000/${complaint.image1}`} alt="Complaint Image" style={{ width: '100px' }} />
                </a>
              )}
            </td>
            <td>
              {/* Wrap the image with a link */}
              {complaint.imagePath && (
                <a href={`http://localhost:4000/${complaint.imagePath}`} target="_blank" rel="noopener noreferrer">
                  <img src={`http://localhost:4000/${complaint.imagePath}`} alt="Complaint Image" style={{ width: '100px' }} />
                </a>
              )}
            </td>
          </tr>
          {/* Add a horizontal line after the "Complaint" and "Status" columns */}
          <tr>
            <td colSpan="12" style={{ borderTop: '2px solid black' }}></td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
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
</div>
  )
}

export default ViewComplaintReport


  {/*<div className="row" style={{marginTop:10}}>
                {filteredData.map((work) => (
              <div key={work._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >Bin Area :  <b> {work.binarea} </b></a>
                      <a className="product-title d-block"  >Driver's Email:  <b>  {work.driveremail} </b></a>
                      <a className="product-title d-block"  >Work status:{work.status}  </a>
                      <a className="product-title d-block"  >Time: {work.time} </a>
                      <a className="product-title d-block"  >Date:  {work.date} </a>	
</div>
                    </div>
                </div>                     
              ))}              
        </div>*/}