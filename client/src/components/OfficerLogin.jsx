import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import imgfolder from "./img/core-img/logo-white.png";

const OfficerLogin = () => {
  
  const [email, setEmail,] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['email']); // Use cookies to store the email
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/v1/officer/login', {
        email: email,
        password: password,
      });

      // Check if the login was successful
      if (response.status === 200) {
          // Store the JWT token in localStorage
          localStorage.setItem('token', response.data.token);

          // Include the token in the x-auth-token header for subsequent requests
          axios.defaults.headers.common['x-auth-token'] = response.data.token;

          
        // Redirect to the home page or perform other actions
        alert('Login Successful!');
        window.location.href = "officer_home";
        console.log('Login successful!');

        setCookie('officeremail', email, { path: '/' , sameSite: 'strict' });
          // Set cookies for officeremail, officerLocation, and officerDepartment
        setCookie('officerLocation', response.data.officerLocation, { path: '/', sameSite: 'strict' });
        
        setError('');
        // You can handle the token and user details here, such as storing them in state or cookies
      } else {
        setError('Login failed. Please check your credentials.');
        alert('Login Unsuccessful!');

      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Internal Server Error. Please try again later.');
      alert('Login Unsuccessful!');
    }
  };


  return (
    <div>
      <title>Online Complaint Registration</title>
            
        <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
             <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
                <img className="big-logo" src={imgfolder} alt="" ></img>    
                <div className="row justify-content-center"><b>Officer Login</b></div>             
                        <div className="register-form mt-5 px-4">
                        <form  onSubmit={handleLogin}> 
                        <div className="form-group text-start mb-4"><span>Email</span>
                            <label htmlFor="username"><i className="lni lni-user"></i></label>
                            <input className="form-control" name="email" id="email" value={email}    onChange={handleEmailChange}  type="text" placeholder="info@example.com"/>
                            </div>

                            <div className="form-group text-start mb-4"><span>Password</span>
                            <label htmlFor="password"><i className="lni lni-lock"></i></label>
                            <input className="form-control"  name="password" id="password" value={password} onChange={handlePasswordChange} type="password"   placeholder="password"/>
                            </div>

                           {/*} <div className="mb-3">
                  <div className="title mb-2"><span>Location</span></div>
                    <select name="location" id="location"
                    value={formData.location}
                    onChange={handleInputChange}>
                          <option value="">Location</option>
                          <option value="Kumbakonam">Kumbakonam</option>
                          <option value="Karaikal">Karaikal</option>
                          <option value="Palakkad">Palakkad</option>
                          <option value="Andhra">Andhra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="WeeThanjavurkly">Thanjavur</option>
                          <option value="Banglore">Banglore</option>
							        </select>
                </div><br></br> 

                <div className="mb-3">
                  <div className="title mb-2"><span>Department</span></div>
                    <select name="department" id="department"
                    value={formData.department}
                    onChange={handleInputChange}>
                          <option value="">Department</option>
                          <option value="StreetLight">Street Light</option>
                          <option value="Pipeleakage">Pipe Leakage</option>
                          <option value="Rainwater">Rain Water</option>
                          <option value="Roadreconstruction">Road Re-construction</option>
                          <option value="Garbage">Garbage</option>
							        </select>
                </div>*/}

                            <button className="btn btn-warning btn-lg w-100"type="submit">Log In</button>
                        </form>
                        </div>
                        
                
                </div>
                </div>
                </div>
            </div>
        </div>
        

  )
}

export default OfficerLogin