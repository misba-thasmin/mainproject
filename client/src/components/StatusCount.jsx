import React, { useEffect, useState } from 'react';
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


const StatusCount = () => {
    const [pendingCount, setPendingCount] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/v1/complaint/');
          const data = await response.json();
  
          if (data && data.count !== undefined && data.status === 'Pending') {
            const totalCount = data.count || 0;
  
            console.log('Pending Complaint Count:', totalCount);
  
            setPendingCount(totalCount);
          } else {
            console.error('Error fetching complaint status count:', data?.error || 'Unexpected response structure');
          }
        } catch (error) {
          console.error('Error fetching complaint status count:', error.message);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {pendingCount > 0 ? (
          <h2>Pending Complaint Count: {pendingCount}</h2>
        ) : (
          <p>No pending complaints found.</p>
        )}
      </div>
    );
  };
export default StatusCount;
