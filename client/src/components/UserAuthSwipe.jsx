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

const UserAuthSwipe = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['email']);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register states
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    passwordHash: '',
    phone: '',
    city: '',
    question1: '',
    question2: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [existingEmails, setExistingEmails] = useState([]);

  React.useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/');
        const emails = response.data.map(user => user.email);
        setExistingEmails(emails);
      } catch (error) {
        console.error('Error fetching existing emails:', error);
      }
    };
    fetchExistingEmails();
  }, []);

  // Login handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['x-auth-token'] = response.data.token;
        
        alert('Login Successful!');
        window.location.href = "/user_home";
        setCookie('email', email, { path: '/', sameSite: 'strict' });
        setError('');
      } else {
        setLoginError('Login failed. Please check your credentials.');
        alert('Login Unsuccessful!');
      }
    } catch (error) {
      console.error('Error during login:', error.response || error.message);
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password');
      } else if (error.response && error.response.status === 404) {
        setLoginError('User not found');
      } else {
        setLoginError('Server error. Please try again later.');
      }
      alert('Login Unsuccessful!');
    }
  };

  // Register handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate name
    if (!userData.name || userData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    // Validate email
    if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone
    if (!userData.phone || !/^\d{10}$/.test(userData.phone)) {
      errors.phone = 'Phone must be a 10-digit number';
      isValid = false;
    }

    // Validate password
    if (!userData.passwordHash || !/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(userData.passwordHash)) {
      errors.password = 'Password must have at least one digit, one uppercase letter, one special character, and be at least 8 characters long';
      isValid = false;
    }

    // Validate city
    if (!userData.city || userData.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters long';
      isValid = false;
    }

    // Validate security questions
    if (!userData.question1 || userData.question1.trim().length < 2) {
      errors.question1 = 'Please answer the security question';
      isValid = false;
    }

    if (!userData.question2 || userData.question2.trim().length < 2) {
      errors.question2 = 'Please answer the security question';
      isValid = false;
    }

    // Check if email already exists
    if (existingEmails.includes(userData.email.toLowerCase())) {
      errors.email = 'Email already exists';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const postRegisterData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
        alert('Registered Successfully.');
        window.location.href = "/";
      } else {
        alert('Registration Unsuccessful.');
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    postRegisterData();
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <title>Complaint management app</title>
      
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
              <img className="big-logo" src={imgfolder} alt="" />
              
              {/* Tab Navigation */}
              <div className="auth-tabs mt-4">
                <div className="d-flex justify-content-center mb-4">
                  <button 
                    className={`btn auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => switchTab('login')}
                    style={{
                      background: activeTab === 'login' ? '#ffc107' : 'transparent',
                      color: activeTab === 'login' ? '#000' : '#fff',
                      border: '1px solid #ffc107',
                      borderRadius: '25px 0 0 25px',
                      padding: '10px 30px',
                      marginRight: '-2px'
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className={`btn auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => switchTab('register')}
                    style={{
                      background: activeTab === 'register' ? '#ffc107' : 'transparent',
                      color: activeTab === 'register' ? '#000' : '#fff',
                      border: '1px solid #ffc107',
                      borderRadius: '0 25px 25px 0',
                      padding: '10px 30px',
                      marginLeft: '-2px'
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Content Container */}
              <div className="auth-content-container" style={{ position: 'relative', overflow: 'visible', minHeight: '600px' }}>
                {/* Login Form */}
                <div 
                  className="auth-panel"
                  style={{
                    transform: activeTab === 'login' ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'absolute',
                    width: '100%',
                    opacity: activeTab === 'login' ? 1 : 0
                  }}
                >
                  <div className="register-form mt-3 px-4">
                    <form onSubmit={handleLogin}>
                      <div className="form-group text-start mb-4">
                        <span>Email</span>
                        <label htmlFor="username"><i className="lni lni-user"></i></label>
                        <input 
                          className="form-control" 
                          name="email" 
                          id="email" 
                          value={email}    
                          onChange={handleEmailChange}  
                          type="text" 
                          placeholder="info@example.com"
                        />
                      </div>

                      <div className="form-group text-start mb-4">
                        <span>Password</span>
                        <label htmlFor="password"><i className="lni lni-lock"></i></label>
                        <input 
                          className="form-control"  
                          name="password" 
                          id="password" 
                          value={password} 
                          onChange={handlePasswordChange} 
                          type="password"   
                          placeholder="password"
                        />
                      </div>
                      
                      {loginError && (
                        <div className="alert alert-danger" style={{ fontSize: '14px', padding: '8px' }}>
                          {loginError}
                        </div>
                      )}
                      
                      <button className="btn btn-warning btn-lg w-100" type="submit">Log In</button>
                    </form>
                  </div>
                  
                  <div className="login-meta-data">
                    <a className="forgot-password d-block mt-3 mb-1" href="reset_password">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                {/* Register Form */}
                <div 
                  className="auth-panel"
                  style={{
                    transform: activeTab === 'register' ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'absolute',
                    width: '100%',
                    opacity: activeTab === 'register' ? 1 : 0
                  }}
                >
                  <div className="register-form mt-3 px-4">
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="form-group text-start mb-4">
                        <span>Username</span>
                        <label htmlFor="username"><i className="lni lni-user"></i></label>
                        <input 
                          className="form-control" 
                          name="name" 
                          id="name"  
                          value={userData.name} 
                          onChange={handleRegisterChange}  
                          type="text" 
                          placeholder="Enter the name"
                        />
                      </div>
                      {validationErrors.name && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.name}</p>
                      )}

                      {validationErrors.email && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.email}</p>
                      )}

                      <div className="form-group text-start mb-4">
                        <span>Email</span>
                        <label htmlFor="email"><i className="lni lni-envelope"></i></label>
                        <input 
                          className="form-control" 
                          name="email" 
                          id="email" 
                          value={userData.email} 
                          onChange={handleRegisterChange}  
                          type="email" 
                          placeholder="Enter email id"
                        />
                      </div>
                      
                      {validationErrors.password && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.password}</p>
                      )}
                      
                      <div className="form-group text-start mb-4">
                        <span>Password</span>
                        <label htmlFor="passwordHash"><i className="lni lni-lock"></i></label>
                        <input 
                          className="input-psswd form-control"   
                          name="passwordHash" 
                          id="passwordHash" 
                          value={userData.passwordHash} 
                          onChange={handleRegisterChange}  
                          type="password" 
                          placeholder="Password"
                        />
                      </div>

                      {validationErrors.phone && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.phone}</p>
                      )}
                      
                      <div className="form-group text-start mb-4">
                        <span>Mobile</span>
                        <label htmlFor="mobile"><i className="lni lni-arrow-right"></i></label>
                        <input 
                          className="form-control" 
                          name="phone" 
                          id="phone"  
                          value={userData.phone} 
                          onChange={handleRegisterChange} 
                          type="number" 
                          placeholder="Mobile"
                        />
                      </div>

                      <div className="form-group text-start mb-4">
                        <span>City</span>
                        <label htmlFor="field_2"><i className="lni lni-arrow-right"></i></label>
                        <input 
                          className="form-control" 
                          name="city" 
                          id="city"  
                          value={userData.city} 
                          onChange={handleRegisterChange} 
                          type="text" 
                          placeholder="City"
                        />
                      </div>
                      {validationErrors.city && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.city}</p>
                      )}
                      
                      <div className="form-group text-start mb-4">
                        <span>What is your pet animal name?</span>
                        <label htmlFor="field_3"><i className="lni lni-arrow-right"></i></label>
                        <input 
                          className="form-control" 
                          name="question1" 
                          id="question1"   
                          value={userData.question1} 
                          onChange={handleRegisterChange} 
                          type="text" 
                          placeholder="enter the answer"
                        />
                      </div>
                      {validationErrors.question1 && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.question1}</p>
                      )}
                      
                      <div className="form-group text-start mb-4">
                        <span>What is your school best friend name?</span>
                        <label htmlFor="field_4"><i className="lni lni-arrow-right"></i></label>
                        <input 
                          className="form-control" 
                          name="question2"
                          id="question2"   
                          value={userData.question2} 
                          onChange={handleRegisterChange} 
                          type="text" 
                          placeholder="enter the answer"
                        />
                      </div>
                      {validationErrors.question2 && (
                        <p style={{ color: 'white', fontSize: '12px' }}>{validationErrors.question2}</p>
                      )}
                      
                      <button className="btn btn-warning btn-lg w-100" type="submit">Sign Up</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthSwipe;
